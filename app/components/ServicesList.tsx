import { getAllServices } from "@/services/services.service";
import Link from "next/link";
import LinkWithLoading from "./LinkWithLoading";

export async function ServicesList() {
  const services = await getAllServices();

  return (
    <div className="w-full max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="block bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border border-gray-200 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2 flex-1">
                {service.name}
              </h2>
              {service.isActive && (
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full shrink-0">
                  Active
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
              {service.shortDescription || service.description}
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
              {service.fee && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">Fee:</span>
                  <span>{service.fee}</span>
                </span>
              )}
              {service.processingTime && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">Time:</span>
                  <span>
                    {service.processingTime.minTime}-
                    {service.processingTime.maxTime}{" "}
                    {service.processingTime.type}
                  </span>
                </span>
              )}
            </div>

            {service.serviceType && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-zinc-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {service.serviceType}
                </span>
              </div>
            )}

            <Link href={`/services/${service.id}`}>
              <LinkWithLoading>
                <div className="flex items-center">
                  View Details
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform animate-pulse`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </LinkWithLoading>
            </Link>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No services available at the moment.
          </p>
        </div>
      )}

      {/* Total Services Info */}
      {services.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Showing all {services.length} services
        </div>
      )}
    </div>
  );
}

export function ServicesListSkeleton() {
  return (
    <div className="w-full max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md animate-pulse border border-gray-200 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded flex-1 mr-2"></div>
              <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-700 rounded"></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-5/6"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-700 rounded"></div>
              <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
