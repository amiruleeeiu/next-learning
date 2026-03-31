import { API_BASE_URLS, fetchAPI } from "@/lib/api-client";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const BASE_URL = API_BASE_URLS.jsonPlaceholder;

/**
 * Get all users
 */
export async function getUsers(): Promise<User[]> {
  return fetchAPI<User[]>(`${BASE_URL}/users`);
}

/**
 * Get a single user by ID
 */
export async function getUserById(id: number): Promise<User> {
  return fetchAPI<User>(`${BASE_URL}/users/${id}`);
}

/**
 * Example: Get users without cache (dynamic rendering)
 */
export async function getUsersNoCache(): Promise<User[]> {
  return fetchAPI<User[]>(`${BASE_URL}/users`, { cache: "no-store" });
}
