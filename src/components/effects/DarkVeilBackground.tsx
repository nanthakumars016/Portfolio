import { useEffect, useRef } from "react";

interface DarkVeilBackgroundProps {
  speed?: number;
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  scanlineFrequency?: number;
  warpAmount?: number;
  className?: string;
}

export function DarkVeilBackground({
  speed = 0.5,
  hueShift = 0,
  noiseIntensity = 0,
  scanlineIntensity = 0,
  scanlineFrequency = 0,
  warpAmount = 0,
  className = "",
}: DarkVeilBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      time += 0.01 * speed;

      const width = canvas.width;
      const height = canvas.height;

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      
      // Dynamic colors based on time and hueShift
      const hue1 = (220 + hueShift + Math.sin(time) * 20) % 360;
      const hue2 = (280 + hueShift + Math.cos(time * 0.7) * 30) % 360;
      const hue3 = (320 + hueShift + Math.sin(time * 0.5) * 25) % 360;

      gradient.addColorStop(0, `hsla(${hue1}, 80%, 8%, 1)`);
      gradient.addColorStop(0.3, `hsla(${hue2}, 70%, 5%, 1)`);
      gradient.addColorStop(0.6, `hsla(${hue1}, 60%, 3%, 1)`);
      gradient.addColorStop(1, `hsla(${hue3}, 80%, 6%, 1)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add flowing veils
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, height * 0.3 + Math.sin(time + i) * 100);

        for (let x = 0; x <= width; x += 50) {
          const warp = warpAmount * Math.sin(x * 0.005 + time * 2);
          const y = height * 0.3 + 
            Math.sin(x * 0.003 + time + i * 0.5) * 150 +
            Math.cos(x * 0.002 + time * 0.7 + i) * 100 +
            warp * 50;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const veilGradient = ctx.createLinearGradient(0, 0, width, height);
        const alpha = 0.03 + i * 0.01;
        veilGradient.addColorStop(0, `hsla(${hue1 + i * 20}, 80%, 50%, ${alpha})`);
        veilGradient.addColorStop(0.5, `hsla(${hue2 + i * 15}, 70%, 40%, ${alpha * 0.8})`);
        veilGradient.addColorStop(1, `hsla(${hue3 + i * 25}, 60%, 30%, ${alpha * 0.5})`);

        ctx.fillStyle = veilGradient;
        ctx.fill();
      }

      // Add subtle glowing orbs
      for (let i = 0; i < 3; i++) {
        const x = width * (0.2 + i * 0.3) + Math.sin(time * 0.5 + i * 2) * 100;
        const y = height * 0.5 + Math.cos(time * 0.3 + i * 1.5) * 150;
        const radius = 100 + Math.sin(time + i) * 30;

        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        orbGradient.addColorStop(0, `hsla(${hue2 + i * 40}, 100%, 60%, 0.1)`);
        orbGradient.addColorStop(0.5, `hsla(${hue1 + i * 30}, 80%, 40%, 0.05)`);
        orbGradient.addColorStop(1, "transparent");

        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add noise if enabled
      if (noiseIntensity > 0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * noiseIntensity * 30;
          data[i] += noise;
          data[i + 1] += noise;
          data[i + 2] += noise;
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // Add scanlines if enabled
      if (scanlineIntensity > 0 && scanlineFrequency > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${scanlineIntensity * 0.3})`;
        for (let y = 0; y < height; y += scanlineFrequency * 2 + 2) {
          ctx.fillRect(0, y, width, 1);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, hueShift, noiseIntensity, scanlineIntensity, scanlineFrequency, warpAmount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background: "linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background)))" }}
    />
  );
}

export default DarkVeilBackground;
