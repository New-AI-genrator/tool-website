import { useState, useRef, useEffect } from 'react';
import { categories, featuredTools } from '../utils/data';
import Link from 'next/link';

export default function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef();
  const resultsRef = useRef();

  useEffect(() => {
    if (!query) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }
    const q = query.toLowerCase();
    // Simple typo tolerance: allow 1 char difference
    const typoMatch = (a, b) => {
      if (a === b) return true;
      if (Math.abs(a.length - b.length) > 1) return false;
      let mismatches = 0, i = 0, j = 0;
      while (i < a.length && j < b.length) {
        if (a[i] !== b[j]) {
          mismatches++;
          if (mismatches > 1) return false;
          if (a.length > b.length) i++;
          else if (a.length < b.length) j++;
          else { i++; j++; }
        } else { i++; j++; }
      }
      mismatches += (a.length - i) + (b.length - j);
      return mismatches <= 1;
    };
    const toolResults = featuredTools.filter(tool =>
      tool.name.toLowerCase().includes(q) || typoMatch(tool.name.toLowerCase(), q)
    ).map(tool => ({
      type: 'tool',
      name: tool.name,
      slug: tool.slug,
      category: tool.category,
      categorySlug: tool.categorySlug,
    }));
    const categoryResults = categories.filter(cat =>
      cat.name.toLowerCase().includes(q) || typoMatch(cat.name.toLowerCase(), q)
    ).map(cat => ({
      type: 'category',
      name: cat.name,
      slug: cat.slug,
    }));
    setResults([...toolResults, ...categoryResults].slice(0, 8));
    setActiveIndex(-1);
  }, [query]);

  const handleKeyDown = (e) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      setActiveIndex(i => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(i => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      const r = results[activeIndex];
      if (r.type === 'tool') {
        window.location.href = `/ai-tools/${r.categorySlug}/${r.slug}`;
      } else {
        window.location.href = `/ai-tools/${r.slug}`;
      }
    }
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <label htmlFor="search-bar" className="sr-only">Search AI tools and categories</label>
      <input
        id="search-bar"
        ref={inputRef}
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search AI tools or categories..."
        autoComplete="off"
        className="w-full px-4 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-accent"
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : undefined}
      />
      {results.length > 0 && (
        <ul
          id="search-results"
          ref={resultsRef}
          className="absolute z-10 left-0 right-0 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded shadow mt-1 max-h-72 overflow-auto"
        >
          {results.map((r, i) => (
            <li
              key={r.type + r.slug}
              id={`result-${i}`}
              className={`px-4 py-2 cursor-pointer ${i === activeIndex ? 'bg-accent text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
              onMouseDown={() => {
                if (r.type === 'tool') {
                  window.location.href = `/ai-tools/${r.categorySlug}/${r.slug}`;
                } else {
                  window.location.href = `/ai-tools/${r.slug}`;
                }
              }}
              role="option"
              aria-selected={i === activeIndex}
            >
              {r.type === 'tool' ? (
                <span>🔎 <b>{r.name}</b> <span className="text-xs text-neutral-500">({r.category})</span></span>
              ) : (
                <span>📂 <b>{r.name}</b> <span className="text-xs text-neutral-500">(Category)</span></span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 