<template>
  <v-list-item
    :key="musicSet.id"
    class="bg-blue-lighten-3">
    <template v-slot:title>
      <v-row>
        <v-col>{{ musicSet.title }}</v-col>
        <v-col>{{ musicSet.creator }}</v-col>
      </v-row>
    </template>
    <template v-slot:subtitle>
      <v-row>
        <v-col>{{ musicSet.tunes.length }} tunes</v-col>
        <v-col>{{ musicSet.description }}</v-col>
      </v-row>
    </template>
    <template v-slot:append>
      <v-btn
        density="comfortable"
        icon="mdi-file-document-edit"
        variant="outlined"
        @click="handleEdit"
      ></v-btn>
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import {MusicSet} from "@/api-client";

const emit = defineEmits(['editMusicSet'])

const props = defineProps({
  musicSet: {type: Object as () => MusicSet}
})

function handleEdit() {
  emit('editMusicSet', props.musicSet)
}
</script>

<style scoped>
v-list-item {
  background-color: chocolate;
}
</style>
