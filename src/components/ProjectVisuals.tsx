import { useEffect, useRef, useState } from 'react';

/**
 * Policy diagram for The Last Human Decision.
 * Shows five interconnected policy variables with live tension indicators.
 */
export function PolicyDiagram() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  const variables = [
    { name: 'Trust', x: 50, y: 50, color: '#2563eb', value: 0.6 + Math.sin(tick * 0.3) * 0.2 },
    { name: 'Liberty', x: 150, y: 30, color: '#1e3a8a', value: 0.5 + Math.cos(tick * 0.25) * 0.25 },
    { name: 'Equity', x: 200, y: 100, color: '#b45309', value: 0.55 + Math.sin(tick * 0.2 + 1) * 0.2 },
    { name: 'Resilience', x: 100, y: 120, color: '#1c1c1e', value: 0.45 + Math.cos(tick * 0.3 + 2) * 0.2 },
    { name: 'Automation', x: 250, y: 60, color: '#6b6b70', value: 0.7 + Math.sin(tick * 0.35 + 3) * 0.15 },
  ];

  return (
    <svg viewBox="0 0 300 160" className="w-full h-auto" role="img" aria-label="Policy variables diagram showing trust, liberty, equity, resilience, and automation as interconnected metrics">
      {/* Connections */}
      {variables.map((v, i) =>
        variables.slice(i + 1).map((w, j) => (
          <line
            key={`${i}-${j}`}
            x1={v.x}
            y1={v.y}
            x2={w.x}
            y2={w.y}
            stroke="rgba(30, 58, 138, 0.15)"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />
        ))
      )}
      {/* Nodes */}
      {variables.map((v) => (
        <g key={v.name}>
          <circle
            cx={v.x}
            cy={v.y}
            r={12 + v.value * 8}
            fill="none"
            stroke={v.color}
            strokeWidth="1"
            opacity={0.3}
          >
            <animate
              attributeName="r"
              values={`${12 + v.value * 8};${14 + v.value * 8};${12 + v.value * 8}`}
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={v.x} cy={v.y} r="5" fill={v.color} opacity="0.8" />
          <text
            x={v.x}
            y={v.y - 16}
            textAnchor="middle"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
            fill="#6b6b70"
          >
            {v.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

/**
 * Claim-context illustration for ContextShield.
 * Shows a central claim surrounded by evidence fragments and uncertainty indicators.
 */
export function ClaimContextDiagram() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label="A central claim surrounded by evidence fragments, contextual notes, and uncertainty indicators">
      {/* Central claim */}
      <rect x="120" y="70" width="80" height="40" fill="#f7f4ef" stroke="#1c1c1e" strokeWidth="1.2" rx="2" />
      <text x="160" y="86" textAnchor="middle" fontSize="8" fontFamily="'JetBrains Mono', monospace" fill="#1c1c1e" fontWeight="500">CLAIM</text>
      <text x="160" y="98" textAnchor="middle" fontSize="7" fontFamily="'Inter', sans-serif" fill="#6b6b70">"X is true"</text>

      {/* Evidence fragments */}
      {[
        { x: 30, y: 30, w: 60, label: 'Evidence A', type: 'support' },
        { x: 230, y: 30, w: 60, label: 'Evidence B', type: 'support' },
        { x: 30, y: 120, w: 60, label: 'Context C', type: 'context' },
        { x: 230, y: 120, w: 60, label: 'Context D', type: 'context' },
        { x: 120, y: 15, w: 80, label: 'Missing?', type: 'missing' },
        { x: 120, y: 130, w: 80, label: 'Conflict?', type: 'missing' },
      ].map((frag, i) => (
        <g key={i}>
          <rect
            x={frag.x}
            y={frag.y}
            width={frag.w}
            height="22"
            fill={frag.type === 'missing' ? '#ede8e0' : '#f7f4ef'}
            stroke={frag.type === 'missing' ? '#b45309' : '#d4d0c8'}
            strokeWidth="1"
            strokeDasharray={frag.type === 'missing' ? '3 2' : 'none'}
            rx="2"
          />
          <text
            x={frag.x + frag.w / 2}
            y={frag.y + 14}
            textAnchor="middle"
            fontSize="7"
            fontFamily="'JetBrains Mono', monospace"
            fill={frag.type === 'missing' ? '#b45309' : '#6b6b70'}
          >
            {frag.label}
          </text>
          {/* Connection line */}
          <line
            x1={frag.x + frag.w / 2}
            y1={frag.y < 70 ? frag.y + 22 : frag.y}
            x2={frag.x + frag.w / 2 < 160 ? 120 : 200}
            y2={frag.y < 70 ? 70 : 110}
            stroke={frag.type === 'missing' ? '#b45309' : '#d4d0c8'}
            strokeWidth="0.8"
            strokeDasharray="2 2"
            opacity="0.6"
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * City network simulation for CrowdMind.
 * A small canvas with moving agents on a graph.
 */
export function CityNetworkDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf: number | undefined;

    const width = 320;
    const height = 180;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    ctx.scale(dpr, dpr);

    // Simple graph: nodes and edges
    const nodes = [
      { x: 40, y: 40 }, { x: 160, y: 30 }, { x: 280, y: 50 },
      { x: 80, y: 90 }, { x: 200, y: 100 }, { x: 280, y: 130 },
      { x: 40, y: 140 }, { x: 160, y: 150 },
    ];
    const edges = [
      [0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [2, 5], [4, 5],
      [3, 6], [6, 7], [7, 4], [5, 7],
    ];

    // Agents moving along edges
    const agents = Array.from({ length: 6 }, (_, i) => ({
      edgeIdx: i % edges.length,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw edges
      edges.forEach(([a, b]) => {
        ctx.strokeStyle = 'rgba(212, 208, 200, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#1e3a8a';
        ctx.fill();
      });

      // Draw and update agents
      agents.forEach((agent) => {
        const [a, b] = edges[agent.edgeIdx];
        const x = nodes[a].x + (nodes[b].x - nodes[a].x) * agent.progress;
        const y = nodes[a].y + (nodes[b].y - nodes[a].y) * agent.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#b45309';
        ctx.fill();

        if (!reduced) {
          agent.progress += agent.speed;
          if (agent.progress >= 1) {
            agent.progress = 0;
            agent.edgeIdx = Math.floor(Math.random() * edges.length);
          }
        }
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="City network simulation with agents moving along roads"
    />
  );
}

/**
 * Waveform visualization for SilentSignal.
 */
export function WaveformDiagram() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    let raf: number | undefined;
    const animate = () => {
      setPhase((p) => p + 0.05);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, []);

  const width = 320;
  const height = 120;
  const points: string[] = [];
  const freqPoints: string[] = [];

  for (let x = 0; x <= width; x += 2) {
    const t = x / width;
    const y = height / 2 + Math.sin(t * Math.PI * 4 + phase) * 18 * Math.sin(t * Math.PI + phase * 0.5) + Math.sin(t * Math.PI * 8 + phase * 1.3) * 8;
    points.push(`${x},${y}`);
  }

  // Frequency bars (static-ish, subtle movement)
  const numBars = 24;
  for (let i = 0; i < numBars; i++) {
    const h = 10 + Math.abs(Math.sin(i * 0.4 + phase * 0.3)) * 35;
    freqPoints.push(`${i},${h}`);
  }

  return (
    <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full h-auto" role="img" aria-label="Audio waveform transitioning into a frequency spectrum visualization">
      {/* Waveform */}
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="#2563eb"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#d4d0c8" strokeWidth="0.5" strokeDasharray="2 3" />

      {/* Frequency bars */}
      {Array.from({ length: numBars }).map((_, i) => {
    const h = 10 + Math.abs(Math.sin(i * 0.4 + phase * 0.3)) * 35;
    const barWidth = (width / numBars) - 2;
    return (
      <rect
        key={i}
        x={i * (width / numBars) + 1}
        y={height + 25 - h}
        width={barWidth}
        height={h}
        fill="#1e3a8a"
        opacity="0.5"
      />
    );
  })}
      <text x="2" y={height + 12} fontSize="7" fontFamily="'JetBrains Mono', monospace" fill="#6b6b70">waveform</text>
      <text x={width - 60} y={height + 12} fontSize="7" fontFamily="'JetBrains Mono', monospace" fill="#6b6b70">frequency</text>
    </svg>
  );
}

/**
 * Constraint diagram for The Alignment Lab.
 * Shows competing objectives, decision paths, and constraints.
 */
export function ConstraintDiagram() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label="Constraint diagram showing competing objectives, a constraint boundary, and decision paths">
      {/* Objective space */}
      <rect x="20" y="20" width="280" height="120" fill="none" stroke="#d4d0c8" strokeWidth="1" strokeDasharray="4 2" rx="2" />
      <text x="24" y="14" fontSize="7" fontFamily="'JetBrains Mono', monospace" fill="#6b6b70">objective space</text>

      {/* Constraint boundary */}
      <path
        d="M 60 130 Q 120 60 260 80"
        fill="none"
        stroke="#b45309"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />
      <text x="200" y="100" fontSize="7" fontFamily="'JetBrains Mono', monospace" fill="#b45309">constraint</text>

      {/* Feasible region (shaded) */}
      <path
        d="M 60 130 Q 120 60 260 80 L 260 140 L 60 140 Z"
        fill="rgba(37, 99, 235, 0.06)"
      />

      {/* Decision points */}
      {[
        { x: 80, y: 110, label: 'A', good: true },
        { x: 140, y: 85, label: 'B', good: true },
        { x: 200, y: 75, label: 'C', good: false },
        { x: 180, y: 115, label: 'D', good: true },
        { x: 240, y: 100, label: 'E', good: false },
      ].map((pt) => (
        <g key={pt.label}>
          <circle
            cx={pt.x}
            cy={pt.y}
            r="4"
            fill={pt.good ? '#2563eb' : '#b45309'}
          />
          <text
            x={pt.x + 7}
            y={pt.y + 3}
            fontSize="7"
            fontFamily="'JetBrains Mono', monospace"
            fill={pt.good ? '#2563eb' : '#b45309'}
          >
            {pt.label}
          </text>
        </g>
      ))}

      {/* Decision path */}
      <path
        d="M 80 110 L 140 85 L 200 75"
        fill="none"
        stroke="#1c1c1e"
        strokeWidth="1"
        opacity="0.4"
        markerEnd="url(#arrow)"
      />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#1c1c1e" opacity="0.4" />
        </marker>
      </defs>

      <text x="20" y="170" fontSize="7" fontFamily="'JetBrains Mono', monospace" fill="#6b6b70">
        ● satisfies objectives & intent　● satisfies objectives, fails intent
      </text>
    </svg>
  );
}

/**
 * Execution trace for Algorithm Autopsy.
 * Shows a step-by-step trace with a highlighted counterexample.
 */
export function ExecutionTraceDiagram() {
  const steps = [
    { input: '[3, 1, 4, 1, 5]', op: 'compare(3,1)', state: '[1, 3, 4, 1, 5]', highlight: false },
    { input: '[1, 3, 4, 1, 5]', op: 'compare(3,4)', state: '[1, 3, 4, 1, 5]', highlight: false },
    { input: '[1, 3, 4, 1, 5]', op: 'compare(4,1)', state: '[1, 3, 1, 4, 5]', highlight: false },
    { input: '[1, 3, 1, 4, 5]', op: 'compare(3,1)', state: '[1, 1, 3, 4, 5]', highlight: true },
    { input: '[1, 1, 3, 4, 5]', op: 'compare(4,5)', state: '[1, 1, 3, 4, 5]', highlight: false },
  ];

  return (
    <div className="w-full space-y-0.5" role="img" aria-label="Execution trace showing algorithm steps with a highlighted counterexample step">
      {/* Counterexample marker */}
      <div className="font-mono text-[10px] text-[var(--amber)] mb-1 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[var(--amber)]" />
        counterexample found at step 4
      </div>
      {steps.map((step, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-mono transition-colors ${
            step.highlight
              ? 'bg-[var(--amber)]/10 border border-[var(--amber)]/30'
              : 'bg-transparent'
          }`}
        >
          <span className="text-[var(--ink-muted)] w-5 text-right">{i + 1}</span>
          <span className="text-[var(--ink-soft)] flex-1 truncate">{step.op}</span>
          <span className="text-[var(--ink-muted)]">→</span>
          <span className={step.highlight ? 'text-[var(--amber)] font-medium' : 'text-[var(--ink-muted)]'}>
            {step.state}
          </span>
        </div>
      ))}
      <div className="font-mono text-[10px] text-[var(--ink-muted)] mt-1.5 pt-1.5 border-t border-[var(--graphite)]">
        operations: 5 · comparisons: 5 · counterexample: 1
      </div>
    </div>
  );
}

/**
 * Renders the appropriate visualization based on visualType.
 */
export function ProjectVisual({ type }: { type: string }) {
  switch (type) {
    case 'policy-diagram':
      return <PolicyDiagram />;
    case 'claim-context':
      return <ClaimContextDiagram />;
    case 'city-network':
      return <CityNetworkDiagram />;
    case 'waveform':
      return <WaveformDiagram />;
    case 'constraint-diagram':
      return <ConstraintDiagram />;
    case 'execution-trace':
      return <ExecutionTraceDiagram />;
    default:
      return null;
  }
}
