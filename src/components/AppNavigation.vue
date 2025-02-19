<template>
  <v-navigation-drawer v-model="drawer">
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
</template>

<script>
export default {
  name: 'AppNavigation',
  props: {
    modelValue: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    drawer: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
}
</script>
