export function getComparison() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('comparison') || '[]');
  } catch {
    return [];
  }
}

export function addToComparison(tool) {
  if (typeof window === 'undefined') return;
  let comparison = getComparison();
  if (!comparison.find(t => t.slug === tool.slug)) {
    if (comparison.length >= 4) return; // limit to 4
    comparison = [...comparison, tool];
    localStorage.setItem('comparison', JSON.stringify(comparison));
  }
}

export function removeFromComparison(slug) {
  if (typeof window === 'undefined') return;
  const comparison = getComparison().filter(t => t.slug !== slug);
  localStorage.setItem('comparison', JSON.stringify(comparison));
}

export function clearComparison() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('comparison');
}

export function isInComparison(slug) {
  if (typeof window === 'undefined') return false;
  return getComparison().some(t => t.slug === slug);
} 