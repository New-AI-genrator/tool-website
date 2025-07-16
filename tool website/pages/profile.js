import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getBookmarks, removeBookmark } from '../utils/bookmarks';
import ToolCard from '../components/ToolCard';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleRemove = (slug) => {
    removeBookmark(slug);
    setBookmarks(getBookmarks());
  };

  if (!session) {
    return <div className="max-w-2xl mx-auto px-4 py-8 text-center">Please sign in to view your profile.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <img src={session.user.image} alt={session.user.name} className="w-16 h-16 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{session.user.name}</h1>
          <div className="text-neutral-500 dark:text-neutral-400">{session.user.email}</div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Bookmarked Tools</h2>
      {bookmarks.length === 0 ? (
        <div className="text-neutral-500">No bookmarks yet.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookmarks.map(tool => (
            <div key={tool.slug} className="relative">
              <ToolCard tool={tool} />
              <button
                onClick={() => handleRemove(tool.slug)}
                className="absolute top-2 right-2 px-2 py-1 rounded bg-warning text-white text-xs font-semibold hover:bg-orange-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 