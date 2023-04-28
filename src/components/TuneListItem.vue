<template>
  <v-list-item
    :key="tune.id"
    class="bg-blue-lighten-3">
    <template v-slot:title>
      <v-row>
        <v-col>{{ tune.title }}</v-col>
        <v-col>{{ tune.type }}</v-col>
        <v-col>Time: {{ tune.timesig }}</v-col>
      </v-row>
    </template>
    <template v-slot:subtitle>
      <v-row>
        <v-col>Composer: {{ tune.composer }}</v-col>
        <v-col>Arranger: {{ tune.arranger }}</v-col>
      </v-row>
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import {Tune} from "@/api-client";

defineProps({
  tune: {type: Object as () => Tune}
})

</script>

<style scoped>

</style>
