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

export const pipelineSteps = [
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

export const trafficSamples = [
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

export const confusion = [
  { label: "True Normal", value: 236, tone: "bg-emerald-100 text-emerald-800" },
  { label: "False Alert", value: 34, tone: "bg-amber-100 text-amber-800" },
  { label: "Missed Anomaly", value: 22, tone: "bg-rose-100 text-rose-800" },
  { label: "True Anomaly", value: 8, tone: "bg-indigo-100 text-indigo-800" },
];

export const sharedIcons = {
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
};
