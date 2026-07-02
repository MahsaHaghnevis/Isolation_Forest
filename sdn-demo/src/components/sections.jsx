import { motion } from "framer-motion";
import {
  AlertTriangle,
  Activity,
  Brain,
  Database,
  Globe,
  Lock,
  Network,
  RadioTower,
  Router,
  Server,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { confusion, trafficSamples } from "../data.js";
import { FlowBox, InfoBox, NetworkNode, Card } from "./common.jsx";

export function SDNIntroSection() {
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

export function InternetTrafficAttackSection() {
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

export function SDNWorkingSection() {
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

export function PipelineAnimation({ activeStep }) {
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

export function TrafficSamplesTable() {
  return (
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
  );
}

export function EvaluationSummary() {
  return (
    <Card>
      <div className="p-6">
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
          True labels are used only for evaluation. The SDN policy simulation
          uses model prediction and anomaly score, because a real controller
          does not know the true label of live traffic.
        </div>
      </div>
    </Card>
  );
}
