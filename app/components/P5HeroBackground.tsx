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
        
        const dots = allAlgorithms.map((algo, i) => ({
          name: algo.name,
          x: Math.random() * 800, // will be reset in setup/resize
          y: Math.random() * 600,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: baseSize + (i % 3) * 5,
          strokeColor: [79, 70, 229, 120] as [number, number, number, number], // Indigo-600
        }));

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
          s.noFill();
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
            s.fill(255, 255, 255, 40);
            s.circle(dot.x, dot.y, dot.size);
            
            // Subtle center point
            s.fill(...dot.strokeColor);
            s.noStroke();
            s.circle(dot.x, dot.y, 2);
            s.noFill();
            s.strokeWeight(1.5);
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
