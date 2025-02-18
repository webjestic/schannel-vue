/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import AppLayout from './components/AppLayout.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(AppLayout)

registerPlugins(app)

app.mount('#app')
