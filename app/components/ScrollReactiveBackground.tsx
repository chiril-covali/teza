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
    let rafId = 0;

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

      let scrollProgress = 0;
      let scrollImpulse = 0;
      let lastScrollY = window.scrollY;
      let lastScrollTime = performance.now();
      let pendingScroll = false;

      const updateScrollState = () => {
        pendingScroll = false;
        const currentY = window.scrollY;
        const now = performance.now();
        const dy = Math.abs(currentY - lastScrollY);
        const dt = Math.max(16, now - lastScrollTime);

        const speed = Math.min(1, dy / dt * 0.35);
        scrollImpulse = Math.max(scrollImpulse, speed);
        scrollProgress = Math.min(1, currentY / Math.max(window.innerHeight * 0.9, 1));

        lastScrollY = currentY;
        lastScrollTime = now;
      };

      const onScroll = () => {
        if (pendingScroll) return;
        pendingScroll = true;
        rafId = window.requestAnimationFrame(updateScrollState);
      };

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

          const energy = prefersReducedMotion ? 0.2 : Math.min(1, scrollProgress * 0.65 + scrollImpulse * 0.9);
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

          scrollImpulse *= 0.92;
        };
      };

      instance = new P5(sketch, container);
      window.addEventListener("scroll", onScroll, { passive: true });
      updateScrollState();

      const cleanupScroll = () => {
        window.removeEventListener("scroll", onScroll);
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      };

      const originalRemove = instance.remove.bind(instance);
      instance.remove = () => {
        cleanupScroll();
        originalRemove();
      };
    };

    setupSketch();

    return () => {
      isMounted = false;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      instance?.remove();
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}
