<template>
  <v-container>
    <v-row>
      <v-alert
        v-if="error"
        :text="'Error fetching music sets: ' + error"
        type="warning"
      ></v-alert>
    </v-row>
    <div class="text-h3 pt-5">MusicSets</div>
    <v-list>
      <v-list-item
        v-for="set in data"
        :key="set.id"
        :subtitle="set.description"
        :title="set.title"
      >
      </v-list-item>
    </v-list>

    <v-progress-circular
      v-if="isLoading"
      :size="36"
      color="primary"
      indeterminate
    ></v-progress-circular>


    <v-row class="pa-3">
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        depressed
        elevation="2"
        fab
        text
        @click="showAddMusicSet"
      >Add MusicSet
      </v-btn>
    </v-row>

  </v-container>
  <v-overlay
    v-model="overlay"
    class="align-center justify-center"
    contained
  >
    <AddMusicSet @new-music-set="createMusicSet"></AddMusicSet>
  </v-overlay>
  <v-snackbar
    v-model="snackbarVisible"
    vertical
  >
    <div class="text-subtitle-1 pb-2">{{ snackbarMessage }}</div>
    <template v-slot:actions>
      <v-btn
        color="indigo"
        variant="text"
        @click="snackbarVisible = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import AddMusicSet from "@/components/AddMusicSet.vue";
import {useMusicSets} from "@/queries/music-sets";
import {ApiClient, CreateSet} from "@/api-client";
import {inject, ref} from "vue";
import {useMutation, useQueryClient} from "@tanstack/vue-query";

const overlay = ref(false)
const snackbarVisible = ref(false)
const snackbarMessage = ref("")
const apiClient: ApiClient = inject<ApiClient>('apiClient') as ApiClient

const {data, error, isLoading} = useMusicSets(apiClient);
const queryClient = useQueryClient();
const {mutate: createMusicSet} = useMutation(
  (formData: CreateSet) => apiClient.createSet(formData),
  {
    onSuccess: (data) => {
      overlay.value = false
      showToast('Music Set created successfully')
      queryClient.invalidateQueries({queryKey: ['music-sets']});
    },
    onError: (error: any) => {
      overlay.value = false
      if (Array.isArray((error as any).response.data.error)) {
        (error as any).response.data.error.forEach((el: any) =>
          showToast(el.message)
        );
      } else {
        showToast((error as any).response.data.message)
      }
    },
  }
);

function showAddMusicSet() {
  overlay.value = true
}

const showToast = (message: string) => {
  snackbarMessage.value = message
  snackbarVisible.value = true
}

</script>

<style scoped>

</style>
