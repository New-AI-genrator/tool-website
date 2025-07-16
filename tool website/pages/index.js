import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import ToolCard from '../components/ToolCard';
import NewsletterSignup from '../components/NewsletterSignup';
import ThemeToggle from '../components/ThemeToggle';
import AdBanner from '../components/AdBanner';
import { categories, featuredTools } from '../utils/data';

function AnimatedBadge({ children, color = 'bg-accent' }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white shadow-md animate-pulse ${color}`}>{children}</span>
  );
}

export default function Home({ theme, toggleTheme }) {
  return (
    <>
      <Head>
        <title>150+ Best AI Tools Directory 2024 | Discover Top Artificial Intelligence Software</title>
        <meta name="description" content="Discover the best AI tools and artificial intelligence software. Compare features, pricing, and reviews of 150+ AI applications across 30 categories. Updated daily." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={theme === 'dark' ? 'dark bg-neutral-800 text-neutral-50' : 'bg-neutral-50 text-neutral-900'}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="relative flex flex-col md:flex-row items-center justify-between gap-6 mb-12 rounded-2xl overflow-hidden" style={{ minHeight: '340px' }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-accent to-secondary opacity-80 z-0 animate-gradient-x" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent opacity-30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary opacity-30 rounded-full blur-2xl animate-pulse" />
            <div className="relative z-10 p-8 glass max-w-xl">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight drop-shadow-lg">Discover <span className="text-accent">150+ Best AI Tools</span> for Every Need</h1>
              <p className="text-lg mb-4 font-medium text-neutral-700 dark:text-neutral-200 drop-shadow">Your ultimate directory for artificial intelligence software. Find, compare, and review the top AI tools across 30 categories.</p>
              <div className="flex gap-2 mb-4">
                <AnimatedBadge color="bg-success">Trending</AnimatedBadge>
                <AnimatedBadge color="bg-warning">New</AnimatedBadge>
                <AnimatedBadge color="bg-secondary">Editor's Choice</AnimatedBadge>
              </div>
              <NewsletterSignup />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <div className="w-48 h-48 bg-gradient-to-br from-accent to-primary opacity-60 rounded-full blur-2xl animate-pulse" />
            </div>
          </section>
          {/* Featured Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.slice(0, 8).map(cat => (
                <CategoryCard key={cat.slug} category={cat} />
              ))}
            </div>
          </section>
          {/* Trending Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Trending AI Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTools.slice(0, 6).map((tool, i) => (
                <div key={tool.slug} className="relative group transition-all hover:scale-105">
                  <ToolCard tool={tool} />
                  {i === 0 && <AnimatedBadge className="absolute top-2 right-2" color="bg-success">🔥 Popular</AnimatedBadge>}
                  {i === 1 && <AnimatedBadge className="absolute top-2 right-2" color="bg-warning">✨ New</AnimatedBadge>}
                  {i === 2 && <AnimatedBadge className="absolute top-2 right-2" color="bg-secondary">⭐ Editor's Pick</AnimatedBadge>}
                </div>
              ))}
            </div>
          </section>
          {/* Ad Banner */}
          <section className="mb-12">
            <AdBanner position="main" />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
} 