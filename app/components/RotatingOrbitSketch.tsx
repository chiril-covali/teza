"use client";

import { useEffect, useRef } from "react";

export default function RotatingOrbitSketch() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let instance: { remove: () => void } | null = null;

    const setupSketch = async () => {
      const p5Module = await import("p5");
      if (!isMounted) return;

      const P5 = p5Module.default;
      let canvasSize = Math.min(container.offsetWidth, 640);

      const sketch = (s: any) => {
        const particles = Array.from({ length: 72 }, (_, i) => ({
          angle: (i / 72) * Math.PI * 2,
          radius: 40 + (i % 12) * 8,
          speed: 0.003 + (i % 6) * 0.0012,
        }));

        s.setup = () => {
          s.createCanvas(canvasSize, Math.max(300, canvasSize * 0.56));
          s.noFill();
          s.strokeWeight(2);
        };

        s.windowResized = () => {
          canvasSize = Math.min(container.offsetWidth, 640);
          s.resizeCanvas(canvasSize, Math.max(300, canvasSize * 0.56));
        };

        s.draw = () => {
          s.background(7, 22, 30, 45);

          const cx = s.width / 2;
          const cy = s.height / 2;

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const wobble = 10 * Math.sin(s.frameCount * 0.02 + i * 0.25);
            const x =
              cx + Math.cos(p.angle + s.frameCount * p.speed) * (p.radius + wobble);
            const y =
              cy +
              Math.sin(p.angle + s.frameCount * p.speed) *
                (p.radius * 0.68 + wobble * 0.4);

            const blend = (i % 24) / 24;
            const r = 15 + 190 * blend;
            const g = 100 + 90 * (1 - blend);
            const b = 130 + 60 * Math.sin(i);

            s.stroke(r, g, b, 190);
            s.circle(x, y, 5 + (i % 4));

            const next = particles[(i + 9) % particles.length];
            const nx =
              cx + Math.cos(next.angle + s.frameCount * next.speed) * next.radius;
            const ny =
              cy +
              Math.sin(next.angle + s.frameCount * next.speed) *
                (next.radius * 0.68);
            s.stroke(r, g, b, 70);
            s.line(x, y, nx, ny);
          }
        };
      };

      instance = new P5(sketch, container);
    };

    setupSketch();

    return () => {
      isMounted = false;
      instance?.remove();
    };
  }, []);

  return <div ref={containerRef} className="h-[320px] w-full" aria-label="Animație p5.js" />;
}
