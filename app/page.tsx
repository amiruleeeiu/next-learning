import { Suspense } from "react";
import { PostsList, PostsListSkeleton } from "./components/PostsList";
import SortProducts from "./components/SortProducts";

// Force dynamic rendering for searchParams
export const dynamic = "force-dynamic";

export default async function Home(props: {
  searchParams: Promise<{ sort?: string; order?: string }>;
}) {
  const searchParams = await props.searchParams;
  console.log("🔍 Page searchParams:", searchParams);
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black py-10 px-4">
      {/* Static Content - Instantly loads */}
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          Welcome to Next.js Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
          Discover amazing articles and insights from our community
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 px-6 py-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              100+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Articles
            </div>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 px-6 py-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              50K+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Readers
            </div>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900/30 px-6 py-3 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              24/7
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Updated
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Content - Streams with Suspense */}
      <section className="w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Latest Posts
        </h2>
        <SortProducts />
        <Suspense
          key={`${searchParams.sort}-${searchParams.order}`}
          fallback={<PostsListSkeleton />}
        >
          <PostsList searchParams={searchParams} />
        </Suspense>
      </section>

      {/* Static Content - Instantly loads */}
      <footer className="w-full max-w-4xl mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
              About Us
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We share knowledge and insights to help developers grow and build
              amazing things.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
              Quick Links
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Home</li>
              <li>• Dashboard</li>
              <li>• Client Demo</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
              Follow Us
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stay updated with our latest posts and updates.
            </p>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 dark:text-gray-500">
          © 2026 Next.js Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
