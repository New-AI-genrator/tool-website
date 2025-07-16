import Link from 'next/link';
import BookmarkButton from './BookmarkButton';
import CompareButton from './CompareButton';
import Image from 'next/image';

function RatingBadge({ rating }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-success text-white shadow animate-pulse ml-2">{rating}★</span>
  );
}

export default function ToolCard({ tool }) {
  const isPopular = tool.popularity >= 90;
  return (
    <div className="glass rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all p-4 flex flex-col border border-neutral-200 dark:border-neutral-700 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-all z-0" />
      <div className="flex items-center gap-3 mb-2 relative z-10">
        <Image
          src={tool.logo || '/logo-placeholder.png'}
          alt={`${tool.name} AI software interface - ${tool.category} tool`}
          width={48}
          height={48}
          className="w-12 h-12 rounded bg-neutral-100 dark:bg-neutral-700 object-contain"
          loading="lazy"
        />
        <div>
          <div className="font-bold text-lg leading-tight flex items-center">
            <Link href={`/ai-tools/${tool.categorySlug}/${tool.slug}`}>{tool.name}</Link>
            {tool.rating >= 4.7 && <RatingBadge rating={tool.rating} />}
            {isPopular && <span className="ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-warning text-white animate-bounce">Popular</span>}
          </div>
          <span className="inline-block bg-secondary text-white text-xs px-2 py-0.5 rounded mt-1">{tool.category}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-2 relative z-10">
        <span className="text-yellow-400">{'★'.repeat(Math.floor(tool.rating))}{'☆'.repeat(5 - Math.floor(tool.rating))}</span>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">{tool.rating.toFixed(1)}/5</span>
      </div>
      <div className="flex gap-2 mt-auto relative z-10">
        <BookmarkButton tool={tool} />
        <CompareButton tool={tool} />
        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-gradient-to-r from-accent to-primary text-white text-xs font-semibold hover:from-primary hover:to-accent transition-all shadow">Try Now</a>
      </div>
    </div>
  );
} 