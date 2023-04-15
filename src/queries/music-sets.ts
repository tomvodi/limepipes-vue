import {ApiClient, MusicSet} from "@/api-client";
import {useQuery} from "@tanstack/vue-query";


export function useMusicSets(apiClient: ApiClient) {
  return useQuery<MusicSet[], Error>({
      queryKey: ['music-sets'],
      queryFn: async () => {
        const response = await apiClient.listSets();
        return response.data;
      }
    }
  )
}
