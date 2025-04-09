/* eslint-disable @typescript-eslint/no-explicit-any */
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
    CustomSubstackWidget: any;
  }
}

const BlogPage = () => {
  useEffect(() => {
    // Substack blog feed
    window.SubstackFeedWidget = {
      substackUrl: "ridezzy.substack.com",
      posts: 6,
      hidden: ["date"]
    };

    const feedScript = document.createElement("script");
    feedScript.src = "https://substackapi.com/embeds/feed.js";
    feedScript.async = true;
    document.body.appendChild(feedScript);

    // Substack subscribe widget
    window.CustomSubstackWidget = {
      substackUrl: "ridezzy.substack.com",
      placeholder: "example@gmail.com",
      buttonText: "Subscribe",
      theme: "custom",
      colors: {
        primary: "#000000",     // Button background
        input: "#ffffff",       // Input field background
        email: "#000000",       // Input text color
        text: "#ffffff",        // Button text color
      }
    };

    const subscribeScript = document.createElement("script");
    subscribeScript.src = "https://substackapi.com/widget.js";
    subscribeScript.async = true;
    document.body.appendChild(subscribeScript);

    return () => {
      document.body.removeChild(feedScript);
      document.body.removeChild(subscribeScript);
    };
  }, []);

  return (
    <div className="bg-white text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-10 text-center px-6 md:px-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Ridezzy Blog
        </h1>
        <div className="mx-auto w-24 h-1 bg-yellow-400 mb-4 rounded-full" />
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore ideas and stories from the forefront of sustainable urban mobility.
        </p>
      </section>

      {/* Blog Feed */}
      <div className="max-w-5xl mx-auto px-4 mb-20">
        <div id="substack-feed-embed" />
      </div>

      {/* Subscribe CTA */}
      <section className="bg-black text-white py-16 px-6 md:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Ridezzy
          </h2>
          <p className="text-gray-300 mb-8">
            Get fresh insights, EV news, and behind-the-scenes updates straight to your inbox.
          </p>
          <div id="custom-substack-embed" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
