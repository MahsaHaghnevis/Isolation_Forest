import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Network, Brain, Activity, Gauge, Server, Play, RotateCcw, CheckCircle2, AlertTriangle } from "lucide-react";

function Card({ className = "", children }) {
  return <div className={`border ${className}`}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", variant, disabled, onClick, children }) {
  const base =
    variant === "secondary"
      ? "bg-slate-800 text-slate-100 hover:bg-slate-700"
      : "bg-slate-100 text-slate-950 hover:bg-slate-200";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${base} inline-flex items-center justify-center font-semibold disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

const steps = [
  {
    id: 1,
    title: "Synthetic SDN Traffic",
    icon: Network,
    text: "We generate simulated network traffic with normal and anomalous samples, similar to the paper's synthetic data approach.",
    badge: "Data Generation",
  },
  {
    id: 2,
    title: "Preprocessing",
    icon: Activity,
    text: "Features are standardized so every network feature has approximately zero mean and unit variance.",
    badge: "StandardScaler",
  },
  {
    id: 3,
    title: "Isolation Forest",
    icon: Brain,
    text: "The model isolates unusual traffic patterns. Samples that are isolated faster are more likely to be anomalies.",
    badge: "ML Model",
  },
  {
    id: 4,
    title: "Evaluation",
    icon: Gauge,
    text: "Predictions are compared with true labels only for evaluation using accuracy, precision, recall, F1-score, and confusion matrix.",
    badge: "Metrics",
  },
  {
    id: 5,
    title: "SDN Alert & Policy",
    icon: ShieldAlert,
    text: "The SDN controller uses only model predictions and anomaly scores to trigger alerts or policy actions.",
    badge: "Controller Response",
  },
];

const trafficSamples = [
  { id: "F-001", packet: 0.12, entropy: 0.20, score: 0.08, status: "Normal", action: "No action" },
  { id: "F-014", packet: 0.31, entropy: 0.41, score: 0.11, status: "Normal", action: "No action" },
  { id: "F-027", packet: 4.86, entropy: 5.22, score: 0.79, status: "Anomaly", action: "Block / Rate-limit" },
  { id: "F-039", packet: 0.17, entropy: 0.33, score: 0.09, status: "Normal", action: "No action" },
  { id: "F-052", packet: 3.91, entropy: 4.44, score: 0.62, status: "Anomaly", action: "Alert + Monitor" },
  { id: "F-088", packet: 0.26, entropy: 0.18, score: 0.10, status: "Normal", action: "No action" },
];

const confusion = [
  { label: "True Normal", value: 268, tone: "bg-emerald-100 text-emerald-800" },
  { label: "False Alert", value: 2, tone: "bg-amber-100 text-amber-800" },
  { label: "Missed Anomaly", value: 0, tone: "bg-rose-100 text-rose-800" },
  { label: "True Anomaly", value: 30, tone: "bg-indigo-100 text-indigo-800" },
];

export default function SDNIsolationForestDemo() {
  const [activeStep, setActiveStep] = useState(1);
  const [running, setRunning] = useState(false);

  const current = steps.find((s) => s.id === activeStep) || steps[0];
  const ActiveIcon = current.icon;

  const stats = useMemo(() => {
    const totalAlerts = 32;
    const highRisk = 14;
    const monitor = totalAlerts - highRisk;
    return { accuracy: "99.33%", totalAlerts, highRisk, monitor, policyChanges: totalAlerts };
  }, []);

  const runDemo = () => {
    setRunning(true);
    setActiveStep(1);
    let step = 1;
    const timer = setInterval(() => {
      step += 1;
      if (step > steps.length) {
        clearInterval(timer);
        setRunning(false);
        return;
      }
      setActiveStep(step);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] items-center">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200"
            >
              <Server className="h-4 w-4" />
              SDN Security Demo · Isolation Forest
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Animated Anomaly Detection Pipeline
            </h1>
            <p className="max-w-3xl text-lg text-slate-300 leading-8">
              This webpage demonstrates how synthetic SDN traffic is processed, analyzed by an Isolation Forest model,
              evaluated, and then converted into simulated SDN alerts and policy actions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={runDemo} disabled={running} className="rounded-2xl px-5 py-6 text-base">
                <Play className="mr-2 h-5 w-5" />
                {running ? "Running Demo..." : "Run Animated Demo"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setActiveStep(1);
                  setRunning(false);
                }}
                className="rounded-2xl px-5 py-6 text-base"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
              </Button>
            </div>
          </div>

          <Card className="rounded-3xl border-slate-800 bg-slate-900/70 shadow-2xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Demo Result</span>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">Completed</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Metric label="Accuracy" value={stats.accuracy} />
                <Metric label="Alerts" value={stats.totalAlerts} />
                <Metric label="High Risk" value={stats.highRisk} />
                <Metric label="Monitor" value={stats.monitor} />
              </div>
            </CardContent>
          </Card>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-3xl border-slate-800 bg-slate-900/70">
            <CardContent className="p-6">
              <h2 className="mb-5 text-2xl font-semibold">Pipeline Steps</h2>
              <div className="space-y-3">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = step.id === activeStep;
                  const isDone = step.id < activeStep;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        isActive
                          ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-950/50"
                          : "border-slate-800 bg-slate-950/40 hover:bg-slate-800/70"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`rounded-2xl p-3 ${isActive ? "bg-cyan-400 text-slate-950" : "bg-slate-800 text-slate-300"}`}>
                          {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="font-semibold">{step.title}</div>
                          <div className="text-sm text-slate-400">{step.badge}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-3xl border-slate-800 bg-slate-900/70">
            <CardContent className="p-0">
              <div className="border-b border-slate-800 p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-cyan-400 p-3 text-slate-950">
                        <ActiveIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm text-cyan-300">Step {current.id}</div>
                        <h2 className="text-3xl font-bold">{current.title}</h2>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-7">{current.text}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative h-[360px] p-6">
                <NetworkAnimation activeStep={activeStep} />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-slate-800 bg-slate-900/70">
            <CardContent className="p-6">
              <h2 className="mb-4 text-2xl font-semibold">Traffic Samples</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-800">
                <table className="w-full text-sm">
                  <thead className="bg-slate-950/70 text-slate-400">
                    <tr>
                      <th className="p-3 text-left">Flow</th>
                      <th className="p-3 text-left">Score</th>
                      <th className="p-3 text-left">Prediction</th>
                      <th className="p-3 text-left">Policy Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trafficSamples.map((row, index) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="border-t border-slate-800"
                      >
                        <td className="p-3 font-medium">{row.id}</td>
                        <td className="p-3">{row.score.toFixed(2)}</td>
                        <td className="p-3">
                          <span className={`rounded-full px-3 py-1 text-xs ${row.status === "Anomaly" ? "bg-rose-400/10 text-rose-300" : "bg-emerald-400/10 text-emerald-300"}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300">{row.action}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-800 bg-slate-900/70">
            <CardContent className="p-6">
              <h2 className="mb-4 text-2xl font-semibold">Evaluation Summary</h2>
              <div className="grid grid-cols-2 gap-3">
                {confusion.map((item) => (
                  <div key={item.label} className={`rounded-2xl p-5 ${item.tone}`}>
                    <div className="text-3xl font-bold">{item.value}</div>
                    <div className="mt-1 text-sm font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300">
                <div className="mb-2 flex items-center gap-2 font-semibold text-slate-100">
                  <AlertTriangle className="h-4 w-4 text-amber-300" />
                  Important note
                </div>
                True labels are used only for evaluation. The SDN policy simulation uses model prediction and anomaly score,
                because a real controller does not know the true label of live traffic.
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-100">{value}</div>
    </div>
  );
}

function NetworkAnimation({ activeStep }) {
  const nodes = [
    { x: 14, y: 42, label: "Host A" },
    { x: 32, y: 20, label: "Switch" },
    { x: 50, y: 42, label: "SDN Controller" },
    { x: 68, y: 20, label: "ML Model" },
    { x: 86, y: 42, label: "Policy" },
  ];

  return (
    <div className="relative h-full w-full rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none">
        <line x1="14" y1="42" x2="32" y2="20" stroke="rgba(148,163,184,.35)" strokeWidth="0.6" />
        <line x1="32" y1="20" x2="50" y2="42" stroke="rgba(148,163,184,.35)" strokeWidth="0.6" />
        <line x1="50" y1="42" x2="68" y2="20" stroke="rgba(148,163,184,.35)" strokeWidth="0.6" />
        <line x1="68" y1="20" x2="86" y2="42" stroke="rgba(148,163,184,.35)" strokeWidth="0.6" />
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: activeStep >= Math.min(i + 1, 5) ? 1.08 : 1,
            opacity: 1,
          }}
          transition={{ duration: 0.4 }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className={`grid h-20 w-20 place-items-center rounded-3xl border text-center text-xs font-semibold shadow-xl ${
            activeStep >= Math.min(i + 1, 5)
              ? "border-cyan-300 bg-cyan-300 text-slate-950"
              : "border-slate-700 bg-slate-900 text-slate-300"
          }`}>
            {node.label}
          </div>
        </motion.div>
      ))}

      <motion.div
        className="absolute h-4 w-4 rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/50"
        animate={{
          left: activeStep === 1 ? "14%" : activeStep === 2 ? "32%" : activeStep === 3 ? "68%" : activeStep === 4 ? "50%" : "86%",
          top: activeStep === 1 ? "42%" : activeStep === 2 ? "20%" : activeStep === 3 ? "20%" : activeStep === 4 ? "42%" : "42%",
        }}
        transition={{ type: "spring", stiffness: 90, damping: 15 }}
      />

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="mb-2 text-sm font-semibold text-cyan-200">Live pipeline message</div>
        <AnimatePresence mode="wait">
          <motion.p
            key={activeStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm text-slate-300"
          >
            {activeStep === 1 && "Network traffic samples are generated with normal and anomalous behavior."}
            {activeStep === 2 && "Features are scaled before entering the machine learning model."}
            {activeStep === 3 && "Isolation Forest assigns anomaly scores based on how fast each sample is isolated."}
            {activeStep === 4 && "Predictions are evaluated using the confusion matrix and classification metrics."}
            {activeStep === 5 && "The controller maps high anomaly scores to alerts and policy actions."}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
