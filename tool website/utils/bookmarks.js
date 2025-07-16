export function getBookmarks() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('bookmarks') || '[]');
  } catch {
    return [];
  }
}

export function addBookmark(tool) {
  if (typeof window === 'undefined') return;
  const bookmarks = getBookmarks();
  if (!bookmarks.find(t => t.slug === tool.slug)) {
    localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, tool]));
  }
}

export function removeBookmark(slug) {
  if (typeof window === 'undefined') return;
  const bookmarks = getBookmarks().filter(t => t.slug !== slug);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

export function isBookmarked(slug) {
  if (typeof window === 'undefined') return false;
  return getBookmarks().some(t => t.slug === slug);
} 