import { env } from './env';

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

interface RequestOptions extends RequestInit {
  /**
   * Optional manual token override.
   * If omitted, it will automatically pull from local storage (if on client)
   * or rely on Next.js cookies (if executing server-side).
   */
  token?: string; 
}

/**
 * A strongly-typed generic API client wrapper for the API Gateway.
 * Automatically attaches authentication tokens and standardizes error handling.
 */
export async function fetchApi<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  let token = options.token;

  // Auto-attach token if we are executing on the client
  if (!token && typeof window !== 'undefined') {
    token = localStorage.getItem('auth_token') || undefined;
  }

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const url = `${env.NEXT_PUBLIC_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 204 No Content gracefully
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error: ApiError = {
        message: data?.message || response.statusText || 'An error occurred while fetching data',
        status: response.status,
        code: data?.code,
      };
      throw error;
    }

    return data as T;
  } catch (error: any) {
    // Standardize network-level errors (e.g. CORS, DNS failure)
    if (error.status === undefined) {
      throw {
        message: 'Network error or unable to parse response',
        status: 0,
      } as ApiError;
    }
    throw error;
  }
}
