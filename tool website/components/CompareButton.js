import { useEffect, useState } from 'react';
import { addToComparison, removeFromComparison, isInComparison, getComparison } from '../utils/comparison';

export default function CompareButton({ tool }) {
  const [inComparison, setInComparison] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setInComparison(isInComparison(tool.slug));
    setDisabled(!isInComparison(tool.slug) && getComparison().length >= 4);
  }, [tool.slug]);

  const handleClick = e => {
    e.preventDefault();
    if (inComparison) {
      removeFromComparison(tool.slug);
      setInComparison(false);
      setDisabled(false);
    } else {
      addToComparison(tool);
      setInComparison(true);
      setDisabled(getComparison().length >= 4);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={inComparison ? 'Remove from comparison' : 'Add to comparison'}
      className={`px-2 py-1 rounded ${inComparison ? 'bg-accent text-white' : 'bg-neutral-200 dark:bg-neutral-700 hover:bg-accent hover:text-white'} text-xs transition`}
      disabled={disabled}
    >
      {inComparison ? '⚖️ Added' : '⚖️ Compare'}
    </button>
  );
} 