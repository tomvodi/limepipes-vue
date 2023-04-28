<template>
  <v-app>
    <v-app-bar title="Application bar"></v-app-bar>
    <v-navigation-drawer>
      <v-list>
        <v-list-item :to="'/'" title="Music Sets"></v-list-item>
        <v-list-item :to="'/tunes'" title="Tunes"></v-list-item>
        <v-list-item :to="'/hello'" title="Hello"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="min-height: 300px;">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>
