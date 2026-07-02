import { motion } from "framer-motion";

export function Button({ children, onClick, disabled, variant = "primary" }) {
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

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-slate-800 bg-slate-900/70 ${className}`}
    >
      {children}
    </div>
  );
}

export function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-100">{value}</div>
    </div>
  );
}

export function SectionTitle({ eyebrow, title, text }) {
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

export function NetworkNode({ x, y, label, icon: Icon, highlight, danger }) {
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

export function InfoBox({ title, children, icon: Icon }) {
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

export function FlowBox({ title, text, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <Icon className="mb-3 h-6 w-6 text-cyan-300" />

      <div className="font-semibold text-slate-100">{title}</div>

      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}
