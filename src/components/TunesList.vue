<template>
  <v-container>
    <v-row>
      <v-alert
        v-if="error"
        :text="'Error fetching tunes: ' + error"
        type="warning"
      ></v-alert>
    </v-row>
    <div class="text-h3 pt-5">Tunes</div>
    <v-list>
      <TuneListItem
        v-for="tune in data"
        :tune="tune"
      ></TuneListItem>
    </v-list>
    <v-progress-circular
      v-if="isLoading"
      :size="36"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-container>
</template>

<script lang="ts" setup>
import {ApiClient} from "@/api-client";
import {inject} from "vue";
import {apiClientInjKey} from "@/injection_keys";
import TuneListItem from "@/components/TuneListItem.vue";
import {useTunes} from "@/queries/tunes";

const apiClient: ApiClient = inject<ApiClient>(apiClientInjKey) as ApiClient

const {data, error, isLoading} = useTunes(apiClient);

</script>

<style scoped>

</style>
