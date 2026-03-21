"use client";

import { useEffect, useRef } from "react";
import { allAlgorithms } from "@/lib/algorithms";

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
        const numAlgos = allAlgorithms.length;
        // Size inversely proportional to count
        // Minimum size 15, maximum 60
        const baseSize = Math.max(15, Math.min(60, 400 / numAlgos));
        const palette: [number, number, number][] = [
          [79, 70, 229],   // indigo-600
          [37, 99, 235],   // blue-600
          [8, 145, 178],   // cyan-600
          [5, 150, 105],   // emerald-600
          [217, 119, 6],   // amber-600
          [225, 29, 72],   // rose-600
          [124, 58, 237],  // violet-600
        ];
        
        const dots = allAlgorithms.map((algo, i) => {
          const color = palette[Math.floor(Math.random() * palette.length)];

          return {
            name: algo.name,
            x: Math.random() * 800, // will be reset in setup/resize
            y: Math.random() * 600,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: baseSize + (i % 3) * 5,
            fillColor: [color[0], color[1], color[2], 120] as [number, number, number, number],
            strokeColor: [color[0], color[1], color[2], 180] as [number, number, number, number],
          };
        });

        const resize = () => {
          if (container) {
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            s.resizeCanvas(width, height);
            
            // Re-position dots within new bounds if they are out
            dots.forEach(dot => {
                dot.x = Math.random() * width;
                dot.y = Math.random() * height;
            });
          }
        };

        s.setup = () => {
          s.createCanvas(container.offsetWidth, container.offsetHeight);
          s.strokeWeight(1.5);
          
          dots.forEach(dot => {
            dot.x = Math.random() * s.width;
            dot.y = Math.random() * s.height;
          });
        };

        s.windowResized = resize;

        s.draw = () => {
          s.clear();

          for (let dot of dots) {
            // Move
            dot.x += dot.vx;
            dot.y += dot.vy;

            // Bounce
            if (dot.x < 0 || dot.x > s.width) dot.vx *= -1;
            if (dot.y < 0 || dot.y > s.height) dot.vy *= -1;

            // Draw
            s.stroke(...dot.strokeColor);
            s.fill(...dot.fillColor);
            s.circle(dot.x, dot.y, dot.size);
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
