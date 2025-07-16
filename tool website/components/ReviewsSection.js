import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getReviews, addReview, removeReview } from '../utils/reviews';

function StarRating({ value, setValue, readOnly }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(star => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => setValue && setValue(star)}
          className={
            (value >= star ? 'text-yellow-400' : 'text-neutral-300 dark:text-neutral-600') +
            ' text-xl focus:outline-none'
          }
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >★</button>
      ))}
    </div>
  );
}

export default function ReviewsSection({ tool }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [myRating, setMyRating] = useState(0);
  const [myText, setMyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setReviews(getReviews(tool.slug));
  }, [tool.slug]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!myRating || !myText.trim()) return;
    setSubmitting(true);
    const review = {
      id: Date.now(),
      user: session.user,
      rating: myRating,
      text: myText,
      date: new Date().toISOString(),
    };
    addReview(tool.slug, review);
    setReviews(getReviews(tool.slug));
    setMyRating(0);
    setMyText('');
    setSubmitting(false);
  };

  const handleDelete = id => {
    removeReview(tool.slug, id);
    setReviews(getReviews(tool.slug));
  };

  const avgRating = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-2">User Reviews</h2>
      {avgRating && (
        <div className="mb-2 flex items-center gap-2">
          <span className="text-yellow-400 text-lg">{'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}</span>
          <span className="text-neutral-600 dark:text-neutral-300">{avgRating}/5 ({reviews.length} review{reviews.length > 1 ? 's' : ''})</span>
        </div>
      )}
      {reviews.length === 0 && <div className="text-neutral-500 mb-4">No reviews yet.</div>}
      <div className="space-y-4 mb-6">
        {reviews.map(r => (
          <div key={r.id} className="bg-neutral-100 dark:bg-neutral-700 rounded p-3 flex flex-col md:flex-row md:items-center gap-2">
            <div className="flex items-center gap-2 mb-1 md:mb-0">
              <img src={r.user.image} alt={r.user.name} className="w-8 h-8 rounded-full" />
              <span className="font-semibold">{r.user.name.split(' ')[0]}</span>
              <StarRating value={r.rating} readOnly />
            </div>
            <div className="flex-1">{r.text}</div>
            {session && r.user.email === session.user.email && (
              <button onClick={() => handleDelete(r.id)} className="text-xs text-warning hover:underline">Delete</button>
            )}
          </div>
        ))}
      </div>
      {session ? (
        <form onSubmit={handleSubmit} className="bg-neutral-50 dark:bg-neutral-800 rounded p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src={session.user.image} alt={session.user.name} className="w-8 h-8 rounded-full" />
            <span className="font-semibold">{session.user.name.split(' ')[0]}</span>
            <StarRating value={myRating} setValue={setMyRating} />
          </div>
          <textarea
            value={myText}
            onChange={e => setMyText(e.target.value)}
            placeholder="Write your review..."
            className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-accent"
            rows={3}
            required
          />
          <button
            type="submit"
            className="self-end px-4 py-2 rounded bg-accent text-white font-semibold hover:bg-primary transition"
            disabled={submitting || !myRating || !myText.trim()}
          >
            Submit Review
          </button>
        </form>
      ) : (
        <div className="text-neutral-500">Sign in to leave a review.</div>
      )}
    </section>
  );
} 