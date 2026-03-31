import { API_BASE_URLS, fetchAPI } from "@/lib/api-client";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BASE_URL = API_BASE_URLS.jsonPlaceholder;

/**
 * Get all posts
 */
export async function getPosts(sort?: string, order?: string): Promise<Post[]> {
  const url = new URL(`${BASE_URL}/posts`);
  if (sort) {
    url.searchParams.append("_sort", sort);
  }
  if (order) {
    url.searchParams.append("_order", order);
  }
  // Use no-store to disable caching for dynamic filtering
  return fetchAPI<Post[]>(url.toString(), { next: { revalidate: 60 } });
}

/**
 * Get a single post by ID
 */
export async function getPostById(id: number): Promise<Post> {
  return fetchAPI<Post>(`${BASE_URL}/posts/${id}`, {
    next: { revalidate: 60 },
  });
}
