"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: [number, number, number];
};

export default function ScrollReactiveBackground() {
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
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const viewportWidth = Math.max(320, container.offsetWidth || window.innerWidth);
      const isMobile = viewportWidth < 768;
      const particleCount = prefersReducedMotion ? (isMobile ? 12 : 20) : (isMobile ? 22 : 42);
      const maxLinkDistance = isMobile ? 120 : 160;
      const maxSpeed = prefersReducedMotion ? 0.16 : isMobile ? 0.34 : 0.46;

      const palette: [number, number, number][] = [
        [14, 116, 144],
        [37, 99, 235],
        [5, 150, 105],
        [99, 102, 241],
      ];

      const particles: Particle[] = Array.from({ length: particleCount }, (_, index) => {
        const color = palette[index % palette.length];
        return {
          x: Math.random() * (container.offsetWidth || window.innerWidth),
          y: Math.random() * (container.offsetHeight || window.innerHeight),
          vx: (Math.random() - 0.5) * maxSpeed,
          vy: (Math.random() - 0.5) * maxSpeed,
          radius: (isMobile ? 2.2 : 2.8) + (index % 4) * 0.55,
          hue: [color[0], color[1], color[2]],
        };
      });

      const sketch = (s: any) => {
        const resize = () => {
          const width = container.offsetWidth;
          const height = container.offsetHeight;
          s.resizeCanvas(width, height);
        };

        s.setup = () => {
          s.createCanvas(container.offsetWidth, container.offsetHeight);
          s.frameRate(prefersReducedMotion ? 22 : isMobile ? 34 : 48);
          s.strokeWeight(1);
        };

        s.windowResized = resize;

        s.draw = () => {
          s.clear();

          // Always-visible baseline with a gentle autonomous pulse (no scroll dependency).
          const pulse = (Math.sin(s.frameCount * 0.012) + 1) * 0.5;
          const energy = prefersReducedMotion
            ? 0.34
            : isMobile
              ? 0.38 + pulse * 0.08
              : 0.34 + pulse * 0.1;
          const nodeAlpha = 12 + energy * 52;
          const lineAlphaBase = 6 + energy * 30;
          const driftMultiplier = 0.5 + energy * 0.65;

          for (let i = 0; i < particles.length; i += 1) {
            const particle = particles[i];
            particle.x += particle.vx * driftMultiplier;
            particle.y += particle.vy * driftMultiplier;

            if (particle.x < particle.radius || particle.x > s.width - particle.radius) particle.vx *= -1;
            if (particle.y < particle.radius || particle.y > s.height - particle.radius) particle.vy *= -1;

            particle.x = Math.max(particle.radius, Math.min(s.width - particle.radius, particle.x));
            particle.y = Math.max(particle.radius, Math.min(s.height - particle.radius, particle.y));
          }

          for (let i = 0; i < particles.length; i += 1) {
            const source = particles[i];
            let links = 0;

            for (let j = i + 1; j < particles.length && links < 3; j += 1) {
              const target = particles[j];
              const dx = target.x - source.x;
              const dy = target.y - source.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance > maxLinkDistance) continue;

              const alpha = Math.max(4, lineAlphaBase * (1 - distance / maxLinkDistance));
              s.stroke(source.hue[0], source.hue[1], source.hue[2], alpha);
              s.line(source.x, source.y, target.x, target.y);
              links += 1;
            }
          }

          for (const particle of particles) {
            s.noStroke();
            s.fill(particle.hue[0], particle.hue[1], particle.hue[2], nodeAlpha);
            s.circle(particle.x, particle.y, particle.radius * 2);
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
