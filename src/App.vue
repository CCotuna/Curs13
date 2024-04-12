<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="space-x-16 border p-5 w-52">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/tasks">Tasks</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>
