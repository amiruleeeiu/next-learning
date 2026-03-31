import { Suspense } from "react";
import { ServicesList, ServicesListSkeleton } from "../components/ServicesList";

export default async function ServicesPage() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black py-10 px-4">
      <div className="w-full max-w-6xl mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Services
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse all available services from BEPZA
        </p>
      </div>

      <Suspense fallback={<ServicesListSkeleton />}>
        <ServicesList />
      </Suspense>
    </div>
  );
}
