import { useSession, signIn, signOut } from 'next-auth/react';

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div className="px-4 py-2">Loading...</div>;

  if (!session) {
    return (
      <button
        onClick={() => signIn('google')}
        className="px-4 py-2 rounded bg-accent text-white font-semibold hover:bg-primary transition"
      >
        Sign in with Google
      </button>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-accent hover:text-white transition">
        <img src={session.user.image} alt={session.user.name} className="w-7 h-7 rounded-full" />
        <span className="font-medium">{session.user.name.split(' ')[0]}</span>
      </button>
      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded shadow-lg border border-neutral-200 dark:border-neutral-700 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-20">
        <a href="/profile" className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700">Profile</a>
        <button
          onClick={() => signOut()}
          className="w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          Sign out
        </button>
      </div>
    </div>
  );
} 