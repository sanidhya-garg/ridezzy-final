
import React, { useEffect, useState } from "react";
import { blogService, BlogPost } from "./firebase/firebaseService";
import { Link } from "react-router-dom";

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await blogService.getAllBlogs();
        setBlogs(data);
      } catch {
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">Ridezzy Blog</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-400">No blog posts found.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map(blog => (
            <Link to={`/blog/${blog.id}`} key={blog.id} className="block bg-white rounded-xl shadow hover:shadow-lg transition p-5 group">
              {blog.imageUrl ? (
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-40 object-cover rounded mb-4 group-hover:scale-105 transition" />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400 text-2xl">No Image</div>
              )}
              <div className="text-xs text-gray-400 mb-1">{blog.createdAt && blog.createdAt.toDate ? blog.createdAt.toDate().toLocaleDateString() : ""}</div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-700 transition">{blog.title}</h2>
              <div className="text-gray-600 mb-2 line-clamp-2">{blog.summary}</div>
              <div className="text-xs text-gray-500">By {blog.author}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
