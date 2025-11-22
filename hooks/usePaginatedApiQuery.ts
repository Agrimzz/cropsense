import { api } from "@/api/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function usePaginatedApiQuery<T = any>(
  key: string | any[],
  endpoint: string,
  options?: UseQueryOptions<T>
) {
  return useQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const response = await api.get(endpoint);
      return response.data as T; // full paginated shape
    },
    ...options,
  });
}
