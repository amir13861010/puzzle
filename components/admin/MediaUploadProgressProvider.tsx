"use client";

import { upload } from "@vercel/blob/client";
import { useConfig, useUploadHandlers } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";
import { useEffect, useState, type ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
  collectionSlug: string;
  enabled?: boolean;
  prefix?: string;
  serverHandlerPath: `/${string}`;
};

type UploadStatus = {
  filename: string;
  percentage: number;
  state: "uploading" | "complete" | "error";
  message?: string;
};

export default function MediaUploadProgressProvider({
  children,
  collectionSlug,
  enabled,
  prefix,
  serverHandlerPath,
}: ProviderProps) {
  const { setUploadHandler } = useUploadHandlers();
  const {
    config: {
      routes: { api: apiRoute },
      serverURL,
    },
  } = useConfig();
  const [status, setStatus] = useState<UploadStatus | null>(null);

  useEffect(() => {
    if (!enabled || collectionSlug !== "media") return;

    // Register after the storage plugin's provider so this handler can report
    // byte-level progress from Vercel Blob.
    const registration = window.setTimeout(() => {
      setUploadHandler({
        collectionSlug: "media",
        handler: async ({ docPrefix, file, updateFilename }) => {
          setStatus({ filename: file.name, percentage: 0, state: "uploading" });
          try {
            const endpoint = formatAdminURL({
              apiRoute,
              path: serverHandlerPath,
              serverURL,
            });
            const issueResponse = await fetch(`${endpoint}?issue-client-upload=1`, {
              body: JSON.stringify({
                collectionSlug,
                docPrefix,
                filename: file.name,
                mimeType: file.type,
              }),
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              method: "POST",
            });

            if (!issueResponse.ok) {
              throw new Error("آماده‌سازی آپلود انجام نشد. دوباره تلاش کنید.");
            }

            const { clientUploadContext, filename, pathname } =
              await issueResponse.json();
            updateFilename(filename);

            await upload(pathname, file, {
              access: "public",
              clientPayload: JSON.stringify({
                collectionSlug,
                mimeType: file.type,
                signedReceipt: clientUploadContext.signedReceipt,
              }),
              contentType: file.type,
              handleUploadUrl: endpoint,
              onUploadProgress: ({ percentage }) => {
                setStatus({
                  filename: file.name,
                  percentage: Math.round(percentage),
                  state: "uploading",
                });
              },
            });

            setStatus({ filename: file.name, percentage: 100, state: "complete" });
            window.setTimeout(() => setStatus(null), 1800);
            return {
              prefix: clientUploadContext.prefix ?? prefix,
              signedReceipt: clientUploadContext.signedReceipt,
            };
          } catch (error) {
            setStatus({
              filename: file.name,
              percentage: 0,
              state: "error",
              message:
                error instanceof Error
                  ? error.message
                  : "آپلود انجام نشد. اتصال را بررسی و دوباره تلاش کنید.",
            });
            throw error;
          }
        },
      });
    }, 0);

    return () => window.clearTimeout(registration);
  }, [
    apiRoute,
    collectionSlug,
    enabled,
    prefix,
    serverHandlerPath,
    serverURL,
    setUploadHandler,
  ]);

  return (
    <>
      {children}
      {status && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 10000,
            width: "min(360px, calc(100vw - 32px))",
            padding: "14px 16px",
            borderRadius: 10,
            color: "#fff",
            background: status.state === "error" ? "#7f1d1d" : "#171717",
            boxShadow: "0 8px 30px #0004",
            direction: "rtl",
            fontFamily: "inherit",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {status.state === "uploading"
                ? `در حال آپلود ${status.filename}`
                : status.state === "complete"
                  ? `آپلود ${status.filename} کامل شد`
                  : `آپلود ${status.filename} ناموفق بود`}
            </span>
            <strong>{status.state === "uploading" ? `${status.percentage}%` : ""}</strong>
          </div>
          {status.state === "uploading" && (
            <div
              style={{ height: 5, marginTop: 10, overflow: "hidden", borderRadius: 5, background: "#ffffff33" }}
            >
              <div
                style={{
                  width: `${status.percentage}%`,
                  height: "100%",
                  background: "#c8ff00",
                  transition: "width 150ms ease",
                }}
              />
            </div>
          )}
          {status.state === "complete" && (
            <div style={{ height: 5, marginTop: 10, borderRadius: 5, background: "#c8ff00" }} />
          )}
          {status.message && <p style={{ margin: "8px 0 0", fontSize: 12 }}>{status.message}</p>}
          {status.state === "error" && (
            <button
              type="button"
              onClick={() => setStatus(null)}
              style={{ marginTop: 8, color: "inherit", background: "transparent", border: 0, cursor: "pointer" }}
            >
              بستن
            </button>
          )}
        </div>
      )}
    </>
  );
}
