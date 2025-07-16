import { getAds } from '../utils/ads';
import { useEffect, useState } from 'react';

export default function AdBanner({ position = 'main' }) {
  const [ad, setAd] = useState(null);
  useEffect(() => {
    const ads = getAds().filter(a => a.active && a.position === position);
    setAd(ads.length > 0 ? ads[0] : null);
  }, [position]);

  if (!ad) {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded-lg">
        <span className="text-lg font-semibold text-neutral-500">[Ad Placement]</span>
      </div>
    );
  }
  return (
    <a href={ad.url} target="_blank" rel="noopener noreferrer" className="block w-full h-32 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
      {ad.image ? (
        <img src={ad.image} alt={ad.content} className="h-full object-contain" />
      ) : (
        <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">{ad.content}</span>
      )}
    </a>
  );
} 