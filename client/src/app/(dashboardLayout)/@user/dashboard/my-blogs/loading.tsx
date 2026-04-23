export default function MyBlogLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-white dark:bg-indigo-950/30 overflow-hidden shadow-sm animate-pulse"
        >
          {/* Thumbnail */}
          <div className="h-56 w-full bg-indigo-100 dark:bg-indigo-900/40" />

          {/* Title */}
          <div className="px-6 pt-4 pb-2 space-y-2">
            <div className="h-5 w-3/4 rounded bg-indigo-100 dark:bg-indigo-900/40" />
            <div className="h-5 w-1/2 rounded bg-indigo-100 dark:bg-indigo-900/40" />
          </div>

          {/* Content lines */}
          <div className="px-6 pb-4 space-y-2">
            <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-3 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />
          </div>

          {/* Tags */}
          <div className="px-6 pb-4 flex gap-2">
            <div className="h-5 w-14 rounded-full bg-indigo-100 dark:bg-indigo-900/40" />
            <div className="h-5 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/40" />
            <div className="h-5 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40" />
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-indigo-50 dark:border-indigo-900/50 flex justify-between items-center">
            <div className="flex gap-3">
              <div className="h-4 w-10 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-4 w-10 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="h-4 w-20 rounded bg-indigo-100 dark:bg-indigo-900/40" />
          </div>
        </div>
      ))}
    </div>
  );
}
