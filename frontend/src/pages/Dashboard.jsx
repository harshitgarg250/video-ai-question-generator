export default function Dashboard() {
  return (
    <div className="min-h-screen bg-ink-900 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-16">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Dashboard
        </p>
        <h1 className="font-display text-3xl font-semibold">
          Dashboard overview
        </h1>
        <p className="text-white/70">
          This page is ready for analytics, uploads, and processing history.
        </p>
      </div>
    </div>
  );
}
