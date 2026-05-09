import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar.jsx";
import UploadBox from "./components/video/UploadBox.jsx";
import PreviewCard from "./components/video/PreviewCard.jsx";
import Results from "./components/video/Results.jsx";
import Spinner from "./components/ui/Spinner.jsx";
import { uploadVideo } from "./services/api.js";

const mockResults = [
  {
    question: "What is the main objective discussed in the video?",
    answer:
      "The speaker focuses on extracting key insights from long-form video content using AI workflows.",
  },
  {
    question: "Which stage of the pipeline takes the longest?",
    answer:
      "Audio transcription is the slowest stage because it processes the full duration of the footage.",
  },
  {
    question: "What output does the app generate?",
    answer:
      "It delivers a concise set of question and answer pairs for study or review.",
  },
];

const normalizeQa = (qa) => {
  if (!qa) return [];
  if (Array.isArray(qa)) return qa;
  if (typeof qa !== "string") return [{ question: "AI Output", answer: String(qa) }];

  const lines = qa.split("\n").map((line) => line.trim()).filter(Boolean);
  const items = [];
  let current = null;

  lines.forEach((line) => {
    const questionMatch = line.match(/^(Q\d*[:.)\-]?|Question\s*\d*[:.)\-]?)\s*(.*)$/i);
    const answerMatch = line.match(/^(A\d*[:.)\-]?|Answer\s*\d*[:.)\-]?)\s*(.*)$/i);

    if (questionMatch) {
      if (current) items.push(current);
      current = { question: questionMatch[2] || line, answer: "" };
      return;
    }

    if (answerMatch) {
      if (!current) current = { question: "AI Question", answer: "" };
      current.answer = answerMatch[2] || line;
      return;
    }

    if (!current) {
      current = { question: "AI Output", answer: line };
    } else if (!current.answer) {
      current.answer = line;
    } else {
      current.answer = `${current.answer} ${line}`.trim();
    }
  });

  if (current) items.push(current);
  return items;
};

export default function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleProcess = async () => {
    if (!file) return;
    setIsLoading(true);
    setResults([]);
    try {
      const formData = new FormData();
      formData.append("video", file);
      const response = await uploadVideo(formData);
      const qaItems = normalizeQa(response?.data?.qa);
      setResults(qaItems.length ? qaItems : mockResults);
    } catch (error) {
      console.error("Upload failed:", error);
      setResults(mockResults);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = useMemo(
    () => [
      { label: "Transcription", value: "Whisper" },
      { label: "Model", value: "GPT-4.1 Mini" },
      { label: "Avg. Processing", value: "~12s" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-ink-900 text-white">
      <div className="noise relative overflow-hidden">
        <div className="absolute inset-0 grid-glow opacity-90" />
        <div className="absolute -top-48 right-[-20%] h-96 w-96 rounded-full bg-neon-500/20 blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-10%] h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <Navbar />

        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-14 lg:px-10">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="glass rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-glass">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neon-400/80">
                AI Video QA
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
                Turn raw video into instant knowledge cards.
              </h1>
              <p className="mt-4 max-w-xl text-base text-white/70">
                Upload a lecture or meeting, let the AI summarize the key
                questions, and ship your insights in seconds.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-glass">
              <UploadBox
                file={file}
                onFileSelected={setFile}
                onProcess={handleProcess}
                isLoading={isLoading}
              />
            </div>
          </motion.section>

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.section
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-glass"
              >
                <Spinner />
              </motion.section>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {previewUrl && !isLoading && (
              <motion.section
                key="preview"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="grid gap-6 lg:grid-cols-[1fr_1.2fr]"
              >
                <PreviewCard previewUrl={previewUrl} />
                <Results results={results} />
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
