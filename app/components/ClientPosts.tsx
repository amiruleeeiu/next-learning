"use client";

import { useEffect, useState } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface ClientPostsProps {
  initialLang?: string;
}

export default function ClientPosts({ initialLang = "en" }: ClientPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(initialLang);

  const fetchPosts = async (language: string) => {
    setLoading(true);
    try {
      // Client-side fetch - DevTools এ দেখা যাবে
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?lang=${language}`,
        {
          headers: {
            "Accept-Language": language,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      setPosts(data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(lang);
  }, [lang]);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🔍 Client-Side Fetch Demo
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Open DevTools → Network tab to see: <br />
          <code className="bg-blue-100 dark:bg-blue-950 px-2 py-1 rounded">
            https://jsonplaceholder.typicode.com/posts?lang={lang}
          </code>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setLang("en")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            lang === "en"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
          }`}
        >
          English (EN)
        </button>
        <button
          onClick={() => setLang("bn")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            lang === "bn"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
          }`}
        >
          বাংলা (BN)
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          Loading posts...
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-zinc-900 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">
                  ID: {post.id}
                </span>
                <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                  Client Rendered
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize mb-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {post.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
