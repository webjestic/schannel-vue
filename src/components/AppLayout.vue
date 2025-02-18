<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar">
      <v-spacer />
      <v-btn
        icon
        @click="toggleTheme"
      >
        <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer" />
      </v-list>
    </v-navigation-drawer>

    <v-main 
      title="d-flex align-center justify-center" 
      style="min-height: 300px;">
      Main Content
    </v-main>

    <AppFooter />
  </v-layout>
</template>

<script>
import { useTheme } from 'vuetify'
import AppFooter from './AppFooter.vue'

export default {
  name: 'AppLayout',
  components: {
    AppFooter
  },
  setup() {
    const theme = useTheme()

    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }

    return {
      theme,
      toggleTheme
    }
  }
}
</script>

<style scoped>
/* ...existing styles... */
</style>
