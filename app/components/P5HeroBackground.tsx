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
        const viewportWidth = Math.max(320, container.offsetWidth || 1200);
        const isMobile = viewportWidth < 768;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const maxParticles = isMobile ? 32 : 56;
        const particleCount = Math.max(20, Math.min(allAlgorithms.length, maxParticles));
        const baseSize = isMobile ? 10 : 13;
        const maxLinkDistance = isMobile ? 120 : 150;
        const maxLinksPerNode = isMobile ? 3 : 4;

        const palette: [number, number, number][] = [
          [79, 70, 229],   // indigo-600
          [37, 99, 235],   // blue-600
          [8, 145, 178],   // cyan-600
          [5, 150, 105],   // emerald-600
          [217, 119, 6],   // amber-600
          [225, 29, 72],   // rose-600
          [124, 58, 237],  // violet-600
        ];

        type Dot = {
          name: string;
          x: number;
          y: number;
          vx: number;
          vy: number;
          radius: number;
          fillColor: [number, number, number, number];
          strokeColor: [number, number, number, number];
          linkColor: [number, number, number];
        };

        const dots: Dot[] = allAlgorithms.slice(0, particleCount).map((algo, i) => {
          const color = palette[Math.floor(Math.random() * palette.length)];
          const radius = baseSize + (i % 3) * 2;

          return {
            name: algo.name,
            x: Math.random() * 800, // will be reset in setup/resize
            y: Math.random() * 600,
            vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.18 : 0.65),
            vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.18 : 0.65),
            radius,
            fillColor: [color[0], color[1], color[2], 46] as [number, number, number, number],
            strokeColor: [color[0], color[1], color[2], 82] as [number, number, number, number],
            linkColor: [color[0], color[1], color[2]] as [number, number, number],
          };
        });

        const resolveCollision = (a: Dot, b: Dot) => {
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq === 0) return;

          const distance = Math.sqrt(distanceSq);
          const minDistance = a.radius + b.radius;
          if (distance >= minDistance) return;

          const nx = dx / distance;
          const ny = dy / distance;
          const overlap = minDistance - distance;

          a.x -= nx * overlap * 0.5;
          a.y -= ny * overlap * 0.5;
          b.x += nx * overlap * 0.5;
          b.y += ny * overlap * 0.5;

          const dvx = a.vx - b.vx;
          const dvy = a.vy - b.vy;
          const impactSpeed = dvx * nx + dvy * ny;
          if (impactSpeed > 0) return;

          const impulse = impactSpeed;
          a.vx -= impulse * nx;
          a.vy -= impulse * ny;
          b.vx += impulse * nx;
          b.vy += impulse * ny;
        };

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
          s.strokeWeight(1.1);
          s.frameRate(prefersReducedMotion ? 24 : 50);
          
          dots.forEach(dot => {
            dot.x = Math.random() * s.width;
            dot.y = Math.random() * s.height;
          });
        };

        s.windowResized = resize;

        s.draw = () => {
          s.clear();

          for (let i = 0; i < dots.length; i += 1) {
            for (let j = i + 1; j < dots.length; j += 1) {
              resolveCollision(dots[i], dots[j]);
            }
          }

          for (let i = 0; i < dots.length; i += 1) {
            let linksDrawn = 0;
            for (let j = i + 1; j < dots.length && linksDrawn < maxLinksPerNode; j += 1) {
              const dx = dots[j].x - dots[i].x;
              const dy = dots[j].y - dots[i].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance > maxLinkDistance) continue;

              const alpha = Math.max(8, 34 * (1 - distance / maxLinkDistance));
              s.stroke(dots[i].linkColor[0], dots[i].linkColor[1], dots[i].linkColor[2], alpha);
              s.line(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
              linksDrawn += 1;
            }
          }

          for (let dot of dots) {
            // Move
            dot.x += dot.vx;
            dot.y += dot.vy;

            // Bounce
            if (dot.x < dot.radius || dot.x > s.width - dot.radius) dot.vx *= -1;
            if (dot.y < dot.radius || dot.y > s.height - dot.radius) dot.vy *= -1;

            dot.x = Math.max(dot.radius, Math.min(s.width - dot.radius, dot.x));
            dot.y = Math.max(dot.radius, Math.min(s.height - dot.radius, dot.y));

            // Draw
            s.stroke(...dot.strokeColor);
            s.fill(...dot.fillColor);
            s.circle(dot.x, dot.y, dot.radius * 2);
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
