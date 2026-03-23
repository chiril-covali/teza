"use client";

import { useEffect, useRef } from "react";
import type p5 from "p5";

type P5Instance = {
  remove: () => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function Pong404Canvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let instance: P5Instance | null = null;
    let playerTargetRatio = 0.5;
    let lastManualControlAt = 0;

    const setTargetFromClientY = (clientY: number) => {
      const rect = container.getBoundingClientRect();
      if (rect.height <= 0) return;
      playerTargetRatio = clamp((clientY - rect.top) / rect.height, 0, 1);
      lastManualControlAt = performance.now();
    };

    const onPointerMove = (event: PointerEvent) => setTargetFromClientY(event.clientY);
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        setTargetFromClientY(event.touches[0].clientY);
      }
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    const setupSketch = async () => {
      const p5Module = await import("p5");
      if (!isMounted) return;

      const P5 = p5Module.default;

      const sketch = (s: p5) => {
        const PADDING = 18;
        const SCORE_TO_WIN = 7;
        const paddleWidth = 12;
        const paddleHeight = 88;
        const baseBallSpeed = 5.2;
        const maxBallSpeed = 10.8;
        const playerSpeed = 8.4;
        const botSpeed = 4.8;

        let playerY = 120;
        let botY = 120;
        let ballX = 0;
        let ballY = 0;
        let ballVX = 0;
        let ballVY = 0;
        let playerScore = 0;
        let botScore = 0;
        let roundMessage = "";
        let roundMessageUntil = 0;
        let botAimY = 120;
        let botMistakeY = 0;
        let botNextMistakeAt = 0;
        let botNextReactionAt = 0;

        const updateCanvasSize = () => {
          const width = Math.max(320, container.offsetWidth || 320);
          const height = Math.max(260, container.offsetHeight || 260);
          s.resizeCanvas(width, height);

          playerY = clamp(playerY, PADDING + paddleHeight / 2, s.height - PADDING - paddleHeight / 2);
          botY = clamp(botY, PADDING + paddleHeight / 2, s.height - PADDING - paddleHeight / 2);
          ballX = clamp(ballX, 0, s.width);
          ballY = clamp(ballY, 0, s.height);
        };

        const resetBall = (towardsPlayer: boolean) => {
          ballX = s.width * 0.5;
          ballY = s.height * (0.28 + Math.random() * 0.44);

          const angle = s.random(-0.45, 0.45);
          const direction = towardsPlayer ? -1 : 1;
          ballVX = Math.cos(angle) * baseBallSpeed * direction;
          ballVY = Math.sin(angle) * baseBallSpeed;
        };

        const clampPaddles = () => {
          playerY = clamp(playerY, PADDING + paddleHeight / 2, s.height - PADDING - paddleHeight / 2);
          botY = clamp(botY, PADDING + paddleHeight / 2, s.height - PADDING - paddleHeight / 2);
        };

        const movePlayer = () => {
          const manualControlRecent = performance.now() - lastManualControlAt < 1500;
          const desiredY = manualControlRecent ? playerTargetRatio * s.height : ballY;
          const delta = desiredY - playerY;
          playerY += clamp(delta, -playerSpeed, playerSpeed);
        };

        const moveBot = () => {
          const now = performance.now();
          const ballMovingToBot = ballVX > 0;

          // Botul reacționează mai rar și cu o marjă de eroare pentru a fi mai accesibil.
          if (now >= botNextMistakeAt) {
            botMistakeY = s.random(-48, 48);
            botNextMistakeAt = now + s.random(900, 1800);
          }

          if (now >= botNextReactionAt) {
            let desiredY = s.height * 0.5;

            if (ballMovingToBot) {
              const travelX = Math.max(1, s.width - (PADDING + paddleWidth + 16) - ballX);
              const projectedY = ballY + (ballVY / Math.max(0.1, ballVX)) * travelX;
              const wobble = Math.sin(s.frameCount * 0.075) * 10;
              desiredY = projectedY + wobble + botMistakeY;
            } else {
              desiredY = s.height * 0.5 + Math.sin(s.frameCount * 0.03) * 28;
            }

            botAimY = desiredY;
            botNextReactionAt = now + s.random(55, 130);
          }

          const delta = botAimY - botY;
          botY += clamp(delta, -botSpeed, botSpeed);
        };

        const bounceOffPaddle = (isPlayerPaddle: boolean) => {
          const paddleX = isPlayerPaddle ? PADDING : s.width - PADDING - paddleWidth;
          const paddleY = isPlayerPaddle ? playerY : botY;
          const left = paddleX;
          const right = paddleX + paddleWidth;
          const top = paddleY - paddleHeight / 2;
          const bottom = paddleY + paddleHeight / 2;

          const ballRadius = 8;
          const intersects =
            ballX + ballRadius > left &&
            ballX - ballRadius < right &&
            ballY + ballRadius > top &&
            ballY - ballRadius < bottom;

          if (!intersects) return;

          const relative = clamp((ballY - paddleY) / (paddleHeight / 2), -1, 1);
          const newAngle = relative * 0.85;
          const speed = Math.min(maxBallSpeed, Math.sqrt(ballVX * ballVX + ballVY * ballVY) * 1.05);

          if (isPlayerPaddle && ballVX < 0) {
            ballVX = Math.cos(newAngle) * speed;
            ballVY = Math.sin(newAngle) * speed;
            ballX = right + ballRadius;
          }

          if (!isPlayerPaddle && ballVX > 0) {
            ballVX = -Math.cos(newAngle) * speed;
            ballVY = Math.sin(newAngle) * speed;
            ballX = left - ballRadius;
          }
        };

        const registerScore = (playerWonPoint: boolean) => {
          if (playerWonPoint) {
            playerScore += 1;
            roundMessage = "Punct pentru tine";
          } else {
            botScore += 1;
            roundMessage = "Botul a punctat";
          }

          roundMessageUntil = performance.now() + 900;

          const finished = playerScore >= SCORE_TO_WIN || botScore >= SCORE_TO_WIN;
          if (finished) {
            roundMessage = playerScore > botScore ? "Ai castigat duelul 404" : "Botul castiga duelul 404";
            roundMessageUntil = performance.now() + 1800;
            playerScore = 0;
            botScore = 0;
          }

          resetBall(!playerWonPoint);
          botMistakeY = s.random(-56, 56);
          botAimY = s.height * 0.5;
          botNextReactionAt = performance.now() + s.random(60, 150);
        };

        s.setup = () => {
          const width = Math.max(320, container.offsetWidth || 320);
          const height = Math.max(260, container.offsetHeight || 260);
          s.createCanvas(width, height);
          s.frameRate(60);

          playerY = s.height * 0.5;
          botY = s.height * 0.5;
          botAimY = botY;
          botMistakeY = s.random(-40, 40);
          botNextMistakeAt = performance.now() + s.random(800, 1600);
          botNextReactionAt = performance.now() + s.random(40, 120);
          resetBall(false);
        };

        s.windowResized = updateCanvasSize;

        s.draw = () => {
          s.background(11, 18, 32);

          for (let i = 0; i < s.height; i += 8) {
            const alpha = 8 + (i / s.height) * 24;
            s.stroke(34, 211, 238, alpha);
            s.line(0, i, s.width, i);
          }

          s.noStroke();
          s.fill(255, 255, 255, 18);
          for (let y = 12; y < s.height - 12; y += 22) {
            s.rect(s.width * 0.5 - 2, y, 4, 12, 3);
          }

          movePlayer();
          moveBot();
          clampPaddles();

          ballX += ballVX;
          ballY += ballVY;

          const ballRadius = 8;
          if (ballY <= ballRadius || ballY >= s.height - ballRadius) {
            ballVY *= -1;
            ballY = clamp(ballY, ballRadius, s.height - ballRadius);
          }

          bounceOffPaddle(true);
          bounceOffPaddle(false);

          if (ballX < -12) registerScore(false);
          if (ballX > s.width + 12) registerScore(true);

          s.noStroke();
          s.fill(251, 191, 36);
          s.rect(PADDING, playerY - paddleHeight / 2, paddleWidth, paddleHeight, 8);

          s.fill(14, 165, 233);
          s.rect(s.width - PADDING - paddleWidth, botY - paddleHeight / 2, paddleWidth, paddleHeight, 8);

          s.fill(248, 250, 252);
          s.circle(ballX, ballY, ballRadius * 2);

          s.textAlign(s.CENTER, s.TOP);
          s.textStyle(s.BOLD);
          s.fill(148, 163, 184);
          s.textSize(18);
          s.text("404", s.width * 0.5, 12);

          s.fill(251, 191, 36);
          s.textSize(30);
          s.text(String(playerScore), s.width * 0.5 - 40, 30);

          s.fill(14, 165, 233);
          s.text(String(botScore), s.width * 0.5 + 40, 30);

          if (performance.now() < roundMessageUntil) {
            s.textAlign(s.CENTER, s.BOTTOM);
            s.textSize(14);
            s.fill(226, 232, 240);
            s.text(roundMessage, s.width * 0.5, s.height - 14);
          }
        };
      };

      instance = new P5(sketch, container);
    };

    setupSketch();

    return () => {
      isMounted = false;
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("touchmove", onTouchMove);
      instance?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[320px] w-full overflow-hidden rounded-3xl border border-cyan-200/60 bg-slate-950 shadow-[0_20px_70px_-40px_rgba(56,189,248,0.9)] sm:h-[420px]"
      role="img"
      aria-label="Mini joc Pong pe pagina 404: controleaza paleta din stanga cu mouse-ul sau touch"
    />
  );
}
