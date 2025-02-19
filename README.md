# schannel-vue

## Tech Stack
- Vue 3 (https://vuejs.org/guide/quick-start.html)
- Vuetify 3 (https://vuetifyjs.com/en/getting-started/installation/)
- Vite as build tool
- Vue Router for routing
- Material Design Icons

## Project Structure
- `src/components/` - Vue components
  - `AppLayout.vue` - Main layout with theme toggle
  - `AppFooter.vue` - Global footer component
  - `AppHeader.vue` - Global header component
- `src/pages/` - Page components
  - `Home.vue` - Home page
  - `ai-conversation.vue` - AI Chat interface
- `src/plugins/` - Plugin configurations
  - `vuetify.js` - Vuetify setup with theme configuration
  - `index.js` - Plugin registration
- `src/router/` - Route configurations
  - `index.js` - Route definitions and setup

## Development
- Running on port 3001 (configured in vite.config.mjs)
- Dark/Light theme support enabled
- Material Design Icons (@mdi/font) included

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint and fix files

## Features

### AI Conversation
The application includes an AI chat interface that allows users to:
- Send messages through a responsive text input
- View conversation history in a scrollable card
- Use keyboard shortcuts (Enter) to send messages
- Access the chat at `/ai-conversation` route