import {defineStore} from "pinia";
import {ref} from "vue";
import {MusicSet} from "@/api-client";


export const useMusicSetStore = defineStore('music-set', () => {
  const addOrUpdateInProgress = ref(false)
  const updateSet = ref({} as MusicSet)

  function finishUpdate() {
    updateSet.value = {} as MusicSet
    addOrUpdateInProgress.value = false
  }

  return {addOrUpdateInProgress, updateSet, finishUpdate}
})
