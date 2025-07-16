import { useEffect, useState } from 'react';
import { addBookmark, removeBookmark, isBookmarked } from '../utils/bookmarks';

export default function BookmarkButton({ tool }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(tool.slug));
  }, [tool.slug]);

  const handleClick = e => {
    e.preventDefault();
    if (bookmarked) {
      removeBookmark(tool.slug);
      setBookmarked(false);
    } else {
      addBookmark(tool);
      setBookmarked(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      className={`px-2 py-1 rounded ${bookmarked ? 'bg-accent text-white' : 'bg-neutral-200 dark:bg-neutral-700 hover:bg-accent hover:text-white'} text-xs transition`}
    >
      {bookmarked ? '🔖 Bookmarked' : '🔖 Bookmark'}
    </button>
  );
} 