import Link from 'next/link';
import SearchBar from '../components/SearchBar';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-neutral-500">Sorry, we couldn't find the page you're looking for.</p>
      <div className="w-full max-w-md mb-6">
        <SearchBar />
      </div>
      <Link href="/">
        <a className="px-4 py-2 rounded bg-accent text-white font-semibold hover:bg-primary transition">Go to Homepage</a>
      </Link>
    </div>
  );
} 