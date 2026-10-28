import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "ایمیل معتبر وارد کنید." }, { status: 400 });
    }

    const payload = await getPayloadClient();
    const existing = await payload.find({
      collection: "newsletter_subscribers",
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "newsletter_subscribers",
        data: { email },
        overrideAccess: true,
      });
    }
    return NextResponse.json({ success: true, message: "ایمیل شما ثبت شد." });
  } catch {
    return NextResponse.json({ error: "ثبت ایمیل انجام نشد. دوباره تلاش کنید." }, { status: 500 });
  }
}
