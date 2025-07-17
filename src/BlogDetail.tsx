import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogService, BlogPost } from "./firebase/firebaseService";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      if (id) {
        const data = await blogService.getBlogById(id);
        setBlog(data);
      }
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  if (!blog) return <div className="min-h-screen flex items-center justify-center text-gray-400">Blog post not found.</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Link to="/blog" className="text-blue-600 hover:underline text-sm mb-4 inline-block">← Back to Blog</Link>
      {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="w-full h-60 object-cover rounded mb-6" />}
      <div className="text-xs text-gray-400 mb-1">{blog.createdAt && blog.createdAt.toDate().toLocaleDateString()}</div>
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{blog.title}</h1>
      <div className="text-gray-600 mb-4 text-lg">{blog.summary}</div>
      <div className="prose prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
      <div className="mt-8 text-xs text-gray-500">By {blog.author}</div>
    </div>
  );
};

export default BlogDetail;
