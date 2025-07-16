import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getCategories, getTopics, addTopic } from '../../utils/forum';
import Link from 'next/link';

export default function CommunityPage() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState({});
  const [newTopic, setNewTopic] = useState({ title: '', category: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const cats = getCategories();
    setCategories(cats);
    const t = {};
    cats.forEach(cat => { t[cat.slug] = getTopics(cat.slug); });
    setTopics(t);
  }, []);

  const handleNewTopic = async e => {
    e.preventDefault();
    if (!newTopic.title.trim() || !newTopic.category) return;
    setSubmitting(true);
    const topic = {
      id: Date.now(),
      title: newTopic.title,
      user: session.user,
      date: new Date().toISOString(),
    };
    addTopic(newTopic.category, topic);
    setTopics(t => ({ ...t, [newTopic.category]: getTopics(newTopic.category) }));
    setNewTopic({ title: '', category: '' });
    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Community Forum</h1>
      {session && (
        <form onSubmit={handleNewTopic} className="mb-8 bg-neutral-50 dark:bg-neutral-800 rounded p-4 flex flex-col md:flex-row gap-2 items-end">
          <input
            type="text"
            value={newTopic.title}
            onChange={e => setNewTopic(nt => ({ ...nt, title: e.target.value }))}
            placeholder="Start a new topic..."
            className="flex-1 px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <select
            value={newTopic.category}
            onChange={e => setNewTopic(nt => ({ ...nt, category: e.target.value }))}
            className="px-2 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"
            required
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-accent text-white font-semibold hover:bg-primary transition"
            disabled={submitting || !newTopic.title.trim() || !newTopic.category}
          >
            Post
          </button>
        </form>
      )}
      <div className="space-y-8">
        {categories.map(cat => (
          <div key={cat.slug} className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
            {topics[cat.slug]?.length === 0 ? (
              <div className="text-neutral-500">No topics yet.</div>
            ) : (
              <ul className="space-y-2">
                {topics[cat.slug].map(topic => (
                  <li key={topic.id}>
                    <Link href={`/community/topic/${topic.id}`}>
                      <a className="hover:underline font-medium">{topic.title}</a>
                    </Link>
                    <span className="ml-2 text-xs text-neutral-500">by {topic.user.name.split(' ')[0]} • {new Date(topic.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 