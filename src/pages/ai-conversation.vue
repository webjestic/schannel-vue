<template>
  <v-container class="d-flex flex-column" style="height: calc(100vh - 150px)">
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
                <!-- Show star icon if this circle is starred -->
                <v-icon v-if="circle.starred" small color="yellow">mdi-star</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="removeCircle(index)">
                <v-list-item-title>Remove</v-list-item-title>
              </v-list-item>
              <v-list-item 
                @click="circle.starred ? unstarCircle(index) : starCircle(index)"
              >
                <v-list-item-title>
                  {{ circle.starred ? 'Unstar' : 'Star' }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <!-- Plus Button without dropdown -->
        <v-btn icon @click="addCircle">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card>
    
    <!-- Chat messages area -->
    <v-card class="flex-grow-1 mb-4 overflow-y-auto">
      <v-card-text>
        <!-- Conversation will go here -->
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
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// Existing chat input logic
const userInput = ref('')

// New reactive state for circles; now each is an object with 'color' and 'starred' flag
const circles = ref([{ color: 'blue', starred: false }])
// Define available colors
const colors = ['red', 'green', 'orange', 'purple', 'blue', 'teal']

// Tracks the index of the currently open circle menu (if any)
const activeCircleMenu = ref(null)

const addCircle = () => {
  let newColor;
  const prev = circles.value.length ? circles.value[circles.value.length - 1].color : null;
  // Pick a random color until it differs from the previous one
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  } while (newColor === prev && colors.length > 1)
  circles.value.push({ color: newColor, starred: false });
}

const removeCircle = (index) => {
  circles.value.splice(index, 1)
  if (activeCircleMenu.value === index) {
    activeCircleMenu.value = null
  }
}

// "Star" a circle: mark it as starred and move it to the beginning
const starCircle = (index) => {
  const circ = circles.value[index]
  circ.starred = true;
  circles.value.splice(index, 1)
  circles.value.unshift(circ)
  activeCircleMenu.value = null
}

// "Unstar" a circle: remove the starred flag without changing its position
const unstarCircle = (index) => {
  circles.value[index].starred = false;
  activeCircleMenu.value = null
}

const handleSend = () => {
  if (!userInput.value.trim()) return;
  console.log('Message sent:', userInput.value);
  userInput.value = '';
}
</script>

<style scoped>
.chat-messages {
  min-height: 200px;
}

:deep(.v-expansion-panel-title) {
  padding-right: 160px !important;
}
</style>
