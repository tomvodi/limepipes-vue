/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import {loadFonts} from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'

// Types
import type {App} from 'vue'
import {setupApiClient} from "@/plugins/api-client";
import {VueQueryPlugin} from "@tanstack/vue-query";

export function registerPlugins(app: App) {
  loadFonts()
  setupApiClient(app)
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueQueryPlugin)
}
