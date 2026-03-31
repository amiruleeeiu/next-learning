import { getPosts } from "@/services/posts.service";
import Link from "next/link";
import ReactMoreButton from "./ReactMoreButton";

export async function PostsList({
  searchParams,
}: {
  searchParams?: { sort?: string; order?: string };
}) {
  console.log("📦 PostsList received:", searchParams);
  // API call - এটা stream হবে
  const posts = await getPosts(searchParams?.sort, searchParams?.order);
  console.log(
    "✅ Fetched posts count:",
    posts.length,
    "First title:",
    posts[0]?.title,
  );

  return (
    <div className="w-full max-w-4xl space-y-4">
      {posts.slice(0, 10).map((post) => (
        <Link
          key={post.id}
          href={`/post/${post.id}`}
          className="block bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white capitalize">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
            {post.body}
          </p>
          {/* <span className="text-blue-600 dark:text-blue-400 text-sm mt-3 inline-block">
            Read more →
          </span> */}
          <ReactMoreButton />
        </Link>
      ))}
    </div>
  );
}

export function PostsListSkeleton() {
  return (
    <div className="w-full max-w-4xl space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md animate-pulse"
        >
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
}
