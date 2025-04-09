import { useEffect } from "react";
import Navbar from "../Navbar";

import Footer from "./Footer";

// Extend the window object with a specific type
declare global {
  interface Window {
    SubstackFeedWidget: {
      substackUrl: string;
      posts: number;
      hidden?: string[];
    };
  }
}

const BlogPage = () => {
  useEffect(() => {
    window.SubstackFeedWidget = {
      substackUrl: "ridezzy.substack.com",
      posts: 3,
      hidden: ["date"]
    };

    const script = document.createElement("script");
    script.src = "https://substackapi.com/embeds/feed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "80px" }}>
        <div id="substack-feed-embed"></div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
