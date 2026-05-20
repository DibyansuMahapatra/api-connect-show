export function BackgroundGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
        style={{ background: "hsl(var(--blob-1) / 0.55)" }}
      />
      <div
        className="absolute -right-24 top-40 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl"
        style={{ background: "hsl(var(--blob-2) / 0.5)" }}
      />
      <div
        className="absolute bottom-[-200px] left-1/3 h-[380px] w-[380px] rounded-full opacity-30 blur-3xl"
        style={{ background: "hsl(var(--blob-1) / 0.45)" }}
      />
    </div>
  );
}
