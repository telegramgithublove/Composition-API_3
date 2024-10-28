<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Связаться с репетитором</v-card-title>
          <v-card-text>
            <p>Вы отправляете сообщение репетитору с ID: {{ coachId }}</p>
            <v-form ref="form" v-model="isFormValid">
              <v-text-field
                v-model="email"
                label="Ваш Email"
                required
                :rules="[v => !!v || 'Email обязателен', v => /.+@.+\..+/.test(v) || 'Некорректный Email']"
              />
              <v-textarea
                v-model="message"
                label="Сообщение"
                required
                :rules="[v => !!v || 'Сообщение обязательно']"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="submitMessage" :disabled="!isFormValid">
              Отправить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

// Инициализация
const store = useStore();
const route = useRoute();
const router = useRouter();
const coachId = route.params.id; // Получаем ID репетитора из маршрута

// Переменные для формы
const email = ref("");
const message = ref("");
const isFormValid = ref(false);

// Функция для отправки данных через Vuex
async function submitMessage() {
  if (isFormValid.value) {
    const payload = {
      coachId,
      email: email.value,
      message: message.value,
    };
    try {
      await store.dispatch("requests/addNewRequest", payload);
      router.push({ name: "Coaches" }); // Перенаправление после отправки
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  }
}
</script>

<style scoped>
.v-container {
  padding-top: 20px;
}
</style>
