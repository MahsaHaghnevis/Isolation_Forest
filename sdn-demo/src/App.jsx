import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Server } from "lucide-react";
import { pipelineSteps } from "./data.js";
import { Button, Card, Metric, SectionTitle } from "./components/common.jsx";
import {
  EvaluationSummary,
  InternetTrafficAttackSection,
  PipelineAnimation,
  SDNIntroSection,
  SDNWorkingSection,
  TrafficSamplesTable,
} from "./components/sections.jsx";

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
        <HeaderCard />

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
                            <Server className="h-5 w-5" />
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
          <TrafficSamplesTable />
          <EvaluationSummary />
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

function HeaderCard() {
  return (
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
  );
}
