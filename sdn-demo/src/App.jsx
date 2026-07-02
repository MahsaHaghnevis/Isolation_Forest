import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Brain,
  CheckCircle2,
  Database,
  Gauge,
  Globe,
  Lock,
  Network,
  Play,
  RadioTower,
  RotateCcw,
  Router,
  Server,
  ShieldAlert,
  Zap,
} from "lucide-react";

const pipelineSteps = [
  {
    id: 1,
    title: "Synthetic SDN Traffic",
    icon: Database,
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
  {
    id: "F-499",
    score: 0.005389,
    status: "Anomaly",
    action: "Generate alert and monitor flow",
  },
  {
    id: "F-972",
    score: 0.035376,
    status: "Anomaly",
    action: "Block or rate-limit suspicious flow",
  },
  { id: "F-812", score: -0.050719, status: "Normal", action: "No action" },
  { id: "F-561", score: -0.040841, status: "Normal", action: "No action" },
  {
    id: "F-952",
    score: 0.007792,
    status: "Anomaly",
    action: "Generate alert and monitor flow",
  },
  { id: "F-537", score: -0.063595, status: "Normal", action: "No action" },
  { id: "F-956", score: -0.091936, status: "Normal", action: "No action" },
  { id: "F-755", score: -0.070572, status: "Normal", action: "No action" },
  {
    id: "F-929",
    score: 0.011221,
    status: "Anomaly",
    action: "Block or rate-limit suspicious flow",
  },
  {
    id: "F-203",
    score: 0.007963,
    status: "Anomaly",
    action: "Generate alert and monitor flow",
  },
];

const confusion = [
  { label: "True Normal", value: 236, tone: "bg-emerald-100 text-emerald-800" },
  { label: "False Alert", value: 34, tone: "bg-amber-100 text-amber-800" },
  { label: "Missed Anomaly", value: 22, tone: "bg-rose-100 text-rose-800" },
  { label: "True Anomaly", value: 8, tone: "bg-indigo-100 text-indigo-800" },
];

function Button({ children, onClick, disabled, variant = "primary" }) {
  const style =
    variant === "secondary"
      ? "bg-slate-800 text-slate-100 hover:bg-slate-700"
      : "bg-slate-100 text-slate-950 hover:bg-slate-200";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${style} inline-flex items-center justify-center rounded-2xl px-5 py-4 font-semibold transition disabled:opacity-60`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-slate-800 bg-slate-900/70 ${className}`}
    >
      {children}
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

export default function SDNIsolationForestDemo() {
  const [activeStep, setActiveStep] = useState(1);
  const [running, setRunning] = useState(false);

  const current =
    pipelineSteps.find((s) => s.id === activeStep) || pipelineSteps[0];
  const ActiveIcon = current.icon;

  const runPipeline = () => {
    setRunning(true);
    setActiveStep(1);

    let step = 1;
    const timer = setInterval(() => {
      step += 1;

      if (step > pipelineSteps.length) {
        clearInterval(timer);
        setRunning(false);
        return;
      }

      setActiveStep(step);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100 md:p-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="grid items-center gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200"
            >
              <Server className="h-4 w-4" />
              SDN Security · Isolation Forest
            </motion.div>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              SDN Anomaly Detection
            </h1>

            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              This webpage explains what SDN is, how network traffic can include
              attacks, how SDN reacts, and then shows our Isolation Forest demo
              results.
            </p>
          </div>

          <Card className="shadow-2xl">
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Demo Result</span>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                  Completed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Metric label="Accuracy" value="81.33%" />
                <Metric label="Test samples" value="300" />
                <Metric label="Alert + Monitor" value="12" />
                <Metric label="Block / Rate-limit" value="30" />
              </div>
            </div>
          </Card>
        </header>

        <SectionTitle
          eyebrow="Section 1"
          title="What is SDN?"
          text="SDN separates the control plane from the data plane. Switches forward packets, while the SDN controller centrally decides how traffic should be handled."
        />
        <SDNIntroSection />

        <SectionTitle
          eyebrow="Section 2"
          title="How traffic and attacks enter the network"
          text="This is a simplified visual explanation: normal user traffic and suspicious attack-like traffic both enter the network. The system monitors flow features before the controller decides how to respond."
        />
        <InternetTrafficAttackSection />

        <SectionTitle
          eyebrow="Section 3"
          title="How SDN works during anomaly detection"
          text="The SDN switch forwards traffic metadata to the controller. The controller can ask the ML module for an anomaly score and then install a policy rule back into the switch."
        />
        <SDNWorkingSection />

        <SectionTitle
          eyebrow="Section 4"
          title="Our Isolation Forest demo pipeline"
          text="This keeps the original demo structure: synthetic data, preprocessing, model, evaluation, and SDN alert/policy action."
        />

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <div className="p-6">
              <div className="mb-5 flex flex-wrap gap-3">
                <Button onClick={runPipeline} disabled={running}>
                  <Play className="mr-2 h-5 w-5" />
                  {running ? "Running Demo..." : "Run Pipeline"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setActiveStep(1);
                    setRunning(false);
                  }}
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reset
                </Button>
              </div>

              <div className="space-y-3">
                {pipelineSteps.map((step) => {
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
                        <div
                          className={`rounded-2xl p-3 ${
                            isActive
                              ? "bg-cyan-400 text-slate-950"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>

                        <div>
                          <div className="font-semibold">{step.title}</div>
                          <div className="text-sm text-slate-400">
                            {step.badge}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="border-b border-slate-800 p-6">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-400 p-3 text-slate-950">
                    <ActiveIcon className="h-6 w-6" />
                  </div>

                  <div>
                    <div className="text-sm text-cyan-300">
                      Step {current.id}
                    </div>
                    <h2 className="text-3xl font-bold">{current.title}</h2>
                  </div>
                </div>

                <p className="leading-7 text-slate-300">{current.text}</p>
              </motion.div>
            </div>

            <div className="relative h-90 p-6">
              <PipelineAnimation activeStep={activeStep} />
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <div className="p-6">
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
                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              row.status === "Anomaly"
                                ? "bg-rose-400/10 text-rose-300"
                                : "bg-emerald-400/10 text-emerald-300"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>

                        <td className="p-3 text-slate-300">{row.action}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="mb-4 text-2xl font-semibold">
                Evaluation Summary
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {confusion.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl p-5 ${item.tone}`}
                  >
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
                True labels are used only for evaluation. The SDN policy
                simulation uses model prediction and anomaly score, because a
                real controller does not know the true label of live traffic.
              </div>
            </div>
          </Card>
        </section>
      </div>
      <footer className="border-t border-slate-800 pt-6 text-center text-sm leading-7 text-slate-400">
        <p>Developed as a practical demo for the Computer Networks course.</p>
        <p>SDN Anomaly Detection using Isolation Forest</p>
        <p className="text-cyan-300">
          Created with sweat and tears by: Mahsa Haghnevis , Fateme Hasan Nia
        </p>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
        {eyebrow}
      </div>
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      <p className="max-w-4xl leading-7 text-slate-300">{text}</p>
    </div>
  );
}

function SDNIntroSection() {
  return (
    <Card>
      <div className="grid gap-6 p-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="mb-2 flex items-center gap-2 text-cyan-200">
              <Network className="h-5 w-5" />
              Traditional network
            </div>

            <p className="text-sm leading-6 text-slate-300">
              In a traditional network, each switch or router has its own
              control logic. Every device participates in deciding how packets
              should be forwarded.
            </p>
          </div>

          <NormalNetworkDiagram />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="mb-2 flex items-center gap-2 text-cyan-200">
              <RadioTower className="h-5 w-5" />
              SDN network
            </div>

            <p className="text-sm leading-6 text-slate-300">
              In SDN, the control logic is moved to a central controller. The
              switch mainly forwards packets based on rules installed by the
              controller.
            </p>
          </div>

          <SDNNetworkDiagram />
        </div>
      </div>
    </Card>
  );
}

function NormalNetworkDiagram() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
      <div className="relative h-75">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="18"
            y1="25"
            x2="50"
            y2="35"
            stroke="rgba(34,211,238,.5)"
            strokeWidth="0.8"
          />
          <line
            x1="18"
            y1="75"
            x2="50"
            y2="65"
            stroke="rgba(34,211,238,.5)"
            strokeWidth="0.8"
          />
          <line
            x1="50"
            y1="35"
            x2="50"
            y2="65"
            stroke="rgba(34,211,238,.5)"
            strokeWidth="0.8"
          />
          <line
            x1="50"
            y1="35"
            x2="82"
            y2="25"
            stroke="rgba(34,211,238,.5)"
            strokeWidth="0.8"
          />
          <line
            x1="50"
            y1="65"
            x2="82"
            y2="75"
            stroke="rgba(34,211,238,.5)"
            strokeWidth="0.8"
          />
        </svg>

        <NetworkNode x="18%" y="25%" label="Host" icon={Server} />
        <NetworkNode x="18%" y="75%" label="Host" icon={Server} />
        <NetworkNode x="50%" y="35%" label="Router" icon={Router} />
        <NetworkNode x="50%" y="65%" label="Switch" icon={Router} />
        <NetworkNode x="82%" y="25%" label="Server" icon={Server} />
        <NetworkNode x="82%" y="75%" label="Server" icon={Server} />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-cyan-200">Traditional:</span>{" "}
        forwarding and control decisions are distributed across network devices.
      </div>
    </div>
  );
}

function SDNNetworkDiagram() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
      <div className="relative h-75">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="18"
            y1="70"
            x2="48"
            y2="55"
            stroke="rgba(34,211,238,.5)"
            strokeWidth="0.8"
          />
          <line
            x1="18"
            y1="30"
            x2="48"
            y2="55"
            stroke="rgba(34,211,238,.5)"
            strokeWidth="0.8"
          />
          <line
            x1="48"
            y1="55"
            x2="76"
            y2="70"
            stroke="rgba(34,211,238,.5)"
            strokeWidth="0.8"
          />
          <line
            x1="48"
            y1="55"
            x2="76"
            y2="30"
            stroke="rgba(34,211,238,.5)"
            strokeWidth="0.8"
          />
          <line
            x1="48"
            y1="55"
            x2="50"
            y2="18"
            stroke="rgba(251,191,36,.7)"
            strokeWidth="0.9"
            strokeDasharray="3 3"
          />
        </svg>

        <NetworkNode x="18%" y="70%" label="Host" icon={Server} />
        <NetworkNode x="18%" y="30%" label="Host" icon={Server} />
        <NetworkNode x="48%" y="55%" label="SDN Switch" icon={Router} />
        <NetworkNode x="76%" y="70%" label="Server" icon={Server} />
        <NetworkNode x="76%" y="30%" label="Server" icon={Server} />
        <NetworkNode
          x="50%"
          y="18%"
          label="Controller"
          icon={RadioTower}
          highlight
        />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-cyan-200">Data plane:</span> packet
        forwarding.{" "}
        <span className="font-semibold text-amber-200">Control plane:</span>{" "}
        controller decisions and flow rules.
      </div>
    </div>
  );
}

function InternetTrafficAttackSection() {
  return (
    <Card>
      <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="relative h-75">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="15"
                y1="50"
                x2="45"
                y2="50"
                stroke="rgba(34,211,238,.45)"
                strokeWidth="0.8"
              />
              <line
                x1="45"
                y1="50"
                x2="75"
                y2="50"
                stroke="rgba(34,211,238,.45)"
                strokeWidth="0.8"
              />
              <line
                x1="15"
                y1="22"
                x2="45"
                y2="50"
                stroke="rgba(244,63,94,.45)"
                strokeWidth="0.8"
              />
              <line
                x1="15"
                y1="78"
                x2="45"
                y2="50"
                stroke="rgba(244,63,94,.45)"
                strokeWidth="0.8"
              />
            </svg>

            <NetworkNode
              x="15%"
              y="50%"
              label="Internet"
              icon={Globe}
              highlight
            />
            <NetworkNode x="15%" y="22%" label="Attacker" icon={Zap} danger />
            <NetworkNode
              x="15%"
              y="78%"
              label="Bot traffic"
              icon={Zap}
              danger
            />
            <NetworkNode x="45%" y="50%" label="SDN Switch" icon={Router} />
            <NetworkNode x="75%" y="50%" label="Protected Server" icon={Lock} />

            {[0, 1, 2].map((i) => (
              <motion.div
                key={`normal-${i}`}
                className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/50"
                animate={{
                  left: ["15%", "45%", "75%"],
                  top: ["50%", "50%", "50%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  delay: i * 0.45,
                  ease: "easeInOut",
                }}
              />
            ))}

            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`attack-${i}`}
                className="absolute h-3 w-3 rounded-full bg-rose-400 shadow-lg shadow-rose-400/50"
                animate={{
                  left: ["15%", "45%", "75%"],
                  top:
                    i % 2 === 0 ? ["22%", "50%", "50%"] : ["78%", "50%", "50%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.1,
                  delay: i * 0.25,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm leading-6 text-slate-300">
            The red packets represent simplified attack-like behavior, such as
            unusually high packet rate, abnormal entropy, or suspicious traffic
            volume.
          </div>
        </div>

        <div className="space-y-4">
          <InfoBox title="What we simulate" icon={Database}>
            We do not simulate the full internet. We simulate measurable network
            flow features such as packet rate, byte rate, error rate, traffic
            volume, port usage rate, and traffic entropy.
          </InfoBox>

          <InfoBox
            title="What an attack looks like in the demo"
            icon={AlertTriangle}
          >
            An attack-like flow is represented as traffic that is statistically
            different from normal flows. For example, packet rate or entropy may
            become much higher than usual.
          </InfoBox>

          <InfoBox title="Important limitation" icon={ShieldAlert}>
            This is not a real cyberattack simulation. It is a visual and
            statistical demonstration of anomalous traffic detection.
          </InfoBox>
        </div>
      </div>
    </Card>
  );
}

function SDNWorkingSection() {
  return (
    <Card>
      <div className="relative min-h-105 p-6">
        <div className="grid gap-5 md:grid-cols-4">
          <FlowBox
            title="1. Traffic arrives"
            icon={Globe}
            text="Network flows enter the SDN switch."
          />
          <FlowBox
            title="2. Flow features"
            icon={Activity}
            text="Features are extracted or monitored."
          />
          <FlowBox
            title="3. ML decision"
            icon={Brain}
            text="Isolation Forest predicts normal or anomaly."
          />
          <FlowBox
            title="4. Policy update"
            icon={ShieldAlert}
            text="Controller installs a rule: allow, monitor, rate-limit, or block."
          />
        </div>

        <div className="relative mt-8 h-52.5 rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
          <NetworkNode x="10%" y="50%" label="Flow" icon={Globe} />
          <NetworkNode x="33%" y="50%" label="Switch" icon={Router} />
          <NetworkNode
            x="56%"
            y="25%"
            label="Controller"
            icon={RadioTower}
            highlight
          />
          <NetworkNode x="78%" y="25%" label="ML Model" icon={Brain} />
          <NetworkNode
            x="56%"
            y="75%"
            label="New Rule"
            icon={ShieldAlert}
            danger
          />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line
              x1="10"
              y1="50"
              x2="33"
              y2="50"
              stroke="rgba(34,211,238,.5)"
              strokeWidth="0.8"
            />
            <line
              x1="33"
              y1="50"
              x2="56"
              y2="25"
              stroke="rgba(251,191,36,.6)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
            <line
              x1="56"
              y1="25"
              x2="78"
              y2="25"
              stroke="rgba(251,191,36,.6)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
            <line
              x1="78"
              y1="25"
              x2="56"
              y2="75"
              stroke="rgba(244,63,94,.6)"
              strokeWidth="0.8"
            />
            <line
              x1="56"
              y1="75"
              x2="33"
              y2="50"
              stroke="rgba(244,63,94,.6)"
              strokeWidth="0.8"
            />
          </svg>

          <motion.div
            className="absolute h-4 w-4 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/50"
            animate={{
              left: ["10%", "33%", "56%", "78%", "56%", "33%"],
              top: ["50%", "50%", "25%", "25%", "75%", "50%"],
            }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </Card>
  );
}

function PipelineAnimation({ activeStep }) {
  const nodes = [
    { x: 14, y: 50, label: "Traffic Data" },
    { x: 32, y: 50, label: "Preprocess" },
    { x: 50, y: 50, label: "Isolation Forest" },
    { x: 68, y: 50, label: "Evaluation" },
    { x: 86, y: 50, label: "SDN Policy" },
  ];

  return (
    <div>
      <div className="relative h-57.5 rounded-3xl border border-slate-800 bg-slate-950/60">
        {nodes.map((node, i) => (
          <motion.div
            key={node.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: activeStep >= i + 1 ? 1.08 : 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div
              className={`grid h-20 w-20 place-items-center rounded-3xl border text-center text-xs font-semibold shadow-xl ${
                activeStep >= i + 1
                  ? "border-cyan-300 bg-cyan-300 text-slate-950"
                  : "border-slate-700 bg-slate-900 text-slate-300"
              }`}
            >
              {node.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="mb-2 text-sm font-semibold text-cyan-200">
          Live pipeline message
        </div>

        <p className="text-sm leading-6 text-slate-300">
          {activeStep === 1 &&
            "Synthetic SDN traffic is generated with normal and anomalous samples."}
          {activeStep === 2 &&
            "Features are scaled before entering the machine learning model."}
          {activeStep === 3 &&
            "Isolation Forest assigns anomaly scores based on how fast each sample is isolated."}
          {activeStep === 4 &&
            "Predictions are evaluated using the confusion matrix and classification metrics."}
          {activeStep === 5 &&
            "The SDN controller maps anomaly scores to alerts and policy actions."}
        </p>
      </div>
    </div>
  );
}

function NetworkNode({ x, y, label, icon: Icon, highlight, danger }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <div
        className={`grid h-24 w-24 place-items-center rounded-3xl border text-center text-xs font-semibold shadow-xl ${
          danger
            ? "border-rose-400 bg-rose-400/10 text-rose-200"
            : highlight
              ? "border-amber-300 bg-amber-300/10 text-amber-100"
              : "border-slate-700 bg-slate-900 text-slate-200"
        }`}
      >
        <Icon
          className={`h-6 w-6 ${danger ? "text-rose-300" : highlight ? "text-amber-300" : "text-cyan-300"}`}
        />
        <span>{label}</span>
      </div>
    </motion.div>
  );
}

function InfoBox({ title, children, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="mb-2 flex items-center gap-2 text-cyan-200">
        <Icon className="h-5 w-5" />
        <span className="font-semibold">{title}</span>
      </div>

      <p className="text-sm leading-6 text-slate-300">{children}</p>
    </div>
  );
}

function FlowBox({ title, text, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <Icon className="mb-3 h-6 w-6 text-cyan-300" />

      <div className="font-semibold text-slate-100">{title}</div>

      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}
