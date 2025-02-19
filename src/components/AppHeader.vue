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
      class="ms-2"
      @click="goToProfile"
    >
      <v-icon>mdi-account</v-icon>
    </v-btn>
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
import { useRouter } from 'vue-router'
import logo from '../assets/logo.png'

export default {
  name: 'AppHeader',
  emits: ['toggle-nav'],
  setup() {
    const theme = useTheme()
    const router = useRouter()

    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }

    const handleProfileClick = () => {
      console.log('Profile icon clicked')
      // Add your profile menu logic here
    }

    const goToProfile = () => {
      router.push('/profile')
    }

    return {
      theme,
      toggleTheme,
      logo,
      handleProfileClick,
      goToProfile
    }
  }
}
</script>
