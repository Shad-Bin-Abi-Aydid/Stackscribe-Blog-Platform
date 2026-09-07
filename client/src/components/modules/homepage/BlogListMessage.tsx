export default function BlogListMessage({ text }: { text: string }) {
  return (
    <div className="col-span-full text-center py-16 text-slate-500 dark:text-slate-400">
      {text}
    </div>
  );
}
