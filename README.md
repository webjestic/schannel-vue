# schannel-vue

## Tech Stack
- Vue 3 (https://vuejs.org/guide/quick-start.html)
- Vuetify 3 (https://vuetifyjs.com/en/getting-started/installation/)
- Vite as build tool
- Vue Router for routing
- Material Design Icons

## Project Structure
- `src/`
  - `components/` - Vue components
    - `AppLayout.vue` - Main layout containing header, navigation, and footer
    - `AppHeader.vue` - Application header with navigation toggle, theme, and profile buttons
    - `AppNavigation.vue` - Side navigation drawer
    - `AppFooter.vue` - Global footer component
  - `pages/` - Page components
    - `Home.vue` - Home page
    - `ai-conversation.vue` - AI chat interface page
    - `Profile.vue` - User profile page
  - `plugins/` - Plugin configuration files
    - `vuetify.js` - Vuetify setup with theme configuration
    - `index.js` - Plugin registration
  - `router/` - Route configurations
    - `index.js` - Automatic and manual route definitions

- `vite.config.mjs` - Vite configuration and plugin setup
- `.env` - Environment variables

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

## Prompting Guidelines
- Specify the file paths or components you want to modify under `src/components/` or `src/pages/`.
- Provide short, clear instructions about your desired changes (e.g., “Add a new method handleEvent” or “Create a new Settings.vue page”).
- For style or layout adjustments, mention the relevant Vuetify components you’d like to use.
- If you wish to create a new file, request it under the `/Users/michaeln/Documents/Dev/code/sandbox/game/schannel-vue` path.
- Use the existing code structure whenever possible; mention only the necessary changes.
- For environment-specific configurations, reference the data in `vite.config.mjs` or `.env` files.