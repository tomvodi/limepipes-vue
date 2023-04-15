import {ApiClient, Configuration, DefaultApiFactory} from "@/api-client";
import {App} from "vue";


export function setupApiClient(app: App) {
  const apiConfig = new Configuration({
    basePath: "http://localhost:8081/v1"
  })

  const apiClient
    = DefaultApiFactory(apiConfig)
  app.provide<ApiClient>('apiClient', apiClient)
}
