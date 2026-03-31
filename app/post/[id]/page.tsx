import { getPostById } from "@/services/posts.service";
import Link from "next/link";

interface PostDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params from API (without cookies at build time)
export async function generateStaticParams() {
  // Direct fetch without cookies for build-time static generation
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return posts.slice(0, 10).map((post: { id: number }) => ({
    id: String(post.id),
  }));
}

// Revalidate every 10 seconds
export const revalidate = 10;

// Allow dynamic params for other post IDs
export const dynamicParams = true;

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const post = await getPostById(Number(id));

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black py-10 px-4">
      <div className="w-full max-w-3xl">
        <article className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg">
          <div className="mb-4 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>Post ID: {post.id}</span>
            <span>•</span>
            <span>User ID: {post.userId}</span>
          </div>

          <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white capitalize">
            {post.title}
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {post.body}
            </p>
          </div>
        </article>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            ← Back to Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
