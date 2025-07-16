export default function Footer() {
  return (
    <footer className="glass bg-gradient-to-tr from-primary/80 via-accent/70 to-secondary/80 text-neutral-100 py-10 mt-12 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <a href="/" className="hover:underline text-accent font-semibold">Home</a>
          <a href="/categories" className="hover:underline text-accent font-semibold">Categories</a>
          <a href="/compare" className="hover:underline text-accent font-semibold">Compare</a>
          <a href="/blog" className="hover:underline text-accent font-semibold">Blog</a>
          <a href="/community" className="hover:underline text-accent font-semibold">Community</a>
        </div>
        <div className="flex gap-4">
          <a href="#" aria-label="Twitter" className="hover:text-accent text-xl">🐦</a>
          <a href="#" aria-label="LinkedIn" className="hover:text-accent text-xl">💼</a>
          <a href="#" aria-label="YouTube" className="hover:text-accent text-xl">▶️</a>
          <a href="#" aria-label="Instagram" className="hover:text-accent text-xl">📸</a>
        </div>
        <div className="text-sm text-neutral-200 font-light">© 2024 AI Tools Directory</div>
      </div>
    </footer>
  );
} 