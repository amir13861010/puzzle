export default function AppLoading() {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-label="در حال بارگذاری صفحه"
      style={{
        minHeight: "55vh",
        display: "grid",
        placeItems: "center",
        background: "#050505",
        color: "#c8ff00",
      }}
    >
      <div style={{ display: "grid", justifyItems: "center", gap: 14 }}>
        <span
          style={{
            width: 34,
            height: 34,
            border: "3px solid #ffffff33",
            borderTopColor: "#c8ff00",
            borderRadius: "50%",
            animation: "puzzle-page-spin 800ms linear infinite",
          }}
        />
        <span style={{ color: "#fff", fontSize: 14 }}>در حال بارگذاری...</span>
      </div>
      <style>{`@keyframes puzzle-page-spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
