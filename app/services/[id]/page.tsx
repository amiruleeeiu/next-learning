import LinkWithLoading from "@/app/components/LinkWithLoading";
import { getAllServices, getServiceById } from "@/services/services.service";
import Link from "next/link";

interface ServiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params from API for first 20 services
export async function generateStaticParams() {
  try {
    const services = await getAllServices();
    // Generate for first 20 services to avoid build time issues
    return services.slice(0, 20).map((service) => ({
      id: String(service.id),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Allow dynamic params for other service IDs
export const dynamicParams = true;

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { id } = await params;

  let service;
  try {
    service = await getServiceById(Number(id));
  } catch (error) {
    console.error("Error loading service:", error);
    return (
      <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black py-10 px-4">
        <div className="w-full max-w-4xl">
          <Link
            href="/services"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Services
          </Link>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Service Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The service with ID {id} could not be found or there was an error
              loading it.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black py-10 px-4">
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        <Link href="/services">
          {/* Back to Services */}
          <LinkWithLoading>
            <div className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Services
            </div>
          </LinkWithLoading>
        </Link>

        <article className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg">
          {/* Header */}
          <div className="mb-6 pb-6 border-b border-gray-200 dark:border-zinc-700">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white flex-1">
                {service.name}
              </h1>
              {service.isActive && (
                <span className="ml-4 px-3 py-1 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                  Active
                </span>
              )}
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Service ID: {service.id}</span>
              {service.locale && (
                <>
                  <span>•</span>
                  <span>Language: {service.locale.toUpperCase()}</span>
                </>
              )}
              {service.order && (
                <>
                  <span>•</span>
                  <span>Order: {service.order}</span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
              Description
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {service.description}
            </p>
          </div>

          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {service.fee && (
              <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Application Fee
                </h3>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {service.fee}
                </p>
                {service.applicationFeeText && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {service.applicationFeeText}
                  </p>
                )}
              </div>
            )}

            {service.processingTime && (
              <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Processing Time
                </h3>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {service.processingTime.minTime}-
                  {service.processingTime.maxTime} {service.processingTime.type}
                </p>
                {service.slaText && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {service.slaText}
                  </p>
                )}
              </div>
            )}

            {service.validityText && (
              <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Validity
                </h3>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {service.validityText}
                </p>
              </div>
            )}

            {service.serviceType && (
              <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Service Type
                </h3>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {service.serviceType}
                </p>
              </div>
            )}
          </div>

          {/* Required Documents */}
          {service.requiredDocumentText && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                Required Documents
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {service.requiredDocumentText}
              </p>
            </div>
          )}

          {/* Synonyms */}
          {service.synonyms && service.synonyms.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                Also Known As
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.synonyms.map((synonym, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                  >
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Application URL */}
          {service.applicationUrl && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-zinc-700">
              <a
                href={service.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {service.applicationButtonText || "Apply Now"}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}

          {/* Timestamps */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-700 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex flex-wrap gap-4">
              <span>
                Created: {new Date(service.createdAt).toLocaleDateString()}
              </span>
              <span>•</span>
              <span>
                Updated: {new Date(service.updatedAt).toLocaleDateString()}
              </span>
              {service.publishedAt && (
                <>
                  <span>•</span>
                  <span>
                    Published:{" "}
                    {new Date(service.publishedAt).toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
