import { useState, useMemo } from 'react';
import { siteConfig } from '@/config/site';

// ============================================================
// Experiment A — The Smallest Failure
// Minimize a failing input by removing elements while preserving failure.
// ============================================================
function SmallestFailureExperiment() {
  const [input, setInput] = useState<number[]>([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]);

  // "Failure" = array is not sorted. We minimize by removing elements
  // while keeping the array unsorted.
  const isSorted = (arr: number[]) => arr.every((v, i) => i === 0 || arr[i - 1] <= v);

  const sortedInput = useMemo(() => {
    const sorted = [...input].sort((a, b) => a - b);
    return input.every((v, i) => v === sorted[i]);
  }, [input]);

  const [minimized, setMinimized] = useState<number[] | null>(null);

  const minimize = () => {
    let current = [...input];
    if (isSorted(current)) {
      setMinimized([...current]);
      return;
    }
    // Try removing each element; if the result is still unsorted, keep the removal
    let changed = true;
    while (changed && current.length > 2) {
      changed = false;
      for (let i = 0; i < current.length; i++) {
        const candidate = current.filter((_, idx) => idx !== i);
        if (!isSorted(candidate)) {
          current = candidate;
          changed = true;
          break;
        }
      }
    }
    setMinimized(current);
  };

  const reset = () => {
    setMinimized(null);
    setInput([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-mono text-[11px] text-[var(--ink-muted)]">input:</span>
        <div className="flex flex-wrap gap-1">
          {input.map((n, i) => (
            <span key={i} className="font-mono text-[12px] px-2 py-1 bg-[var(--paper-dark)] border border-[var(--graphite)] rounded text-[var(--ink)]">
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={minimize}
          className="focus-ring px-3 py-1.5 text-[12px] font-medium bg-[var(--ink)] text-[var(--paper)] rounded hover:bg-[var(--cobalt)] transition-colors"
        >
          Minimize failing input
        </button>
        <button
          onClick={reset}
          className="focus-ring px-3 py-1.5 text-[12px] font-medium border border-[var(--graphite)] text-[var(--ink-muted)] rounded hover:border-[var(--ink-muted)] transition-colors"
        >
          Reset
        </button>
        <span className={`font-mono text-[11px] ${sortedInput ? 'text-green-700' : 'text-[var(--amber)]'}`}>
          {sortedInput ? '✓ sorted (no failure)' : '✗ not sorted (failure present)'}
        </span>
      </div>

      {minimized && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono text-[11px] text-[var(--amber)]">minimal counterexample:</span>
            <div className="flex flex-wrap gap-1">
              {minimized.map((n, i) => (
                <span key={i} className="font-mono text-[12px] px-2 py-1 bg-[var(--amber)]/10 border border-[var(--amber)]/30 rounded text-[var(--amber)]">
                  {n}
                </span>
              ))}
            </div>
            <span className="font-mono text-[11px] text-[var(--ink-muted)]">
              ({minimized.length} elements, down from {input.length})
            </span>
          </div>
          {minimized.length <= 2 && !isSorted(minimized) && (
            <p className="text-[12px] text-[var(--ink-muted)] leading-relaxed">
              Two elements out of order — the smallest possible counterexample. This is the root of the failure.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Experiment B — When the Shortest Path Gets Longer
// Disrupt an edge and see how the shortest path changes.
// ============================================================
function ShortestPathExperiment() {
  // Small weighted graph
  const nodes = [
    { id: 'A', x: 40, y: 80 },
    { id: 'B', x: 130, y: 30 },
    { id: 'C', x: 130, y: 130 },
    { id: 'D', x: 220, y: 80 },
    { id: 'E', x: 280, y: 30 },
    { id: 'F', x: 280, y: 130 },
  ];

  const [edges] = useState([
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 3 },
    { from: 'B', to: 'D', weight: 5 },
    { from: 'C', to: 'D', weight: 2 },
    { from: 'B', to: 'C', weight: 2 },
    { from: 'D', to: 'E', weight: 3 },
    { from: 'D', to: 'F', weight: 4 },
    { from: 'E', to: 'F', weight: 1 },
  ]);

  const [disruptedEdge, setDisruptedEdge] = useState<number | null>(null);

  // Dijkstra's from A to F
  const computePath = (disabledEdge: number | null) => {
    const adj: Record<string, { node: string; weight: number }[]> = {};
    nodes.forEach((n) => (adj[n.id] = []));
    edges.forEach((e, i) => {
      if (i === disabledEdge) return;
      adj[e.from].push({ node: e.to, weight: e.weight });
      adj[e.to].push({ node: e.from, weight: e.weight });
    });

    const dist: Record<string, number> = {};
    const prev: Record<string, string | null> = {};
    nodes.forEach((n) => {
      dist[n.id] = Infinity;
      prev[n.id] = null;
    });
    dist['A'] = 0;

    const queue = new Set(nodes.map((n) => n.id));
    while (queue.size > 0) {
      let u: string | null = null;
      let minDist = Infinity;
      queue.forEach((node) => {
        if (dist[node] < minDist) {
          minDist = dist[node];
          u = node;
        }
      });
      if (u === null || dist[u] === Infinity) break;
      queue.delete(u);

      if (u === null) break;
      const currentNode = u;
      adj[currentNode].forEach(({ node, weight }) => {
        if (!queue.has(node)) return;
        const alt = dist[currentNode]! + weight;
        if (alt < dist[node]) {
          dist[node] = alt;
          prev[node] = currentNode;
        }
      });
    }

    // Reconstruct path
    const path: string[] = [];
    let curr: string | null = 'F';
    while (curr) {
      path.unshift(curr);
      curr = prev[curr];
    }
    return { path, distance: dist['F'] };
  };

  const original = computePath(null);
  const disrupted = disruptedEdge !== null ? computePath(disruptedEdge) : null;

  const pathEdges = new Set<string>();
  const addPathEdges = (path: string[]) => {
    for (let i = 0; i < path.length - 1; i++) {
      pathEdges.add(`${path[i]}-${path[i + 1]}`);
      pathEdges.add(`${path[i + 1]}-${path[i]}`);
    }
  };
  addPathEdges(original.path);
  if (disrupted) addPathEdges(disrupted.path);

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 320 160" className="w-full h-auto" role="img" aria-label="Graph showing shortest path from A to F, with clickable edges to disrupt">
        {/* Edges */}
        {edges.map((edge, i) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          const isDisrupted = i === disruptedEdge;
          const isOnPath = pathEdges.has(`${edge.from}-${edge.to}`);
          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isDisrupted ? '#b45309' : isOnPath ? '#2563eb' : '#d4d0c8'}
                strokeWidth={isOnPath ? 2 : 1}
                strokeDasharray={isDisrupted ? '4 2' : 'none'}
                opacity={isDisrupted ? 0.6 : 1}
              />
              {/* Clickable area */}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="transparent"
                  strokeWidth="20"
                  className="cursor-pointer"
                  onClick={() => setDisruptedEdge(disruptedEdge === i ? null : i)}
                />
              <text
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2 - 4}
                textAnchor="middle"
                fontSize="8"
                fontFamily="'JetBrains Mono', monospace"
                fill={isDisrupted ? '#b45309' : '#6b6b70'}
              >
                {edge.weight}
              </text>
            </g>
          );
        })}
        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="12" fill="#f7f4ef" stroke="#1c1c1e" strokeWidth="1.2" />
            <text
              x={n.x}
              y={n.y + 3}
              textAnchor="middle"
              fontSize="10"
              fontFamily="'Inter', sans-serif"
              fontWeight="600"
              fill="#1c1c1e"
            >
              {n.id}
            </text>
          </g>
        ))}
      </svg>

      <div className="flex flex-wrap items-center gap-4 text-[12px]">
        <button
          onClick={() => setDisruptedEdge(null)}
          className="focus-ring px-3 py-1.5 text-[12px] font-medium border border-[var(--graphite)] text-[var(--ink-muted)] rounded hover:border-[var(--ink-muted)] transition-colors"
        >
          Reset
        </button>
        <div className="space-y-0.5">
          <p className="font-mono text-[var(--ink-soft)]">
            original path: {original.path.join(' → ')} <span className="text-[var(--ink-muted)]">(cost: {original.distance})</span>
          </p>
          {disrupted && (
            <p className="font-mono text-[var(--amber)]">
              disrupted path: {disrupted.path.join(' → ')} <span className="text-[var(--ink-muted)]">(cost: {disrupted.distance})</span>
              {disrupted.distance > original.distance && (
                <span className="ml-2 text-[var(--amber)]">
                  +{disrupted.distance - original.distance}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
        Click any edge to disrupt it. The shortest path from A to F will recompute.
      </p>
    </div>
  );
}

// ============================================================
// Experiment C — Rules Versus Outcomes
// Adjust objective weights and see how the selected option changes.
// ============================================================
function RulesVsOutcomesExperiment() {
  const options = [
    { id: 'X', speed: 8, safety: 3, cost: 2 },
    { id: 'Y', speed: 4, safety: 7, cost: 5 },
    { id: 'Z', speed: 2, safety: 9, cost: 8 },
  ];

  const [weights, setWeights] = useState({ speed: 0.4, safety: 0.4, cost: 0.2 });

  const scores = options.map((opt) => ({
    ...opt,
    score: opt.speed * weights.speed + opt.safety * weights.safety + opt.cost * weights.cost,
  }));

  const best = scores.reduce((a, b) => (b.score > a.score ? b : a));

  const totalWeight = weights.speed + weights.safety + weights.cost;

  return (
    <div className="space-y-5">
      {/* Weight sliders */}
      <div className="space-y-3">
        {(['speed', 'safety', 'cost'] as const).map((key) => (
          <div key={key} className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-[var(--ink-soft)] w-14 capitalize">{key}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={weights[key]}
              onChange={(e) => setWeights({ ...weights, [key]: parseFloat(e.target.value) })}
              className="flex-1 accent-[var(--cobalt-bright)]"
              aria-label={`${key} weight`}
            />
            <span className="font-mono text-[11px] text-[var(--ink-muted)] w-10 text-right">
              {weights[key].toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-2">
        {scores.map((opt) => (
          <div
            key={opt.id}
            className={`flex items-center gap-3 p-2.5 rounded border transition-all ${
              best.id === opt.id
                ? 'border-[var(--cobalt-bright)] bg-[var(--cobalt-bright)]/5'
                : 'border-[var(--graphite)] bg-transparent'
            }`}
          >
            <span className={`font-mono text-sm font-medium ${best.id === opt.id ? 'text-[var(--cobalt-bright)]' : 'text-[var(--ink)]'}`}>
              Option {opt.id}
            </span>
            <span className="font-mono text-[10px] text-[var(--ink-muted)]">
              speed:{opt.speed} safety:{opt.safety} cost:{opt.cost}
            </span>
            <span className="ml-auto font-mono text-[12px] font-medium text-[var(--ink)]">
              score: {opt.score.toFixed(2)}
            </span>
            {best.id === opt.id && (
              <span className="font-mono text-[10px] text-[var(--cobalt-bright)] uppercase tracking-wider">selected</span>
            )}
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
        Drag the sliders to change how much each objective matters. The selected option
        changes as the weights shift — even though the options stay the same.
        {Math.abs(totalWeight - 1) > 0.05 && (
          <span className="text-[var(--amber)] block mt-1">
            Note: weights don't sum to 1.0 (current sum: {totalWeight.toFixed(2)}). Scores are still comparable.
          </span>
        )}
      </p>
    </div>
  );
}

// ============================================================
// Experiment D — One Input, Different Costs
// Compare operation counts of two algorithms on the same input.
// ============================================================
function OneInputDifferentCostsExperiment() {
  const [size, setSize] = useState(32);

  // Bubble sort comparison count
  const bubbleComparisons = useMemo(() => {
    const arr = Array.from({ length: size }, (_, i) => size - i); // reversed
    let count = 0;
    const a = [...arr];
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - 1; j++) {
        count++;
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
        }
      }
    }
    return count;
  }, [size]);

  // Merge sort comparison count
  const mergeComparisons = useMemo(() => {
    const arr = Array.from({ length: size }, (_, i) => size - i);
    let count = 0;
    const merge = (left: number[], right: number[]): number[] => {
      const result: number[] = [];
      let i = 0, j = 0;
      while (i < left.length && j < right.length) {
        count++;
        if (left[i] <= right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }
      return [...result, ...left.slice(i), ...right.slice(j)];
    };
    const sort = (a: number[]): number[] => {
      if (a.length <= 1) return a;
      const mid = Math.floor(a.length / 2);
      return merge(sort(a.slice(0, mid)), sort(a.slice(mid)));
    };
    sort(arr);
    return count;
  }, [size]);

  const maxCount = Math.max(bubbleComparisons, mergeComparisons);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] text-[var(--ink-soft)]">input size:</span>
        <input
          type="range"
          min="4"
          max="64"
          step="1"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="flex-1 accent-[var(--cobalt-bright)]"
          aria-label="Input size"
        />
        <span className="font-mono text-[12px] text-[var(--ink)] w-8 text-right">{size}</span>
      </div>

      <p className="text-[11px] text-[var(--ink-muted)]">
        Input: reversed array of {size} elements. Both algorithms sort the same input.
      </p>

      {/* Bar chart */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[11px] text-[var(--ink-soft)]">Bubble Sort</span>
            <span className="font-mono text-[11px] text-[var(--ink)]">{bubbleComparisons} comparisons</span>
          </div>
          <div className="h-6 bg-[var(--paper-dark)] rounded overflow-hidden">
            <div
              className="h-full bg-[var(--amber)] transition-all duration-300"
              style={{ width: `${(bubbleComparisons / maxCount) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[11px] text-[var(--ink-soft)]">Merge Sort</span>
            <span className="font-mono text-[11px] text-[var(--ink)]">{mergeComparisons} comparisons</span>
          </div>
          <div className="h-6 bg-[var(--paper-dark)] rounded overflow-hidden">
            <div
              className="h-full bg-[var(--cobalt-bright)] transition-all duration-300"
              style={{ width: `${(mergeComparisons / maxCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="font-mono text-[11px] text-[var(--ink-muted)] flex items-center gap-2">
        <span>ratio: {(bubbleComparisons / mergeComparisons).toFixed(1)}× more comparisons for bubble sort</span>
      </div>
    </div>
  );
}

// ============================================================
// Main Experiments section
// ============================================================
const EXPERIMENT_COMPONENTS: Record<string, React.FC> = {
  'smallest-failure': SmallestFailureExperiment,
  'shortest-path-longer': ShortestPathExperiment,
  'rules-versus-outcomes': RulesVsOutcomesExperiment,
  'one-input-different-costs': OneInputDifferentCostsExperiment,
};

export function Experiments() {
  return (
    <section
      id="experiments"
      className="relative py-20 lg:py-32 border-t border-[var(--graphite)]"
      aria-label="Experiments"
    >
      <div className="section-padding max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="mb-12 lg:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[var(--ink-muted)]">04</span>
            <span className="w-8 h-px bg-[var(--ink-muted)]" />
            <span className="editorial-label">Experiments</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--ink)] leading-[1.1] mb-4">
            Small ideas, real investigations.
          </h2>

          <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-xl">
            Short experiments that don't justify a full project but test a specific
            idea. Each one runs locally in your browser — no external data, no API calls.
          </p>
        </div>

        {/* Experiments */}
        <div className="space-y-8 lg:space-y-12">
          {siteConfig.experiments.map((exp) => {
            const InteractiveComponent = EXPERIMENT_COMPONENTS[exp.id];
            return (
              <div
                key={exp.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 border-t border-[var(--graphite)] pt-8 lg:pt-12"
              >
                {/* Left: description */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-3xl font-medium text-[var(--graphite)]">
                      {exp.letter}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {exp.isInteractive && (
                        <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[var(--cobalt-bright)]/8 text-[var(--cobalt-bright)] rounded">
                          Interactive
                        </span>
                      )}
                      {exp.isIllustrative && (
                        <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[var(--amber)]/8 text-[var(--amber)] rounded">
                          Illustrative
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl lg:text-2xl font-medium text-[var(--ink)] leading-snug">
                    {exp.title}
                  </h3>

                  <div className="space-y-2.5 text-[13px] text-[var(--ink-muted)] leading-[1.7]">
                    <p>
                      <span className="editorial-label mr-1.5">Question</span>
                      {exp.question}
                    </p>
                    <p>
                      <span className="editorial-label mr-1.5">Method</span>
                      {exp.method}
                    </p>
                    <p>
                      <span className="editorial-label mr-1.5">What it shows</span>
                      {exp.explanation}
                    </p>
                    <p className="text-[var(--ink-muted)] italic">
                      <span className="editorial-label mr-1.5 not-italic">Limitation</span>
                      {exp.limitation}
                    </p>
                  </div>
                </div>

                {/* Right: interactive demo */}
                <div className="lg:col-span-7">
                  <div className="border border-[var(--graphite)] rounded bg-[var(--paper-dark)]/30 p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                        Demonstration
                      </span>
                      <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                        runs locally
                      </span>
                    </div>
                    {InteractiveComponent && <InteractiveComponent />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
