import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getCategories, getTopics, getPosts, addPost } from '../../../utils/forum';
import { useRouter } from 'next/router';

function Post({ post, posts, onReply, session, depth = 0 }) {
  const replies = posts.filter(p => p.parentId === post.id);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const handleReply = e => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply(post.id, replyText);
    setReplyText('');
    setShowReply(false);
  };
  return (
    <div className={`ml-${depth * 6} mb-4`}>
      <div className="bg-neutral-100 dark:bg-neutral-700 rounded p-3 flex items-center gap-2">
        <img src={post.user.image} alt={post.user.name} className="w-8 h-8 rounded-full" />
        <span className="font-semibold">{post.user.name.split(' ')[0]}</span>
        <span className="text-xs text-neutral-500">{new Date(post.date).toLocaleString()}</span>
        <div className="flex-1 ml-2">{post.text}</div>
        {session && (
          <button onClick={() => setShowReply(r => !r)} className="text-xs text-accent hover:underline ml-2">Reply</button>
        )}
      </div>
      {showReply && session && (
        <form onSubmit={handleReply} className="mt-2 flex gap-2">
          <textarea
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-accent"
            rows={2}
            required
          />
          <button type="submit" className="px-3 py-2 rounded bg-accent text-white font-semibold hover:bg-primary transition">Post</button>
        </form>
      )}
      {replies.map(r => (
        <Post key={r.id} post={r} posts={posts} onReply={onReply} session={session} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function TopicPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [topic, setTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    if (!id) return;
    // Find topic in any category
    const cats = getCategories();
    let found = null;
    for (const cat of cats) {
      const t = getTopics(cat.slug).find(t => t.id === Number(id));
      if (t) { found = t; break; }
    }
    setTopic(found);
    setPosts(getPosts(id));
  }, [id]);

  const handleNewPost = e => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      user: session.user,
      text: newPost,
      date: new Date().toISOString(),
      parentId: null,
    };
    addPost(id, post);
    setPosts(getPosts(id));
    setNewPost('');
  };

  const handleReply = (parentId, text) => {
    const post = {
      id: Date.now(),
      user: session.user,
      text,
      date: new Date().toISOString(),
      parentId,
    };
    addPost(id, post);
    setPosts(getPosts(id));
  };

  if (!topic) return <div className="max-w-2xl mx-auto px-4 py-8 text-center">Topic not found.</div>;

  const rootPosts = posts.filter(p => !p.parentId);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
      <div className="mb-6 text-neutral-500">Started by {topic.user.name.split(' ')[0]} • {new Date(topic.date).toLocaleString()}</div>
      {session && (
        <form onSubmit={handleNewPost} className="mb-6 flex gap-2">
          <textarea
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            placeholder="Write a post..."
            className="flex-1 px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-accent"
            rows={3}
            required
          />
          <button type="submit" className="px-4 py-2 rounded bg-accent text-white font-semibold hover:bg-primary transition">Post</button>
        </form>
      )}
      <div className="space-y-4">
        {rootPosts.length === 0 ? (
          <div className="text-neutral-500">No posts yet.</div>
        ) : (
          rootPosts.map(post => (
            <Post key={post.id} post={post} posts={posts} onReply={handleReply} session={session} />
          ))
        )}
      </div>
    </div>
  );
} 