import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 lg:px-10"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neon-500/20 text-neon-400 shadow-glow">
          AI
        </div>
        <div>
          <p className="font-display text-lg font-semibold">AI Video QA</p>
          <p className="text-xs text-white/50">Smart video question cards</p>
        </div>
      </div>
      <button className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/20">
        Get Demo
      </button>
    </motion.header>
  );
}
