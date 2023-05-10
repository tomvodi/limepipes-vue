<template>
  <v-container>
    <v-row v-for="(tune, index) in setTunes"
           class="pb-2 tune-sort-row"
           justify="start"
           no-gutters>
      <v-col cols="1">
        <v-btn v-if="index != 0"
               class="up-button"
               density="compact"
               icon="mdi-arrow-up-thin"
               variant="outlined"
               @click="tuneUp(index)"
        ></v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn v-if="index < setTunes?.length - 1"
               class="down-button"
               density="compact"
               icon="mdi-arrow-down-thin"
               variant="outlined"
               @click="tuneDown(index)"
        ></v-btn>
      </v-col>
      <v-col>
        <div class="text-body-2">{{ tune.title }}</div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="1">
        <v-btn
          class="delete-button"
          density="compact"
          icon="mdi-delete-outline"
          variant="outlined"
          @click="tuneDelete(index)"
        ></v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-combobox
          ref="add-tune-select"
          v-model="selectedTune"
          :items="allTunes"
          density="compact"
          item-text="title"
        >
        </v-combobox>
      </v-col>
      <v-col>
        <v-btn
          ref="add-tune-button"
          :disabled="addingTuneDisabled"
          density="compact"
          icon="mdi-plus"
          variant="outlined"
          @click="tuneAdd"
        ></v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {ApiClient, Tune} from "@/api-client";
import {computed, inject, onMounted, ref, toRef, watchEffect} from "vue";
import {apiClientInjKey} from "@/injection_keys";
import {useTunes} from "@/queries/tunes";

const emit = defineEmits(['tunesOrderChanged'])
const props = defineProps({
  setTunes: Array<Tune>
})
const setTunes = ref([] as Tune[])
const setTunesRo = toRef(props, 'setTunes');
watchEffect(() => {
  if (setTunesRo.value == undefined) {
    return
  }
  setTunes.value = setTunesRo.value;
});
const apiClient: ApiClient = inject<ApiClient>(apiClientInjKey) as ApiClient
const {data: allTunes} = useTunes(apiClient);
const selectedTune = ref<Tune | null>(null)


onMounted(() => {
  console.log(selectedTune.value)
})

const addingTuneDisabled = computed(() => {
  return selectedTune.value == null
})

const tuneUp = (index: number) => {
  moveTune(index, index - 1)
  emit('tunesOrderChanged', setTunes.value)
}

const tuneDown = (index: number) => {
  moveTune(index, index + 1)
  emit('tunesOrderChanged', setTunes.value)
}

const tuneAdd = () => {
  if (selectedTune.value == null) {
    return
  }
  let tmpTunes = [...(setTunes.value)]
  tmpTunes.push(selectedTune.value)
  setTunes.value = tmpTunes
  selectedTune.value = null
  emit('tunesOrderChanged', setTunes.value)
}

const tuneDelete = (index: number) => {
  const tempTunes = [...setTunes.value]
  tempTunes.splice(index, 1);
  setTunes.value = tempTunes
  emit('tunesOrderChanged', setTunes.value)
}

const moveTune = (old_index: number, new_index: number) => {
  if (old_index > setTunes.value.length - 1 ||
    old_index < 0) {
    return;
  }

  if (new_index > setTunes.value.length - 1 ||
    new_index < 0) {
    return;
  }

  const tempTunes = [...setTunes.value]
  const tune = tempTunes[old_index];
  tempTunes.splice(old_index, 1);
  tempTunes.splice(new_index, 0, tune);
  setTunes.value = tempTunes
}

</script>

<style scoped>

</style>
