<template>
  <v-app-bar
    color="primary"
    density="compact"
    class="d-flex align-center px-2"
  >
    <v-app-bar-nav-icon
      class="me-2"
      @click="$emit('toggle-nav')"
    />

    <v-app-bar-title>Secure Channel</v-app-bar-title>


    <v-btn
      icon
      @click="toggleTheme"
    >
      <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { useTheme } from 'vuetify'
import logo from '../assets/logo.png'

export default {
  name: 'AppHeader',
  emits: ['toggle-nav'],
  setup() {
    const theme = useTheme()

    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }

    return {
      theme,
      toggleTheme,
      logo
    }
  }
}
</script>
