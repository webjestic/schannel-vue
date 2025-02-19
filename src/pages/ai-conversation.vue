<template>
  <v-container class="d-flex flex-column" style="height: calc(100vh - 150px)">
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

const userInput = ref('')

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
