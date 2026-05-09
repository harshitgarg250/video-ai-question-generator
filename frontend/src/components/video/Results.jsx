import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Results({ results }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedIndex((current) => (current === index ? null : index));
  };

  const handleCopy = async (item, index) => {
    const payload = `Q: ${item.question}\nA: ${item.answer}`;
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 1200);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="glass rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-glass">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Output
          </p>
          <h3 className="mt-3 font-display text-xl font-semibold">
            Questions & Answers
          </h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
          {results.length || 0} cards
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
            Process a video to generate the first set of AI flashcards.
          </div>
        ) : (
          results.map((item, index) => {
            const isExpanded = expandedIndex === index;
            const isCopied = copiedIndex === index;

            return (
              <motion.div
                key={`${item.question}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.question}
                    </p>
                    <motion.p
                      layout
                      className={`mt-3 text-sm text-white/70 ${
                        isExpanded ? "" : "line-clamp-2"
                      }`}
                    >
                      {item.answer}
                    </motion.p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleCopy(item, index)}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:bg-white/20"
                    >
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:bg-white/20"
                    >
                      {isExpanded ? "Collapse" : "Expand"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <AnimatePresence>
        {copiedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 rounded-2xl border border-neon-400/30 bg-neon-400/10 px-4 py-2 text-xs text-neon-400"
          >
            Copied to clipboard.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
