<template>
  <v-app>
    <TheNavbar />

    <v-main>
   
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import TheNavbar from './components/layout/TheNavbar.vue';

</script>

<style>
/* Глобальные стили */
</style>