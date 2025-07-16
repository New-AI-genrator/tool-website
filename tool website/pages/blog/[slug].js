import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPost } from '../../utils/blog';

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug) setPost(getPost(slug));
  }, [slug]);

  if (!post) return <div className="max-w-2xl mx-auto px-4 py-8 text-center">Post not found.</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-xs text-neutral-500 mb-4">by {post.author.name.split(' ')[0]} • {new Date(post.date).toLocaleDateString()} {post.tags.length > 0 && <>• {post.tags.map(t => <span key={t} className="inline-block bg-secondary text-white text-xs px-2 py-0.5 rounded ml-1">{t}</span>)}</>}</div>
      <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 whitespace-pre-line">{post.content}</div>
    </div>
  );
} 