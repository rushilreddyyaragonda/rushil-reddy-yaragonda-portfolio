import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useActiveSection';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  baseX: number;
  baseY: number;
  highlighted: boolean;
}

const NODE_LABELS = [
  'algorithms',
  'simulation',
  'systems',
  'failure',
  'constraints',
  'emergence',
  'evidence',
  'trade-offs',
  'complexity',
  'inquiry',
];

export function SystemVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const animationRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = parent.clientWidth;
    let height = parent.clientHeight;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const nodeCount = width < 640 ? 7 : 10;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const r = Math.min(width, height) * 0.3;
      const cx = width / 2;
      const cy = height / 2;
      const bx = cx + Math.cos(angle) * r + (Math.random() - 0.5) * 24;
      const by = cy + Math.sin(angle) * r + (Math.random() - 0.5) * 24;
      nodes.push({
        x: bx,
        y: by,
        baseX: bx,
        baseY: by,
        vx: 0,
        vy: 0,
        radius: 2.5 + Math.random() * 1.5,
        label: NODE_LABELS[i % NODE_LABELS.length],
        highlighted: i === 0 || i === 5,
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(parent);

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // Subtle grid background
      ctx.strokeStyle = 'rgba(212, 208, 200, 0.15)';
      ctx.lineWidth = 0.5;
      const gridSpacing = 28;
      for (let x = 0; x <= width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update node positions
      nodes.forEach((node) => {
        if (!prefersReduced) {
          const dx = node.baseX - node.x;
          const dy = node.baseY - node.y;
          node.vx += dx * 0.003;
          node.vy += dy * 0.003;

          // Mouse repulsion
          const mdx = node.x - mouseRef.current.x;
          const mdy = node.y - mouseRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 120 && mdist > 0) {
            const force = (120 - mdist) / 120;
            node.vx += (mdx / mdist) * force * 0.8;
            node.vy += (mdy / mdist) * force * 0.8;
          }

          node.vx *= 0.92;
          node.vy *= 0.92;
          node.x += node.vx;
          node.y += node.vy;
        }
      });

      // Draw connections
      const maxDist = Math.min(width, height) * 0.42;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.25;
            ctx.strokeStyle = `rgba(30, 58, 138, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      if (mouseRef.current.x > 0 && !prefersReduced) {
        nodes.forEach((node) => {
          const dx = node.x - mouseRef.current.x;
          const dy = node.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const opacity = (1 - dist / 140) * 0.55;
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        });
      }

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = prefersReduced ? 0 : Math.sin(frame * 0.02 + node.baseX * 0.01) * 0.5 + 0.5;

        // Outer ring for highlighted nodes
        if (node.highlighted) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6 + pulse * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 + pulse * 0.15})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Outer subtle ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(28, 28, 30, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Filled circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.highlighted ? '#2563eb' : '#1e3a8a';
        ctx.fill();

        // Label
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = node.highlighted ? 'rgba(37, 99, 235, 0.8)' : 'rgba(107, 107, 112, 0.65)';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - node.radius - 6);
      });

      if (!prefersReduced) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      resizeObserver.disconnect();
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-label="Interactive network diagram representing interconnected systems of thought"
      role="img"
    />
  );
}
