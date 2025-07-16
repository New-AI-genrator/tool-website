import Link from 'next/link';

export default function CategoryCard({ category }) {
  return (
    <Link href={`/ai-tools/${category.slug}`}>
      <a className="block glass rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all p-5 flex flex-col items-center text-center border border-neutral-200 dark:border-neutral-700 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-all z-0" />
        <div className="relative z-10 flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-gradient-to-br from-primary to-accent shadow-md animate-pulse">
          <span className="text-3xl">{category.icon || '🧠'}</span>
        </div>
        <div className="font-semibold text-lg mb-1 relative z-10">{category.name}</div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400 relative z-10">{category.toolCount} tools</div>
      </a>
    </Link>
  );
} 