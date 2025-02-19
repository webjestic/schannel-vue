<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Secure Channel">
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
        <v-list-item
          to="/"
          title="Home"
          prepend-icon="mdi-home"
        />
        <v-list-item
          to="/ai-conversation"
          title="AI Conversation"
          prepend-icon="mdi-robot"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
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
