<template>
  <v-app-bar app>
    <v-toolbar-title>Найти репетитора</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>Главная</v-btn>
    <v-btn to="/coaches" text>Репетиторы</v-btn>
    <v-btn to="/register" text>Регистрация</v-btn>
  </v-app-bar>
</template>


<style>
.v-btn {
       cursor: pointer; /* Добавляем курсор при наведении */
       background-color: transparent !important 
   }

.v-btn__overlay {
   background-color: transparent !important  ;
}
</style>