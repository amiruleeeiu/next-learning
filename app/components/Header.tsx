"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLanguage } from "../utils/setLanguage";

function Header() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const changeLang = (lang: "en" | "bn") => {
    startTransition(async () => {
      await setLanguage(lang);
      router.refresh(); // ✅ server components refetch হবে
    });
  };
  return (
    <header className="bg-white dark:bg-zinc-900 shadow-sm border-b dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="flex gap-6">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >
            Home
          </Link>
          <Link
            href="/client-demo"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >
            Client Demo
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/services"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >
            Services
          </Link>
        </nav>
        <div className="flex gap-2">
          <button
            onClick={() => changeLang("en")}
            disabled={pending}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md font-medium transition-colors"
          >
            EN
          </button>
          <button
            onClick={() => changeLang("bn")}
            disabled={pending}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-md font-medium transition-colors"
          >
            BN
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
