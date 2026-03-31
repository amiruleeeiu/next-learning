import { getLang } from "@/lib/api-client";
import ClientPosts from "../components/ClientPosts";

export default async function ClientDemoPage() {
  const lang = await getLang();

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black py-10 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          Server + Client Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          This page is a <strong>Server Component</strong>, but contains a{" "}
          <strong>Client Component</strong> that fetches data in the browser.
        </p>

        <ClientPosts initialLang={lang} />
      </div>
    </div>
  );
}
