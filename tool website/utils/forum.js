const defaultCategories = [
  { slug: 'general', name: 'General Discussion' },
  { slug: 'tool-requests', name: 'Tool Requests' },
  { slug: 'support', name: 'Support' },
  { slug: 'announcements', name: 'Announcements' },
];

export function getCategories() {
  if (typeof window === 'undefined') return defaultCategories;
  return JSON.parse(localStorage.getItem('forum_categories') || JSON.stringify(defaultCategories));
}

export function getTopics(categorySlug) {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('forum_topics_' + categorySlug) || '[]');
}

export function addTopic(categorySlug, topic) {
  if (typeof window === 'undefined') return;
  const topics = getTopics(categorySlug);
  localStorage.setItem('forum_topics_' + categorySlug, JSON.stringify([...topics, topic]));
}

export function getPosts(topicId) {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('forum_posts_' + topicId) || '[]');
}

export function addPost(topicId, post) {
  if (typeof window === 'undefined') return;
  const posts = getPosts(topicId);
  localStorage.setItem('forum_posts_' + topicId, JSON.stringify([...posts, post]));
} 