<template>
  <v-layout class="rounded rounded-md">
    <AppHeader @toggle-nav="drawer = !drawer" />
    <AppNavigation v-model="drawer" />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-layout>
</template>

<script>
import { ref } from 'vue'
import AppHeader from './AppHeader.vue'
import AppNavigation from './AppNavigation.vue'
import AppFooter from './AppFooter.vue'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppNavigation,
    AppFooter
  },
  setup() {
    const drawer = ref(true)
    
    return {
      drawer
    }
  }
}
</script>

<style scoped>
/* ...existing styles... */
</style>
