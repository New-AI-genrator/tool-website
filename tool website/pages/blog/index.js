import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getPosts, addPost } from '../../utils/blog';
import Link from 'next/link';

export default function BlogIndex() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const handleNewPost = async e => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    setSubmitting(true);
    const slug = newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const post = {
      slug,
      title: newPost.title,
      content: newPost.content,
      author: session.user,
      date: new Date().toISOString(),
      tags: newPost.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    addPost(post);
    setPosts(getPosts());
    setNewPost({ title: '', content: '', tags: '' });
    setSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      {session && (
        <form onSubmit={handleNewPost} className="mb-8 bg-neutral-50 dark:bg-neutral-800 rounded p-4 flex flex-col gap-2">
          <input
            type="text"
            value={newPost.title}
            onChange={e => setNewPost(np => ({ ...np, title: e.target.value }))}
            placeholder="Blog post title"
            className="px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <textarea
            value={newPost.content}
            onChange={e => setNewPost(np => ({ ...np, content: e.target.value }))}
            placeholder="ai-tool-directory"
            className="px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-accent"
            rows={5}
            required
          />
          <input
            type="text"
            value={newPost.tags}
            onChange={e => setNewPost(np => ({ ...np, tags: e.target.value }))}
            placeholder="Tags (comma separated)"
            className="px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base"
          />
          <button
            type="submit"
            className="self-end px-4 py-2 rounded bg-accent text-white font-semibold hover:bg-primary transition"
            disabled={submitting || !newPost.title.trim() || !newPost.content.trim()}
          >
            Publish
          </button>
        </form>
      )}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-neutral-500">No blog posts yet.</div>
        ) : (
          posts.map(post => (
            <div key={post.slug} className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4">
              <Link href={`/blog/${post.slug}`}>
                <a className="text-xl font-semibold hover:underline">{post.title}</a>
              </Link>
              <div className="text-xs text-neutral-500 mb-2">by {post.author.name.split(' ')[0]} • {new Date(post.date).toLocaleDateString()} {post.tags.length > 0 && <>• {post.tags.map(t => <span key={t} className="inline-block bg-secondary text-white text-xs px-2 py-0.5 rounded ml-1">{t}</span>)}</>}</div>
              <div className="line-clamp-3 text-neutral-700 dark:text-neutral-300">{post.content.slice(0, 200)}{post.content.length > 200 ? '...' : ''}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 