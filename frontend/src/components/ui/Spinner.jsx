import { motion } from "framer-motion";

const dotTransition = {
  duration: 0.9,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
};

export default function Spinner() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-12 w-12">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(91,248,209,0.9), rgba(59,130,246,0.6), rgba(91,248,209,0.9))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-[6px] rounded-full border border-white/10 bg-ink-900/80" />
        <div className="absolute inset-0 rounded-full border border-white/10" />
      </div>
      <div>
        <p className="text-sm font-semibold text-white">
          Processing your video...
        </p>
        <div className="mt-1 flex items-center gap-1 text-neon-400">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-neon-400"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
              transition={{ ...dotTransition, delay: index * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
