import { useState } from 'react';

const priceTiers = ['Free', 'Freemium', 'Paid'];
const featuresList = ['API', 'Mobile app', 'Collaboration'];
const platforms = ['Web', 'Desktop', 'Mobile'];
const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function CategoryFilters({ filters, setFilters, sort, setSort }) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row md:items-end gap-4">
      <div>
        <label className="block font-semibold mb-1">Price</label>
        <div className="flex gap-2">
          {priceTiers.map(tier => (
            <label key={tier} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={filters.priceTier.includes(tier)}
                onChange={e => {
                  setFilters(f => ({
                    ...f,
                    priceTier: e.target.checked
                      ? [...f.priceTier, tier]
                      : f.priceTier.filter(t => t !== tier),
                  }));
                }}
              />
              {tier}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-semibold mb-1">Features</label>
        <div className="flex gap-2">
          {featuresList.map(feat => (
            <label key={feat} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={filters.features.includes(feat)}
                onChange={e => {
                  setFilters(f => ({
                    ...f,
                    features: e.target.checked
                      ? [...f.features, feat]
                      : f.features.filter(t => t !== feat),
                  }));
                }}
              />
              {feat}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-semibold mb-1">Platform</label>
        <div className="flex gap-2">
          {platforms.map(p => (
            <label key={p} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={filters.platform.includes(p)}
                onChange={e => {
                  setFilters(f => ({
                    ...f,
                    platform: e.target.checked
                      ? [...f.platform, p]
                      : f.platform.filter(t => t !== p),
                  }));
                }}
              />
              {p}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-semibold mb-1">Min. Rating</label>
        <input
          type="range"
          min={1}
          max={5}
          step={0.1}
          value={filters.rating}
          onChange={e => setFilters(f => ({ ...f, rating: parseFloat(e.target.value) }))}
          className="w-24"
        />
        <span className="ml-2 text-sm">{filters.rating}+</span>
      </div>
      <div className="ml-auto">
        <label className="block font-semibold mb-1">Sort by</label>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
} 