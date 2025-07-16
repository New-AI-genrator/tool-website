import Link from 'next/link';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
  { href: '/compare', label: 'Compare' },
  { href: '/new-tools', label: 'New Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/community', label: 'Community' },
];

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-50 glass bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-lg px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 transition-all">
      <div className="flex items-center gap-3">
        <span className="font-bold text-xl tracking-tight text-accent drop-shadow">AI Tools Directory</span>
      </div>
      <div className="flex-1 flex justify-center md:justify-end order-2 md:order-none">
        <SearchBar className="w-full md:w-96" />
      </div>
      <ul className="hidden md:flex gap-6 text-base font-medium ml-6">
        {navLinks.map(link => (
          <li key={link.href} className="relative">
            <Link href={link.href}>
              <a className={
                'px-2 py-1 transition-all ' +
                (router.pathname === link.href ? 'text-accent font-bold' : 'hover:text-accent')
              }>
                {link.label}
                {router.pathname === link.href && (
                  <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-accent rounded-full animate-pulse" />
                )}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="ml-auto flex items-center"><UserMenu /></div>
      <button className="md:hidden" aria-label="Open menu">☰</button>
    </nav>
  );
} 