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
      <MusicSetListItem
        v-for="set in data"
        :musicSet="set"
        @edit-music-set="initEdit"
      ></MusicSetListItem>
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
        @click="addOrUpdateInProgress = true"
      >Add MusicSet
      </v-btn>
    </v-row>
  </v-container>
  <v-overlay
    v-model="addOrUpdateInProgress"
    class="align-center justify-center"
    contained
    @after-leave="store.finishUpdate()"
  >
    <AddMusicSet
      :update-set="updateSet"
      @new-music-set="createMusicSet"
      @update-music-set="updateMusicSet"
    ></AddMusicSet>
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
import AddMusicSet from "@/components/AddOrUpdateMusicSet.vue";
import {useMusicSets} from "@/queries/music-sets";
import {ApiClient, CreateSet, MusicSet, UpdateSet} from "@/api-client";
import {inject, ref} from "vue";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {apiClientInjKey} from "@/injection_keys";
import MusicSetListItem from "@/components/MusicSetListItem.vue";
import {useMusicSetStore} from "@/store/music_set";
import {storeToRefs} from "pinia";

const store = useMusicSetStore()
const {addOrUpdateInProgress, updateSet} = storeToRefs(store)
const snackbarVisible = ref(false)
const snackbarMessage = ref("")
const apiClient: ApiClient = inject<ApiClient>(apiClientInjKey) as ApiClient

const {data, error, isLoading} = useMusicSets(apiClient);
const queryClient = useQueryClient();
const {mutate: createMusicSet} = useMutation(
  (formData: CreateSet) => apiClient.createSet(formData),
  {
    onSuccess: (data) => {
      addOrUpdateInProgress.value = false
      showToast('Music Set created successfully')
      queryClient.invalidateQueries({queryKey: ['music-sets']});
    },
    onError: (error: any) => {
      addOrUpdateInProgress.value = false
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

const {mutate: updateMusicSet} = useMutation(
  (formData: MusicSet) => apiClient.updateSet(formData.id, formData as UpdateSet),
  {
    onSuccess: (data) => {
      store.finishUpdate()
      showToast('Music Set updated successfully')
      queryClient.invalidateQueries({queryKey: ['music-sets']});
    },
    onError: (error: any) => {
      store.finishUpdate()
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

const initEdit = (musicSet: MusicSet) => {
  updateSet.value = musicSet
  addOrUpdateInProgress.value = true
}

const showToast = (message: string) => {
  snackbarMessage.value = message
  snackbarVisible.value = true
}

</script>

<style scoped>

</style>
