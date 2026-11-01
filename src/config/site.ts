export interface ProjectLink {
  demoUrl: string;
  githubUrl: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectNote {
  label: string;
  text: string;
}

export interface ProjectConfig {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  shortDescription: string;
  detailedDescription: string;
  problem: string;
  whyItMatters: string;
  coreApproach: string;
  status: ProjectStatus;
  demoUrl: string;
  githubUrl: string;
  features: ProjectFeature[];
  technicalChallenges: string[];
  designDecisions: string[];
  testingApproach: string;
  limitations: string;
  futureImprovements: string;
  visualType: VisualType;
  techNotes: string[];
}

export type ProjectStatus =
  | 'In development'
  | 'Functional prototype'
  | 'Live demo available'
  | 'Completed';

export type VisualType =
  | 'policy-diagram'
  | 'claim-context'
  | 'city-network'
  | 'waveform'
  | 'constraint-diagram'
  | 'execution-trace';

export interface ExperimentConfig {
  id: string;
  letter: string;
  title: string;
  question: string;
  method: string;
  explanation: string;
  limitation: string;
  isInteractive: boolean;
  isIllustrative: boolean;
}

export interface PrincipleConfig {
  number: string;
  title: string;
  statement: string;
  description: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'mail' | 'external';
}

export interface SiteConfig {
  name: string;
  portfolioTitle: string;
  tagline: string;
  school: string;
  field: string;
  email: string;
  aboutText: string[];
  socialLinks: SocialLink[];
  projects: ProjectConfig[];
  principles: PrincipleConfig[];
  experiments: ExperimentConfig[];
}

export const siteConfig: SiteConfig = {
  name: 'Rushil Reddy Yaragonda',
  portfolioTitle: 'Systems of Thought',
  tagline: 'I build systems to understand the world, not just software to fill a screen.',
  school: 'UIA International School of Tokyo, Tokyo',
  field: 'Computer Science',
  email: 'rushil2626reddy@gmail.com',
  aboutText: [
    "I'm Rushil Reddy Yaragonda, a Computer Science student at UIA International School of Tokyo. I'm interested in the systems behind everyday experiences: how algorithms make decisions, how complex environments respond to small changes, and how software can help us investigate questions that are difficult to answer by observation alone.",
    "I enjoy building projects that let people experiment, test assumptions, and understand the reasoning behind an outcome. For me, the most interesting part of software is not only making something work, but discovering what it reveals about the problem itself.",
  ],
  // Update these links as needed. Use "#" as placeholder for unavailable links.
  socialLinks: [
    { label: 'GitHub', url: '#', icon: 'github' },
    { label: 'Email', url: 'mailto:rushil2626reddy@gmail.com', icon: 'mail' },
  ],
  projects: [
    {
      id: 'last-human-decision',
      number: '01',
      title: 'The Last Human Decision',
      category: 'Interactive strategy simulation',
      tagline: 'When algorithms control everything, what should remain human?',
      shortDescription:
        'An interactive governance simulation exploring what happens when a society delegates increasingly important decisions to automated systems. Players balance public trust, liberty, equity, resilience, and automation while dealing with consequences that may emerge several turns later.',
      detailedDescription:
        'The Last Human Decision is a turn-based governance simulation that places the player at the intersection of human judgment and algorithmic authority. Each turn, the player faces policy decisions that affect five interconnected metrics: public trust, individual liberty, social equity, system resilience, and degree of automation. The simulation models delayed consequences — a decision that appears beneficial in one turn may produce destabilizing effects several turns later, as metrics interact and compound. The core tension is not whether automation is good or bad, but where the boundary between human and machine decision-making should drawn when the stakes escalate.',
      problem:
        'How do we decide which decisions to delegate to automated systems when the consequences are delayed, interconnected, and ethically loaded?',
      whyItMatters:
        'As organizations and governments increasingly rely on algorithmic decision systems, the question of what should remain under human judgment becomes urgent. This simulation makes that abstract tension tangible and explorable.',
      coreApproach:
        'A turn-based model where five policy variables interact through weighted relationships. Each decision modifies multiple variables, and delayed effects propagate through the system over subsequent turns, creating emergent trade-offs.',
      status: 'In development',
      demoUrl: 'https://the-last-human-decision.vercel.app',
      githubUrl: '#',
      features: [
        { title: 'Five-variable policy model', description: 'Trust, liberty, equity, resilience, and automation are interconnected — changing one affects the others over time.' },
        { title: 'Delayed consequences', description: 'Decisions produce effects that surface turns later, requiring players to think beyond immediate outcomes.' },
        { title: 'Escalating stakes', description: 'As the simulation progresses, decisions carry greater weight and the cost of errors increases.' },
        { title: 'System-state visualization', description: 'A live diagram shows how variables relate and where tension is building.' },
      ],
      technicalChallenges: [
        'Modeling delayed consequences without making the simulation feel arbitrary or unpredictable.',
        'Balancing five variables so that no single strategy dominates — every approach must have trade-offs.',
        'Making the relationship between variables legible to the player without reducing the simulation to a spreadsheet.',
      ],
      designDecisions: [
        'Chose five variables rather than three to prevent simple optimization strategies.',
        'Delayed effects rather than immediate penalties, so players learn to anticipate rather than react.',
        'The simulation does not declare a "win" or "loss" — it presents outcomes and asks the player to evaluate them.',
      ],
      testingApproach:
        'Playtesting with multiple strategy profiles (maximize trust, maximize liberty, maximize automation) to verify that no single approach is dominant and that trade-offs are meaningful.',
      limitations:
        'The model is a simplification. Real governance involves far more variables, actors, and external pressures. The simulation is a tool for thinking, not a predictive model.',
      futureImprovements:
        'Adding external events (crises, discoveries) that disrupt stable strategies. Introducing a multi-player mode where different players control different variables.',
      visualType: 'policy-diagram',
      techNotes: [
        'Turn-based state machine with weighted variable interactions',
        'Delayed effect queue for multi-turn consequences',
        'Visualization layer rendering live variable relationships',
      ],
    },
    {
      id: 'contextshield',
      number: '02',
      title: 'ContextShield',
      category: 'Browser extension and information-literacy tool',
      tagline: 'The internet shows you information. ContextShield shows you what is missing.',
      shortDescription:
        'A browser-based tool designed to help people examine claims, identify missing context, and evaluate the information surrounding a statement rather than relying on superficial certainty.',
      detailedDescription:
        'ContextShield is a browser extension that works alongside the reader rather than replacing their judgment. When a user encounters a claim on a web page, ContextShield helps them surface contextual information: what evidence surrounds the claim, what context might be missing, and what questions remain unanswered. The tool does not claim to detect misinformation or verify every factual claim. Instead, it structures the process of critical reading by highlighting what is present, what is absent, and what deserves further investigation.',
      problem:
        'How can a tool help people evaluate the context surrounding a claim without falsely claiming to verify truth?',
      whyItMatters:
        'Information literacy is not about detecting lies — it is about recognizing what is missing. Existing tools often overpromise automated fact-checking. ContextShield takes a different approach: it makes the structure of evidence visible.',
      coreApproach:
        'A browser extension that analyzes page content, identifies claims, and presents contextual annotations — evidence fragments, uncertainty indicators, and questions — without making truth judgments.',
      status: 'Functional prototype',
      demoUrl: 'https://context-shield-chrome-extension.vercel.app',
      githubUrl: '#',
      features: [
        { title: 'Claim identification', description: 'Highlights declarative statements on a page that may benefit from contextual examination.' },
        { title: 'Evidence fragments', description: 'Surfaces surrounding evidence and related context for each identified claim.' },
        { title: 'Uncertainty indicators', description: 'Marks areas where context is thin, conflicting, or absent — not as verdicts, but as prompts for further reading.' },
        { title: 'Reader-controlled', description: 'The tool presents context; the reader makes the judgment. No automated truth labels.' },
      ],
      technicalChallenges: [
        'Distinguishing declarative claims from other text without a heavy NLP pipeline.',
        'Presenting annotations without disrupting the reading experience or creating visual noise.',
        'Avoiding the trap of automated verification — the tool must empower judgment, not replace it.',
      ],
      designDecisions: [
        'No "true/false" labels. The tool shows context, not verdicts.',
        'Annotations are opt-in and dismissible — the reader controls the experience.',
        'Uncertainty is treated as a signal to investigate further, not as a deficiency.',
      ],
      testingApproach:
        'Tested with a range of article types (news, opinion, technical) to verify that claim identification is useful without being overwhelming. User feedback guided the annotation density and visual design.',
      limitations:
        'ContextShield cannot verify factual claims or detect misinformation. It surfaces context and highlights uncertainty — the reader must still do the thinking. The tool is a reading aid, not an oracle.',
      futureImprovements:
        'Support for multiple languages. A collaborative mode where readers can contribute contextual notes. Integration with curated reference sources.',
      visualType: 'claim-context',
      techNotes: [
        'Browser extension with content-script-based page analysis',
        'Annotation layer with non-destructive DOM manipulation',
        'Reader-controlled annotation visibility',
      ],
    },
    {
      id: 'crowdmind',
      number: '03',
      title: 'CrowdMind: The City Under Pressure',
      category: 'Agent-based simulation',
      tagline: 'A city is not a map. It is millions of decisions happening at once.',
      shortDescription:
        'An interactive urban simulation investigating how individual movement, route choices, congestion, and disruptions can produce large-scale patterns in a shared environment.',
      detailedDescription:
        'CrowdMind models a city as a collection of individual agents, each making route decisions based on local information. The simulation reveals how individual choices — taking the shortest path, avoiding congestion, following habit — combine to produce emergent patterns: traffic bottlenecks, underused alternate routes, cascade failures when a key road is disrupted. The player can introduce disruptions, change agent behavior rules, and observe how the system responds. The central insight is that no single agent intends to create congestion — it emerges from the interaction of many reasonable individual decisions.',
      problem:
        'How do individual movement decisions produce large-scale patterns in a shared environment, and what happens when the system is disrupted?',
      whyItMatters:
        'Urban congestion, crowd dynamics, and infrastructure resilience are not caused by any single actor. Understanding how individual decisions scale into collective patterns is essential for designing better systems.',
      coreApproach:
        'An agent-based model where each agent navigates a graph (the city) using configurable decision rules. The simulation runs in real-time, with agents moving, encountering congestion, and adjusting routes. Disruptions can be introduced at any point.',
      status: 'Functional prototype',
      demoUrl: 'https://crowd-mind-urban-mobility-simulatio.vercel.app',
      githubUrl: '#',
      features: [
        { title: 'Agent-based movement', description: 'Each agent independently navigates the city graph using its own decision rules.' },
        { title: 'Disruption injection', description: 'Block or slow roads at any point and observe how the system reroutes.' },
        { title: 'Configurable decision rules', description: 'Adjust how agents choose routes — shortest path, least congestion, habitual routes.' },
        { title: 'Emergent pattern visualization', description: 'Watch bottlenecks form, dissolve, and shift as conditions change.' },
      ],
      technicalChallenges: [
        'Scaling the simulation to enough agents for emergent patterns to be visible without degrading performance.',
        'Designing route-choice algorithms that are simple enough to be transparent but complex enough to produce interesting behavior.',
        'Visualizing congestion in real-time without overwhelming the viewer.',
      ],
      designDecisions: [
        'Agents use simple, understandable rules rather than complex AI — the point is to show how complexity emerges from simplicity.',
        'The city graph is abstract rather than realistic, so the focus stays on system behavior rather than map accuracy.',
        'Disruptions are player-controlled to make the cause-and-effect relationship clear.',
      ],
      testingApproach:
        'Verified that congestion patterns emerge naturally from individual route choices. Tested disruption scenarios to confirm that the system reroutes in plausible ways. Checked performance with increasing agent counts.',
      limitations:
        'The city model is abstract and does not represent real urban topology. Agent behavior is simplified — real human movement involves preferences, time constraints, and social factors not modeled here.',
      futureImprovements:
        'Adding time-of-day variation in agent destinations. Multi-modal transport (walking, transit, driving). A scenario editor for designing specific disruption cases.',
      visualType: 'city-network',
      techNotes: [
        'Agent-based simulation on a weighted graph',
        'Pathfinding with dynamic edge weights (congestion)',
        'Real-time canvas rendering for agent movement',
      ],
    },
    {
      id: 'silentsignal',
      number: '04',
      title: 'SilentSignal',
      category: 'Accessibility and audio visualization',
      tagline: 'What if sound could be understood without hearing it?',
      shortDescription:
        'A browser-based audio exploration tool that transforms sound characteristics into visual information, helping users inspect audio patterns through waveforms, frequency representations, and configurable visual alerts.',
      detailedDescription:
        'SilentSignal is a browser-based tool that converts audio signals into visual representations. Using the Web Audio API, it captures microphone input or loaded audio files and renders waveforms, frequency spectra, and configurable visual alerts. The tool does not claim to reliably recognize emergency sounds or guarantee accessibility outcomes. Instead, it provides a set of visual instruments for inspecting audio — making sound characteristics legible to those who cannot hear them, or who want to understand audio patterns through a different modality.',
      problem:
        'How can sound characteristics be translated into visual information that is useful for inspection and awareness?',
      whyItMatters:
        'Translating one modality into another is a fundamental systems-thinking challenge. Audio visualization has applications in accessibility, education, and audio engineering — but the tool must be honest about what it can and cannot do.',
      coreApproach:
        'Web Audio API for real-time audio capture and analysis. Canvas rendering for waveforms and frequency spectra. Configurable threshold-based visual alerts that respond to audio characteristics.',
      status: 'Functional prototype',
      demoUrl: 'https://silent-signal-lime.vercel.app',
      githubUrl: '#',
      features: [
        { title: 'Real-time waveform', description: 'Live time-domain visualization of incoming audio signals.' },
        { title: 'Frequency spectrum', description: 'Frequency-domain representation showing the distribution of energy across frequencies.' },
        { title: 'Configurable visual alerts', description: 'Set thresholds for volume or frequency ranges and receive visual notifications when they are exceeded.' },
        { title: 'File and microphone input', description: 'Analyze audio from a loaded file or from the microphone in real-time.' },
      ],
      technicalChallenges: [
        'Achieving low-latency visualization without consuming excessive CPU.',
        'Designing visual representations that are informative without requiring audio knowledge to interpret.',
        'Being honest about the tool\'s capabilities — it visualizes sound, it does not recognize or classify it.',
      ],
      designDecisions: [
        'Visual alerts are threshold-based, not recognition-based. The tool does not claim to identify specific sounds.',
        'Both waveform and frequency views are provided, as they reveal different aspects of the audio.',
        'The interface is designed to be readable without sound — the visual is the primary output.',
      ],
      testingApproach:
        'Tested with a variety of audio inputs (music, speech, tones, noise) to verify that visualizations are responsive and accurate. Checked performance on lower-end devices.',
      limitations:
        'SilentSignal does not reliably recognize specific sounds (e.g., emergency sirens, alarms). Visual alerts are threshold-based, not semantic. The tool is an exploration aid, not a certified accessibility device.',
      futureImprovements:
        'Pattern detection for recurring audio events. Historical visualization to review audio patterns over time. Export of visualization data for further analysis.',
      visualType: 'waveform',
      techNotes: [
        'Web Audio API with AnalyserNode for real-time frequency and time-domain data',
        'Canvas-based rendering for waveform and spectrum',
        'Configurable threshold system for visual alerts',
      ],
    },
    {
      id: 'alignment-lab',
      number: '05',
      title: 'The Alignment Lab',
      category: 'Interactive ethics and decision laboratory',
      tagline: 'Can a machine follow its rules and still make the wrong decision?',
      shortDescription:
        'An interactive laboratory for examining rule-based decision systems, objective weights, hard constraints, fairness trade-offs, and adversarial scenarios. Users can investigate how a system may satisfy its programmed objectives while producing undesirable outcomes.',
      detailedDescription:
        'The Alignment Lab is an interactive environment for exploring the gap between following rules and achieving the right outcome. Users configure a decision system by setting objective weights, defining hard constraints, and introducing fairness criteria. The lab then runs scenarios — including adversarial cases designed to exploit the system\'s rules — and shows how a system that perfectly satisfies its objectives can still produce outcomes that are unfair, counterproductive, or misaligned with the intent behind the rules. The lab makes the alignment problem tangible: it is not about broken rules, but about rules that are incomplete.',
      problem:
        'How can a decision system satisfy its programmed objectives while still producing undesirable outcomes, and how can we explore this gap interactively?',
      whyItMatters:
        'The alignment problem is one of the most important challenges in automated decision-making. Rules that seem reasonable in isolation can produce harmful outcomes when they interact with real-world complexity. Making this visible is the first step toward better systems.',
      coreApproach:
        'A configurable decision engine where users define objectives (with weights), constraints (hard limits), and fairness criteria. The engine evaluates scenarios — including adversarial ones — and visualizes the gap between objective satisfaction and outcome quality.',
      status: 'In development',
      demoUrl: 'https://the-alignment-lab-mu.vercel.app',
      githubUrl: '#',
      features: [
        { title: 'Configurable objective weights', description: 'Define what the system optimizes for and how much each objective matters.' },
        { title: 'Hard constraints', description: 'Set non-negotiable limits that the system must respect, regardless of objective scores.' },
        { title: 'Adversarial scenarios', description: 'Test cases designed to exploit the rules — satisfying objectives while producing poor outcomes.' },
        { title: 'Outcome visualization', description: 'See where the system satisfies its rules but fails its intent, and where the gap lies.' },
      ],
      technicalChallenges: [
        'Designing a decision engine that is transparent enough for users to understand why it made each choice.',
        'Creating adversarial scenarios that are realistic rather than contrived.',
        'Visualizing the gap between "rules satisfied" and "outcome is good" in a way that is intuitive.',
      ],
      designDecisions: [
        'The lab does not prescribe what "aligned" means — it shows the gap and lets the user judge.',
        'Adversarial scenarios are built-in, not hidden, to make the point that exploitation is inherent to rule-based systems.',
        'The interface separates objectives, constraints, and fairness so users can see how each contributes to the outcome.',
      ],
      testingApproach:
        'Planned: scenario-based testing where each adversarial case is verified to exploit the rules as intended. User testing to confirm that the gap between rules and outcomes is clear.',
      limitations:
        'The lab uses a simplified decision model. Real alignment problems involve deep uncertainty about human preferences, long-term effects, and distributional shifts that cannot be fully captured in an interactive tool.',
      futureImprovements:
        'Support for custom scenario design. Multi-objective Pareto frontier visualization. A "red team" mode where the system generates its own adversarial cases.',
      visualType: 'constraint-diagram',
      techNotes: [
        'Weighted objective optimization with hard constraints',
        'Scenario engine with built-in adversarial cases',
        'Visualization of rule-satisfaction vs. outcome quality',
      ],
    },
    {
      id: 'algorithm-autopsy',
      number: '06',
      title: 'Algorithm Autopsy',
      category: 'Algorithm debugging and analysis tool',
      tagline: "Don't just see that an algorithm works. Discover why it fails.",
      shortDescription:
        'An interactive developer tool for executing algorithms step by step, generating adversarial inputs, investigating incorrect outputs, comparing implementations, and exploring computational complexity.',
      detailedDescription:
        'Algorithm Autopsy is a developer tool for understanding algorithms through their failures. Rather than confirming that an algorithm works on typical inputs, it helps developers find the inputs where it breaks. The tool supports step-by-step execution, adversarial input generation, side-by-side implementation comparison, and complexity analysis. The philosophy is that failure is more informative than success: an algorithm that passes every test case you thought of may still fail on inputs you did not consider. Algorithm Autopsy makes those inputs visible.',
      problem:
        'How can a tool help developers discover why an algorithm fails, not just confirm that it works?',
      whyItMatters:
        'Most testing confirms expected behavior. But algorithms fail on edge cases, adversarial inputs, and conditions the developer did not anticipate. A tool that systematically surfaces these failures is more valuable than one that confirms success.',
      coreApproach:
        'An interactive execution environment with step-by-step tracing, adversarial input generation, implementation comparison, and complexity visualization. The tool focuses on finding failure cases rather than validating success.',
      status: 'In development',
      demoUrl: 'https://algorithm-autopsy.vercel.app',
      githubUrl: '#',
      features: [
        { title: 'Step-by-step execution', description: 'Trace through an algorithm one operation at a time, inspecting state at each step.' },
        { title: 'Adversarial input generation', description: 'Automatically generate inputs designed to break the algorithm — edge cases, worst cases, boundary conditions.' },
        { title: 'Implementation comparison', description: 'Run two implementations on the same input and compare outputs and performance.' },
        { title: 'Complexity analysis', description: 'Visualize how operation counts scale with input size, comparing theoretical and empirical complexity.' },
      ],
      technicalChallenges: [
        'Generating adversarial inputs that are genuinely challenging rather than trivially random.',
        'Building a step-by-step tracer that works across different algorithm types without requiring manual instrumentation.',
        'Comparing implementations fairly when they may use different data structures or optimizations.',
      ],
      designDecisions: [
        'The tool defaults to showing failures, not successes — the first thing you see is where the algorithm breaks.',
        'Adversarial inputs are generated, not hand-picked, to discover cases the developer would not have thought of.',
        'Complexity is shown empirically (actual operation counts) alongside theoretical predictions.',
      ],
      testingApproach:
        'Planned: validation against known algorithm failure cases (e.g., quicksort on sorted input, hash collisions). Comparison of empirical complexity with theoretical bounds.',
      limitations:
        'The tool supports a curated set of algorithms and data structures. Generalizing to arbitrary code requires more sophisticated instrumentation. Adversarial input generation is heuristic, not exhaustive.',
      futureImprovements:
        'Support for user-supplied algorithms. A library of known algorithm pathologies. Integration with standard testing frameworks.',
      visualType: 'execution-trace',
      techNotes: [
        'Instrumented execution engine with step-by-step tracing',
        'Heuristic adversarial input generation',
        'Empirical complexity measurement with visualization',
      ],
    },
  ],
  principles: [
    {
      number: '01',
      title: 'Start With a Question',
      statement: 'Before deciding what to build, identify what is worth understanding.',
      description:
        'A clear problem statement shapes everything that follows: which features matter, which experiments to run, and how to evaluate results. When I start with a question rather than a feature list, the software becomes an instrument of inquiry rather than a collection of functionality. The question "what happens when a society delegates decisions to algorithms?" leads to a different project than "let me build a simulation game." The first produces an investigation; the second produces a product.',
    },
    {
      number: '02',
      title: 'Test the Assumptions',
      statement: 'An implementation that works on one example has only answered one question.',
      description:
        'Every algorithm carries hidden assumptions about its inputs: that they will be sorted, or random, or within a certain range, or free of adversarial structure. Testing on typical inputs confirms that the algorithm works when its assumptions hold. But the most informative tests are the ones that violate those assumptions — the edge cases, the counterexamples, the inputs that were not supposed to occur. I build tools that help surface these cases rather than hide them.',
    },
    {
      number: '03',
      title: 'Follow the Consequences',
      statement: 'Small decisions can create large effects when they interact.',
      description:
        'A city is not a map — it is millions of decisions happening at once. When individual choices interact, they produce patterns that no single actor intended: congestion, cascades, equilibria, oscillations. Simulations let me explore these dynamics without waiting for them to happen in the real world. The value is not in predicting exactly what will happen, but in understanding the space of what could happen, and why.',
    },
    {
      number: '04',
      title: 'Make the Reasoning Visible',
      statement: 'A useful tool should reveal more than its final output.',
      description:
        'A black box that produces the right answer teaches nothing. A tool that shows its reasoning — the steps it took, the alternatives it rejected, the assumptions it relied on — turns a result into an understanding. This is why I build execution traces, visualizations, and interactive controls into my projects. The goal is not just to produce an outcome, but to make the process legible, so that the person using the tool can evaluate not just the answer, but how it was reached.',
    },
  ],
  experiments: [
    {
      id: 'smallest-failure',
      letter: 'A',
      title: 'The Smallest Failure',
      question: 'Can a complicated failing input for an algorithm be reduced to a minimal counterexample?',
      method: 'Given a failing input, iteratively remove elements while preserving the failure. The result is the smallest input that still triggers the bug.',
      explanation:
        'Minimization is a debugging technique: by stripping away everything that does not contribute to the failure, the root cause becomes visible. A failing input of 100 elements may reduce to just 3 — and those 3 elements tell you exactly what the algorithm cannot handle.',
      limitation: 'This demonstration uses a simple sorting check. Real minimization on complex algorithms may require preserving structural relationships, not just element counts.',
      isInteractive: true,
      isIllustrative: false,
    },
    {
      id: 'shortest-path-longer',
      letter: 'B',
      title: 'When the Shortest Path Gets Longer',
      question: 'How does a single edge disruption change the best available route through a network?',
      method: 'Compute shortest paths on a graph, remove one edge, and recompute. Compare the original and new path lengths.',
      explanation:
        'Networks are fragile in non-obvious ways. Removing one edge can not only lengthen the shortest path but change which route is optimal entirely. This experiment makes that fragility visible by showing the before-and-after path for any edge you choose to disrupt.',
      limitation: 'The graph is small and fixed. In larger networks, multiple simultaneous disruptions can interact in ways this demonstration does not capture.',
      isInteractive: true,
      isIllustrative: false,
    },
    {
      id: 'rules-versus-outcomes',
      letter: 'C',
      title: 'Rules Versus Outcomes',
      question: 'How does changing the weights of a decision system\'s objectives alter its behavior?',
      method: 'A simple decision engine scores options using weighted objectives. Adjust the weights and observe how the selected option changes.',
      explanation:
        'Two systems with the same objectives but different weights can make different decisions on the same input. This experiment lets you drag the weights and see the decision flip — demonstrating that "what we optimize for" and "how much we optimize for it" are both design choices with real consequences.',
      limitation: 'The decision model uses a simple linear scoring function. Real decision systems may use non-linear interactions, constraints, and multi-objective optimization that produce more complex behavior.',
      isInteractive: true,
      isIllustrative: false,
    },
    {
      id: 'one-input-different-costs',
      letter: 'D',
      title: 'One Input, Different Costs',
      question: 'How do two algorithms with the same purpose compare in operation count on the same input?',
      method: 'Run two sorting algorithms on the same array and count the number of key comparisons each makes. Vary the input size and observe how the counts diverge.',
      explanation:
        'Two algorithms that produce the same output can have vastly different costs. This experiment counts operations empirically, showing that the choice of algorithm is not just a theoretical concern — it has measurable consequences that grow with input size.',
      limitation: 'Operation counts depend on the specific implementation and input pattern. Different input distributions (sorted, reversed, random) will produce different comparisons.',
      isInteractive: true,
      isIllustrative: false,
    },
  ],
};


