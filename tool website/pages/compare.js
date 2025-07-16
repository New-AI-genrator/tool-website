import { useEffect, useState } from 'react';
import { getComparison, removeFromComparison, clearComparison } from '../utils/comparison';
import Link from 'next/link';

export default function ComparePage() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    setTools(getComparison());
  }, []);

  const handleRemove = (slug) => {
    removeFromComparison(slug);
    setTools(getComparison());
  };

  const handleClear = () => {
    clearComparison();
    setTools([]);
  };

  if (tools.length === 0) {
    return <div className="max-w-4xl mx-auto px-4 py-8 text-center">No tools selected for comparison yet.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Compare AI Tools</h1>
        <button onClick={handleClear} className="px-3 py-1 rounded bg-warning text-white font-semibold hover:bg-orange-700 transition">Clear All</button>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map(tool => (
            <div key={tool.slug} className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4 flex flex-col border border-neutral-200 dark:border-neutral-700 relative">
              <button
                onClick={() => handleRemove(tool.slug)}
                className="absolute top-2 right-2 px-2 py-1 rounded bg-warning text-white text-xs font-semibold hover:bg-orange-700 transition"
              >
                Remove
              </button>
              <img src={tool.logo || '/logo-placeholder.png'} alt={tool.name} className="w-12 h-12 rounded bg-neutral-100 dark:bg-neutral-700 object-contain mb-2" />
              <div className="font-bold text-lg mb-1">
                <Link href={`/ai-tools/${tool.categorySlug}/${tool.slug}`}>{tool.name}</Link>
              </div>
              <span className="inline-block bg-secondary text-white text-xs px-2 py-0.5 rounded mb-2">{tool.category}</span>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-yellow-400">{'★'.repeat(Math.floor(tool.rating))}{'☆'.repeat(5 - Math.floor(tool.rating))}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{tool.rating.toFixed(1)}/5</span>
              </div>
              <div className="mb-2"><b>Price:</b> {tool.priceTier}</div>
              <div className="mb-2"><b>Features:</b> {tool.features?.join(', ')}</div>
              <div className="mb-2"><b>Platform:</b> {tool.platform?.join(', ')}</div>
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="mt-auto px-3 py-1 rounded bg-accent text-white text-xs font-semibold hover:bg-primary transition block text-center">Visit Website</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 