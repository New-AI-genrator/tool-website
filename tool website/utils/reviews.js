export function getReviews(toolSlug) {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('reviews_' + toolSlug) || '[]');
  } catch {
    return [];
  }
}

export function addReview(toolSlug, review) {
  if (typeof window === 'undefined') return;
  const reviews = getReviews(toolSlug);
  localStorage.setItem('reviews_' + toolSlug, JSON.stringify([...reviews, review]));
}

export function removeReview(toolSlug, reviewId) {
  if (typeof window === 'undefined') return;
  const reviews = getReviews(toolSlug).filter(r => r.id !== reviewId);
  localStorage.setItem('reviews_' + toolSlug, JSON.stringify(reviews));
} 