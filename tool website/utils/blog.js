export function getPosts() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('blog_posts') || '[]');
}

export function addPost(post) {
  if (typeof window === 'undefined') return;
  const posts = getPosts();
  localStorage.setItem('blog_posts', JSON.stringify([post, ...posts]));
}

export function getPost(slug) {
  if (typeof window === 'undefined') return null;
  return getPosts().find(p => p.slug === slug) || null;
} 