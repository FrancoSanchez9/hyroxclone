export type Step = "identify" | "details" | "payment" | "done";

export const STEP_LABELS: Record<Step, string> = {
  identify: "Identifícate",
  details: "Datos",
  payment: "Pago",
  done: "Listo",
};
export const STEP_ORDER: Step[] = ["identify", "details", "payment", "done"];

export const isEmail = (v: string) => /.+@.+\..+/.test(v);
export const money = (n: number, currency = "MXN") => `$${n.toLocaleString("es-MX")} ${currency}`;

// Shared input styling — mirrors the login page.
export const inputCls =
  "w-full border border-white/15 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 transition-[border-color] duration-150 focus:border-rl-accent focus:outline-none";
export const labelCls = "text-[10px] font-bold uppercase tracking-widest text-white/50";
