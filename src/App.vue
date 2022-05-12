<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #e3e3e3;
}

#app {
  min-height: 100%;
  width: 100%;
  display: flex;
}
</style>
