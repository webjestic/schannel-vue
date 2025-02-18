<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar" />

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer" />
      </v-list>
    </v-navigation-drawer>

    <v-main 
      title="d-flex align-center justify-center" 
      style="min-height: 300px;">
      Main Content
    </v-main>
  </v-layout>
</template>

<script>
export default {
  name: 'AppLayout',
  // ...existing logic...
}
</script>

<style scoped>
/* ...existing styles... */
</style>
