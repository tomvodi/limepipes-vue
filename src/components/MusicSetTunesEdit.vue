<template>
  <v-container>
    <v-row v-for="(tune, index) in setTunes"
           class="pb-2" justify="start" no-gutters>
      <v-col cols="2">
        <v-btn v-if="index != 0"
               density="compact"
               icon="mdi-arrow-up-thin"
               variant="outlined"
               @click="tuneUp(index)"
        ></v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn v-if="index < setTunes?.length - 1"
               density="compact"
               icon="mdi-arrow-down-thin"
               variant="outlined"
               @click="tuneDown(index)"
        ></v-btn>
      </v-col>
      <v-col>
        <div class="text-body-2">{{ tune.title }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {Tune} from "@/api-client";
import {ref, toRef, watch} from "vue";

const emit = defineEmits(['tunesOrderChanged'])
const props = defineProps({
  setTunes: {type: Object as () => Tune[]}
})
const setTunes = ref([] as Tune[])
const setTunesRo = toRef(props, 'setTunes');
watch(setTunesRo, (value) => {
  if (setTunesRo.value == undefined) {
    return
  }
  setTunes.value = setTunesRo.value;
});

const tuneUp = (index: number) => {
  moveTune(index, index - 1)
  emit('tunesOrderChanged', setTunes.value)
}
const tuneDown = (index: number) => {
  moveTune(index, index + 1)
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

  const tempArr = [...setTunes.value]
  const tune = tempArr[old_index];
  tempArr.splice(old_index, 1);
  tempArr.splice(new_index, 0, tune);
  setTunes.value = tempArr
}

</script>

<style scoped>

</style>
