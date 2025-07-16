import { categories, featuredTools } from '../../../../utils/data';
import Head from 'next/head';
import Link from 'next/link';
import ReviewsSection from '../../../../components/ReviewsSection';

function AnimatedBadge({ children, color = 'bg-accent' }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white shadow-md animate-pulse ${color}`}>{children}</span>
  );
}

export async function getStaticPaths() {
  const paths = featuredTools.map(tool => ({
    params: { category: tool.categorySlug, tool: tool.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const tool = featuredTools.find(t => t.slug === params.tool && t.categorySlug === params.category);
  return { props: { tool } };
}

export default function ToolDetailPage({ tool }) {
  if (!tool) return <div>Tool not found.</div>;
  const isPopular = tool.popularity >= 90;
  return (
    <>
      <Head>
        <title>{tool.name} Review 2024: Best AI {tool.category} Tool | Features, Pricing & Alternatives</title>
        <meta name="description" content={`${tool.name} is a leading AI ${tool.category} tool. See features, pricing, reviews, and alternatives.`} />
      </Head>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="glass p-8 rounded-2xl shadow-lg relative">
          <div className="flex items-center gap-4 mb-6">
            <img src={tool.logo || '/logo-placeholder.png'} alt={`${tool.name} AI software interface - ${tool.category} tool`} className="w-16 h-16 rounded bg-neutral-100 dark:bg-neutral-700 object-contain" />
            <div>
              <h1 className="text-3xl font-extrabold mb-1 text-accent drop-shadow flex items-center">{tool.name}
                {tool.rating >= 4.7 && <AnimatedBadge color="bg-success" className="ml-2">Top Rated</AnimatedBadge>}
                {isPopular && <AnimatedBadge color="bg-warning" className="ml-2">Popular</AnimatedBadge>}
              </h1>
              <Link href={`/ai-tools/${tool.categorySlug}`}> <a className="text-secondary font-semibold">{tool.category}</a> </Link>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-400">{'★'.repeat(Math.floor(tool.rating))}{'☆'.repeat(5 - Math.floor(tool.rating))}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{tool.rating.toFixed(1)}/5</span>
              </div>
            </div>
          </div>
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-primary">Overview</h2>
            <p>{tool.name} is a cutting-edge AI {tool.category.toLowerCase()} tool. [Add a brief description here.]</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-primary">Key Features</h2>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300">
              <li>Feature 1 - Brief description and benefit</li>
              <li>Feature 2 - Brief description and benefit</li>
              <li>Feature 3 - Brief description and benefit</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-primary">Pricing</h2>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300">
              <li>Free Plan: Features included - $0/month</li>
              <li>Basic Plan: Features included - $X/month</li>
              <li>Pro Plan: Features included - $X/month</li>
              <li>Enterprise: Features included - Custom pricing</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-primary">Pros and Cons</h2>
            <div className="flex gap-8">
              <div>
                <h3 className="font-semibold mb-1">Pros</h3>
                <ul className="list-disc pl-5 text-green-600 dark:text-green-400">
                  <li>Positive aspect 1</li>
                  <li>Positive aspect 2</li>
                  <li>Positive aspect 3</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Cons</h3>
                <ul className="list-disc pl-5 text-orange-600 dark:text-orange-400">
                  <li>Limitation 1</li>
                  <li>Limitation 2</li>
                  <li>Limitation 3</li>
                </ul>
              </div>
            </div>
          </section>
          <div className="flex gap-4 mt-8">
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-gradient-to-r from-accent to-primary text-white font-semibold hover:from-primary hover:to-accent transition-all shadow">Visit Website</a>
          </div>
        </div>
        <ReviewsSection tool={tool} />
      </div>
    </>
  );
} 