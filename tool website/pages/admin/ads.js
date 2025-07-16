import { useEffect, useState } from 'react';
import { getAds, addAd, removeAd } from '../../utils/ads';

export default function AdminAdsPage() {
  const [ads, setAds] = useState([]);
  const [newAd, setNewAd] = useState({ type: 'banner', content: '', url: '', image: '', position: 'main', active: true });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setAds(getAds());
  }, []);

  const handleAddAd = e => {
    e.preventDefault();
    if (!newAd.content && !newAd.image) return;
    setSubmitting(true);
    const ad = { ...newAd, id: Date.now(), active: !!newAd.active };
    addAd(ad);
    setAds(getAds());
    setNewAd({ type: 'banner', content: '', url: '', image: '', position: 'main', active: true });
    setSubmitting(false);
  };

  const handleRemove = id => {
    removeAd(id);
    setAds(getAds());
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Ads & Sponsored Content</h1>
      <form onSubmit={handleAddAd} className="mb-8 bg-neutral-50 dark:bg-neutral-800 rounded p-4 flex flex-col gap-2">
        <select value={newAd.type} onChange={e => setNewAd(a => ({ ...a, type: e.target.value }))} className="px-2 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900">
          <option value="banner">Banner</option>
          <option value="affiliate">Affiliate Link</option>
          <option value="sponsored">Sponsored Content</option>
        </select>
        <input type="text" value={newAd.content} onChange={e => setNewAd(a => ({ ...a, content: e.target.value }))} placeholder="Ad text/content" className="px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base" />
        <input type="text" value={newAd.url} onChange={e => setNewAd(a => ({ ...a, url: e.target.value }))} placeholder="Target URL (affiliate/sponsor)" className="px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base" />
        <input type="text" value={newAd.image} onChange={e => setNewAd(a => ({ ...a, image: e.target.value }))} placeholder="Image URL (optional)" className="px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base" />
        <input type="text" value={newAd.position} onChange={e => setNewAd(a => ({ ...a, position: e.target.value }))} placeholder="Position (e.g. main, sidebar, footer)" className="px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base" />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={newAd.active} onChange={e => setNewAd(a => ({ ...a, active: e.target.checked }))} /> Active
        </label>
        <button type="submit" className="self-end px-4 py-2 rounded bg-accent text-white font-semibold hover:bg-primary transition" disabled={submitting}>Add Ad</button>
      </form>
      <div className="space-y-4">
        {ads.length === 0 ? (
          <div className="text-neutral-500">No ads yet.</div>
        ) : (
          ads.map(ad => (
            <div key={ad.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4 flex items-center gap-4">
              {ad.image && <img src={ad.image} alt={ad.content} className="w-16 h-16 object-contain rounded" />}
              <div className="flex-1">
                <div className="font-semibold">{ad.content}</div>
                <div className="text-xs text-neutral-500">{ad.type} • {ad.position} • {ad.active ? 'Active' : 'Inactive'}</div>
                {ad.url && <a href={ad.url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">{ad.url}</a>}
              </div>
              <button onClick={() => handleRemove(ad.id)} className="px-2 py-1 rounded bg-warning text-white text-xs font-semibold hover:bg-orange-700 transition">Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 