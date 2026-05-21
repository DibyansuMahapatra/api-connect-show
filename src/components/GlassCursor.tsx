import { useEffect } from "react";

export function GlassCursor() {
  useEffect(() => {
    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    const update = () => {
      raf = 0;
      const els = document.querySelectorAll<HTMLElement>(".glass");
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const inside =
          lastX >= r.left - 80 &&
          lastX <= r.right + 80 &&
          lastY >= r.top - 80 &&
          lastY <= r.bottom + 80;
        if (inside) {
          el.style.setProperty("--mx", `${lastX - r.left}px`);
          el.style.setProperty("--my", `${lastY - r.top}px`);
          el.style.setProperty("--glass-glow", "1");
        } else {
          el.style.setProperty("--glass-glow", "0");
        }
      });
    };

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
