<template>
  <v-container 
    class="d-flex flex-column"
    style="height: calc(100vh - 150px)"
  >
    <!-- Icon Card -->
    <v-card class="mb-4 pa-4">
      <div class="d-flex align-center">
        <div v-for="(circle, index) in circles" :key="index" class="me-3">
          <v-icon :color="circle" size="48">
            mdi-circle
          </v-icon>
        </div>
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
          <v-btn
            color="primary"
            icon="mdi-send"
            @click="handleSend"
          />
        </template>
      </v-textarea>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// Existing chat input logic
const userInput = ref('')

// New reactive state for circles
const circles = ref([])
// Define available colors
const colors = ['red', 'green', 'orange', 'purple', 'blue', 'teal']

const addCircle = () => {
  // Pick a random color from the array
  const newColor = colors[Math.floor(Math.random() * colors.length)]
  circles.value.push(newColor)
}

const handleSend = () => {
  if (!userInput.value.trim()) return
  console.log('Message sent:', userInput.value)
  userInput.value = ''
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
