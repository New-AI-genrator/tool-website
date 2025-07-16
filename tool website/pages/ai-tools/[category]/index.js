import { useState } from 'react';
import { categories, featuredTools } from '../../../utils/data';
import ToolCard from '../../../components/ToolCard';
import Head from 'next/head';
import CategoryFilters from '../../../components/CategoryFilters';

function AnimatedBadge({ children, color = 'bg-accent' }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white shadow-md animate-pulse ${color}`}>{children}</span>
  );
}

export async function getStaticPaths() {
  return {
    paths: categories.map(cat => ({ params: { category: cat.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = categories.find(cat => cat.slug === params.category);
  const tools = featuredTools.filter(tool => tool.categorySlug === params.category);
  return { props: { category, tools } };
}

export default function CategoryPage({ category, tools }) {
  const [filters, setFilters] = useState({
    priceTier: [],
    features: [],
    platform: [],
    rating: 1,
  });
  const [sort, setSort] = useState('popularity');

  let filtered = tools.filter(tool => {
    if (filters.priceTier.length && !filters.priceTier.includes(tool.priceTier)) return false;
    if (filters.features.length && !filters.features.every(f => tool.features?.includes(f))) return false;
    if (filters.platform.length && !filters.platform.some(p => tool.platform?.includes(p))) return false;
    if (tool.rating < filters.rating) return false;
    return true;
  });

  if (sort === 'popularity') {
    filtered = filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  } else if (sort === 'rating') {
    filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <>
      <Head>
        <title>{category.name} AI Tools | Best {category.name} Software | AI Directory</title>
        <meta name="description" content={`Explore the best ${category.name} AI tools and software. Compare features, pricing, and user reviews. Find the perfect AI solution for your ${category.name.toLowerCase()} needs.`} />
      </Head>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-2 text-accent drop-shadow">{category.name} AI Tools</h1>
        <p className="mb-6 text-neutral-600 dark:text-neutral-300 text-lg">Explore the best {category.name.toLowerCase()} AI tools and software. Compare features, pricing, and user reviews.</p>
        <div className="glass mb-8">
          <CategoryFilters filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.length > 0 ? filtered.map((tool, i) => (
            <div key={tool.slug} className="relative group transition-all hover:scale-105">
              <ToolCard tool={tool} />
              {tool.popularity >= 90 && <AnimatedBadge className="absolute top-2 right-2" color="bg-success">Popular</AnimatedBadge>}
              {tool.rating >= 4.7 && <AnimatedBadge className="absolute top-2 left-2" color="bg-warning">Top Rated</AnimatedBadge>}
            </div>
          )) : <div className="col-span-full text-center text-neutral-500">No tools found in this category.</div>}
        </div>
      </div>
    </>
  );
} 