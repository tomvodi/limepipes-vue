import {ApiClient, Tune} from "@/api-client";
import {useQuery} from "@tanstack/vue-query";

export function useTunes(apiClient: ApiClient) {
  return useQuery<Tune[], Error>({
      queryKey: ['tunes'],
      queryFn: async () => {
        const response = await apiClient.listTunes();
        return response.data;
      }
    }
  )
}
