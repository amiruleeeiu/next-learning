import { API_BASE_URLS, fetchAPI } from "@/lib/api-client";

/**
 * Service Attributes Interface
 */
export interface ProcessingTime {
  id: number;
  minTime: number;
  maxTime: number;
  type: string;
}

export interface ServiceAttributes {
  name: string;
  description: string;
  shortDescription: string;
  applicationUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  order: number;
  locale: string;
  synonyms: string[] | null;
  ValidityTime: string | null;
  applicationButtonText: string | null;
  validityText: string | null;
  requiredDocumentText: string | null;
  isRedirection: boolean | null;
  applicationFeeText: string | null;
  slaText: string | null;
  saveforLaterButtonText: string | null;
  isProvidedByBanglaBiz: boolean | null;
  shortName: string | null;
  serviceType: string | null;
  fee: string | null;
  redirectApplicationUrl: string | null;
  requiredDocuments: any[];
  processingTime: ProcessingTime | null;
  metadata: any | null;
  actAndRules: any | null;
  serviceDetailsMenuList: any[];
  serviceRequiredDocument: any | null;
}

/**
 * Service Item (from API response)
 */
export interface ServiceItem {
  id: number;
  attributes: ServiceAttributes;
}

/**
 * Service Response from API
 */
export interface ServiceResponse {
  data: ServiceItem[];
}

/**
 * Application Section (nested in detail response)
 */
export interface ApplicationSection {
  applicationUrl: string | null;
  applicationButtonText: string | null;
  saveforLaterButtonText: string | null;
  validityText: string | null;
  ValidityTime: string | null;
  slaText: string | null;
  applicationFeeText: string | null;
  processingTime: ProcessingTime | null;
  fee: string | null;
}

/**
 * Service Detail Response (flat structure from /services/:id endpoint)
 */
export interface ServiceDetailResponse {
  name: string;
  description?: string;
  shortDescription?: string;
  shortName: string | null;
  agencyName?: string;
  agencyUrl?: string;
  agencyFullName?: string;
  agencyLogo?: any;
  applicationSection: ApplicationSection;
  serviceDetailsMenuList: any[];
  actAndRules: any | null;
  requiredDocumentText: string | null;
  serviceRequiredDocument: any | null;
  redirectApplicationUrl: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
  order?: number;
  locale?: string;
  synonyms?: string[] | null;
  serviceType?: string | null;
  requiredDocuments?: any[];
  metadata?: any | null;
}

/**
 * Flattened Service for easier component use
 */
export interface Service {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  applicationUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  order: number;
  locale: string;
  synonyms: string[] | null;
  fee: string | null;
  processingTime: ProcessingTime | null;
  applicationButtonText: string | null;
  validityText: string | null;
  requiredDocumentText: string | null;
  applicationFeeText: string | null;
  slaText: string | null;
  shortName: string | null;
  serviceType: string | null;
  requiredDocuments: any[];
  metadata: any | null;
  actAndRules: any | null;
  serviceDetailsMenuList: any[];
  agencyName?: string;
  agencyUrl?: string;
  agencyFullName?: string;
  agencyLogo?: any;
}

const BASE_URL = API_BASE_URLS.bepza;

/**
 * Helper function to flatten service item to simple Service object
 */
function flattenService(item: ServiceItem): Service {
  return {
    id: item.id,
    name: item.attributes.name,
    description: item.attributes.description,
    shortDescription: item.attributes.shortDescription,
    applicationUrl: item.attributes.applicationUrl,
    isActive: item.attributes.isActive,
    createdAt: item.attributes.createdAt,
    updatedAt: item.attributes.updatedAt,
    publishedAt: item.attributes.publishedAt,
    order: item.attributes.order,
    locale: item.attributes.locale,
    synonyms: item.attributes.synonyms,
    fee: item.attributes.fee,
    processingTime: item.attributes.processingTime,
    applicationButtonText: item.attributes.applicationButtonText,
    validityText: item.attributes.validityText,
    requiredDocumentText: item.attributes.requiredDocumentText,
    applicationFeeText: item.attributes.applicationFeeText,
    slaText: item.attributes.slaText,
    shortName: item.attributes.shortName,
    serviceType: item.attributes.serviceType,
    requiredDocuments: item.attributes.requiredDocuments,
    metadata: item.attributes.metadata,
    actAndRules: item.attributes.actAndRules,
    serviceDetailsMenuList: item.attributes.serviceDetailsMenuList,
  };
}

/**
 * Service pagination metadata
 */
export interface ServicePagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * Service Response with pagination (optional meta)
 */
export interface ServiceResponseWithPagination {
  data: ServiceItem[];
  meta?: {
    pagination?: ServicePagination;
  };
}

/**
 * Get all services without pagination
 */
export async function getAllServices(): Promise<Service[]> {
  try {
    const response = await fetchAPI<ServiceResponse>(`${BASE_URL}/services`, {
      // next: { revalidate: 60 },
    });

    return response.data.map(flattenService);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

/**
 * Get all services with pagination
 */
export async function getServices(
  page: number = 1,
  pageSize: number = 20,
): Promise<{ services: Service[]; pagination: ServicePagination }> {
  const url = new URL(`${BASE_URL}/services`);
  url.searchParams.append("pagination[page]", String(page));
  url.searchParams.append("pagination[pageSize]", String(pageSize));

  try {
    const response = await fetchAPI<ServiceResponseWithPagination>(
      url.toString(),
      {
        next: { revalidate: 60 },
      },
    );

    // If API returns pagination metadata, use it
    if (response.meta?.pagination) {
      return {
        services: response.data.map(flattenService),
        pagination: response.meta.pagination,
      };
    }

    // Otherwise, create pagination from the returned data
    // Assuming API might return all data or respects pagination params without meta
    const totalServices = response.data.length;
    const pagination: ServicePagination = {
      page: page,
      pageSize: pageSize,
      pageCount: Math.max(1, Math.ceil(totalServices / pageSize)),
      total: totalServices,
    };

    return {
      services: response.data.map(flattenService),
      pagination: pagination,
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    // Return empty result with default pagination on error
    return {
      services: [],
      pagination: {
        page: 1,
        pageSize: pageSize,
        pageCount: 1,
        total: 0,
      },
    };
  }
}

/**
 * Get a single service by ID
 * Note: Single service endpoint returns flat structure, different from list endpoint
 */
export async function getServiceById(id: number): Promise<Service> {
  try {
    const response = await fetchAPI<ServiceDetailResponse>(
      `${BASE_URL}/services/${id}`,
      {
        next: { revalidate: 60 },
      },
    );

    console.log(response);

    // Validate response structure
    if (!response || !response.name) {
      throw new Error(
        `Service with ID ${id} not found or invalid response structure`,
      );
    }

    // Map flat response to Service interface
    const service: Service = {
      id: id,
      name: response.name,
      description: response.description || response.name,
      shortDescription: response.shortDescription || response.name,
      applicationUrl: response.applicationSection?.applicationUrl || "",
      isActive: response.isActive ?? true,
      createdAt: response.createdAt || new Date().toISOString(),
      updatedAt: response.updatedAt || new Date().toISOString(),
      publishedAt: response.publishedAt || null,
      order: response.order || 0,
      locale: response.locale || "en",
      synonyms: response.synonyms || null,
      fee: response.applicationSection?.fee || null,
      processingTime: response.applicationSection?.processingTime || null,
      applicationButtonText:
        response.applicationSection?.applicationButtonText || null,
      validityText: response.applicationSection?.validityText || null,
      requiredDocumentText: response.requiredDocumentText,
      applicationFeeText:
        response.applicationSection?.applicationFeeText || null,
      slaText: response.applicationSection?.slaText || null,
      shortName: response.shortName,
      serviceType: response.serviceType || null,
      requiredDocuments: response.requiredDocuments || [],
      metadata: response.metadata || null,
      actAndRules: response.actAndRules,
      serviceDetailsMenuList: response.serviceDetailsMenuList,
      agencyName: response.agencyName,
      agencyUrl: response.agencyUrl,
      agencyFullName: response.agencyFullName,
      agencyLogo: response.agencyLogo,
    };

    return service;
  } catch (error) {
    console.error(`Error fetching service ${id}:`, error);
    throw error;
  }
}
