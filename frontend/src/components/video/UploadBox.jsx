import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function UploadBox({ file, onFileSelected, onProcess, isLoading }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFiles = useCallback(
    (files) => {
      const nextFile = files && files[0];
      if (nextFile) {
        onFileSelected(nextFile);
      }
    },
    [onFileSelected]
  );

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div className="flex h-full flex-col gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Upload video
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold">
          Drop your footage here
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Supports MP4, MOV, or WebM up to 250 MB.
        </p>
      </div>

      <motion.div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        whileHover={{ scale: 1.01 }}
        animate={
          isDragging
            ? {
                borderColor: "rgba(119, 255, 224, 0.9)",
                boxShadow: "0 0 35px rgba(119, 255, 224, 0.22)",
              }
            : {
                borderColor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 0 0 rgba(0,0,0,0)",
              }
        }
        transition={{ duration: 0.25 }}
        className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed px-6 py-8 text-center transition ${
          isDragging ? "bg-neon-400/10" : "bg-white/5"
        }`}
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <div className="flex w-full flex-col items-center gap-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <video
                src={previewUrl}
                muted
                playsInline
                className="h-32 w-56 object-cover"
              />
            </div>
            <p className="text-sm font-medium text-white">{file.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold text-neon-400">
              ↑
            </div>
            <p className="text-sm font-medium text-white">
              Drag and drop or click to upload
            </p>
          </div>
        )}
        <p className="text-xs text-white/50">We only process locally for this demo.</p>
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </motion.div>

      <button
        onClick={onProcess}
        disabled={!file || isLoading}
        className="rounded-2xl bg-gradient-to-r from-neon-500/70 via-cyan-400/60 to-blue-500/60 px-4 py-3 text-sm font-semibold text-ink-900 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Process video"}
      </button>
    </div>
  );
}
