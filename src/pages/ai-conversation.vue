<template>
  <v-container 
    class="d-flex flex-column"
    style="height: calc(100vh - 150px); position: relative;">
    <!-- Main Content Area (with right margin to accommodate panel) -->
    <div style="margin-right: 260px;">
      <!-- Icon Card -->
      <v-card class="mb-4 pa-4">
        <div class="d-flex align-center">
          <div v-for="(circle, index) in circles" :key="index" class="me-3">
            <v-menu
              :model-value="activeCircleMenu === index"
              @update:modelValue="val => activeCircleMenu = val ? index : null"
              offset-y
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  :color="circle.color"
                  depressed
                  rounded
                  style="width: 48px; height: 48px; border-radius: 50%; min-width: 48px;"
                  @click.stop
                >
                  <div class="d-flex align-center justify-center">
                    <v-icon v-if="circle.star" small color="yellow">mdi-star</v-icon>
                    <v-icon v-if="circle.thumbUp" small color="white">mdi-thumb-up</v-icon>
                    <v-icon v-else-if="circle.thumbDown" small color="white">mdi-thumb-down</v-icon>
                  </div>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="toggleStar(index)">
                  <v-list-item-title>
                    {{ circle.star ? 'Remove Star' : 'Star' }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="toggleThumbUp(index)">
                  <v-list-item-title>
                    {{ circle.thumbUp ? 'Remove Thumbs Up' : 'Thumbs Up' }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="toggleThumbDown(index)">
                  <v-list-item-title>
                    {{ circle.thumbDown ? 'Remove Thumbs Down' : 'Thumbs Down' }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="removeCircle(index)">
                  <v-list-item-title>Remove</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <!-- Plus Button as a simple trigger -->
          <v-btn icon @click="addCircle">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-card>
      
      <!-- Chat messages area -->
      <v-card class="flex-grow-1 mb-4 overflow-y-auto">
        <v-card-text>
          <div v-for="(msg, index) in messages" :key="index" class="mb-2">
            <v-card :class="msg.role === 'user' ? 'blue lighten-4' : 'green lighten-4'" class="pa-3">
              <v-card-subtitle style="font-size: 14px; color: grey;">
                {{ msg.role === 'user' ? 'User' : 'Assistant' }}
              </v-card-subtitle>
              <v-card-text>{{ msg.content }}</v-card-text>
              <v-card-actions v-if="msg.role==='user'">
                <v-btn icon style="min-width: 24px; width: 24px; height: 24px;">
                  <v-icon style="font-size: 16px;">mdi-thumb-up</v-icon>
                </v-btn>
                <v-btn icon style="min-width: 24px; width: 24px; height: 24px;">
                  <v-icon style="font-size: 16px;">mdi-thumb-down</v-icon>
                </v-btn>
                <v-btn icon style="min-width: 24px; width: 24px; height: 24px;">
                  <v-icon style="font-size: 16px;">mdi-star</v-icon>
                </v-btn>
                <v-btn icon style="min-width: 24px; width: 24px; height: 24px;">
                  <v-icon style="font-size: 16px;">mdi-delete</v-icon>
                </v-btn>
                <v-btn icon style="min-width: 24px; width: 24px; height: 24px;">
                  <v-icon style="font-size: 16px;">mdi-pencil</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
      
      <!-- Input area -->
      <v-card class="px-4 py-3">
        <v-textarea
          v-model="userInput"
          rows="3"
          auto-grow
          hide-details
          placeholder="Type your message here..."
          @keydown.enter.prevent="handleSend"
        >
          <template #append>
            <v-btn color="primary" icon="mdi-send" @click="handleSend" />
          </template>
        </v-textarea>
      </v-card>
    </div>
    
    <!-- Right Side Options Panel -->
    <v-sheet
      elevation="2"
      class="pa-4"
      :style="rightPanelStyle"
    >
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-h6">Options</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Option 1</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Option 2</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Additional Info</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import axios from 'axios'  // added import for axios

// Existing chat input logic
const userInput = ref('')
const messages = ref([])  // new reactive chat messages array

// Each circle is now an object with 'color', 'star', 'thumbUp', and 'thumbDown'
const circles = ref([{ color: 'blue', star: false, thumbUp: false, thumbDown: false }])
// Define available colors
const colors = ['red', 'green', 'orange', 'purple', 'blue', 'teal']

// Tracks the index of the currently open circle menu (if any)
const activeCircleMenu = ref(null)

// Right panel style computed based on the theme
const theme = useTheme()
const rightPanelStyle = computed(() =>
  theme.global.current.value.dark 
    ? "position: absolute; top: 0; right: 0; width: 250px; height: 100%; background-color: #424242; color: white;"
    : "position: absolute; top: 0; right: 0; width: 250px; height: 100%; background-color: #f5f5f5; color: black;"
)

const addCircle = () => {
  let newColor;
  const prev = circles.value.length ? circles.value[circles.value.length - 1].color : null;
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  } while (newColor === prev && colors.length > 1)
  circles.value.push({ color: newColor, star: false, thumbUp: false, thumbDown: false });
}

const removeCircle = (index) => {
  circles.value.splice(index, 1)
  if (activeCircleMenu.value === index) {
    activeCircleMenu.value = null;
  }
}

const toggleStar = (index) => {
  circles.value[index].star = !circles.value[index].star;
  activeCircleMenu.value = null;
}

const toggleThumbUp = (index) => {
  const circ = circles.value[index];
  if (circ.thumbUp) {
    circ.thumbUp = false;
  } else {
    circ.thumbUp = true;
    circ.thumbDown = false;
  }
  activeCircleMenu.value = null;
}

const toggleThumbDown = (index) => {
  const circ = circles.value[index];
  if (circ.thumbDown) {
    circ.thumbDown = false;
  } else {
    circ.thumbDown = true;
    circ.thumbUp = false;
  }
  activeCircleMenu.value = null;
}

const handleSend = async () => {
  if (!userInput.value.trim()) return;
  // Push user message
  messages.value.push({ role: 'user', content: userInput.value });
  try {
    const response = await axios.post(
      'http://localhost:3000/command',
      { command: userInput.value },
      {
        headers: {
          'User-Id': 'userid-3908120f-d164-4c2d-aca6-9de088426fdb',
          'Conversation-Id': 'convid-8caac700-bff2-4e21-8c3e-6adf12ed3824',
          'Admin-Key': 'SfBSKaLGO-LxGdUSe8nnSB-INfuSuouAypgPyPJqD4abx9KEujZr7LMiWkgN66KQ',
          'System-Prompt-Id': 'sc_mission_master',
          'Content-Type': 'application/json'
        }
      }
    );
    // Use optional chaining to support both property names
    const assistantMessage = response.data.response?.message || response.data.response?.message;
    messages.value.push({ role: 'assistant', content: assistantMessage });
  } catch (error) {
    console.error(error);
  }
  userInput.value = '';
}
</script>

<style scoped>
:deep(.v-expansion-panel-title) {
  padding-right: 160px !important;
}
</style>
