import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function UpiQR() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const qr = new QRCodeStyling({
      width: 180,
      height: 180,
      data: "upi://pay?pa=dibyansumahapatra26@okhdfcbank&pn=Dibyansu%20Mahapatra&cu=INR",
      dotsOptions: {
        color: isDark ? "#ffffff" : "#000000",
        type: "rounded",
      },
      backgroundOptions: {
        color: "transparent",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
      },
    });

    qr.append(ref.current);
  }, [isDark]);

  return (
    <div className="glass mt-8 rounded-2xl p-6 text-center">
      <h2 className="text-xl font-semibold">Support via UPI</h2>

      <p className="text-sm text-muted-foreground mt-2">
        Scan to support the developer ❤️
      </p>

      <div className="mt-6 flex justify-center">
        <div className="p-4 rounded-xl bg-background/20 border border-border/60">
          <div ref={ref} />
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        UPI ID: dibyansumahapatra26@okhdfcbank
      </p>
    </div>
  );
}