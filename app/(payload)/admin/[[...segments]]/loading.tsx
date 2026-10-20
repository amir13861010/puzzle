export default function AdminLoading() {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-label="در حال بارگذاری پنل مدیریت"
      style={{
        minHeight: "40vh",
        display: "grid",
        placeItems: "center",
        color: "var(--theme-text, #222)",
        direction: "rtl",
      }}
    >
      <div style={{ display: "grid", justifyItems: "center", gap: 12 }}>
        <span
          style={{
            width: 30,
            height: 30,
            border: "3px solid #8884",
            borderTopColor: "var(--theme-elevation-800, #333)",
            borderRadius: "50%",
            animation: "puzzle-admin-spin 800ms linear infinite",
          }}
        />
        <span>در حال بارگذاری...</span>
      </div>
      <style>{`@keyframes puzzle-admin-spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
