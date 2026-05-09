import { motion } from "framer-motion";

export default function PreviewCard({ previewUrl }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-glass"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Preview
          </p>
          <h3 className="mt-3 font-display text-xl font-semibold">
            Video timeline
          </h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
          Ready
        </div>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <video src={previewUrl} controls className="h-56 w-full object-cover" />
      </div>
    </motion.div>
  );
}
