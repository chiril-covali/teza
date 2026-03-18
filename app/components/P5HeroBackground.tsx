"use client";

import { useEffect, useRef } from "react";

export default function P5HeroBackground() {
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

      const sketch = (s: any) => {
        const nodes = Array.from({ length: 24 }, (_, i) => ({
          angle: (i / 24) * Math.PI * 2,
          radius: 70 + (i % 8) * 18,
          speed: 0.002 + (i % 5) * 0.0008,
        }));

        const resize = () => {
          const width = container.offsetWidth;
          const height = container.offsetHeight;
          s.resizeCanvas(width, height);
        };

        s.setup = () => {
          s.createCanvas(container.offsetWidth, container.offsetHeight);
          s.noFill();
          s.strokeWeight(1.8);
        };

        s.windowResized = resize;

        s.draw = () => {
          s.clear();

          const cx = s.width * 0.55;
          const cy = s.height * 0.5;

          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const angle = node.angle + s.frameCount * node.speed;
            const wobble = 10 * Math.sin(s.frameCount * 0.01 + i * 0.7);
            const x = cx + Math.cos(angle) * (node.radius + wobble);
            const y = cy + Math.sin(angle) * (node.radius * 0.62 + wobble * 0.45);

            s.stroke(22, 101, 92, 95);
            s.circle(x, y, 5 + (i % 3));

            const next = nodes[(i + 6) % nodes.length];
            const na = next.angle + s.frameCount * next.speed;
            const nx = cx + Math.cos(na) * next.radius;
            const ny = cy + Math.sin(na) * (next.radius * 0.62);
            s.stroke(176, 105, 44, 50);
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

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}
