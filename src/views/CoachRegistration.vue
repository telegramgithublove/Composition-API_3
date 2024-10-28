<template>
  <v-container>
    <h1>Регистрация репетитора</h1>
    <v-form v-model="valid" ref="form" @submit.prevent="submitForm">
      <v-text-field
        v-model="firstName"
        label="Имя"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-text-field
        v-model="lastName"
        label="Фамилия"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-textarea
        v-model="description"
        label="Описание"
        :rules="[rules.required]"
        required
      ></v-textarea>

      <v-text-field
        v-model="subjects"
        label="Предметы (через запятую)"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="rate"
        label="Часовая ставка"
        :rules="[rules.required, rules.numeric]"
        required
      ></v-text-field>

      <v-text-field
        v-model="contact"
        label="Контактная информация"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="experience"
        label="Опыт работы (в годах)"
        :rules="[rules.required, rules.numeric]"
        required
      ></v-text-field>

      <v-text-field
        v-model="location"
        label="Местоположение"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-btn type="submit" color="primary">Отправить</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'; // Импорт Vuex Store

const store = useStore(); // Инициализация хранилища Vuex

const valid = ref(false);
const form = ref(null);

// Поля формы
const firstName = ref('');
const lastName = ref('');
const description = ref('');
const subjects = ref('');
const rate = ref(0);
const contact = ref('');
const experience = ref(0);
const location = ref('');

// Правила валидации
const rules = {
  required: value => !!value || 'Это поле обязательно.',
  numeric: value => !isNaN(parseFloat(value)) || 'Введите числовое значение.'
};

// Обработка отправки формы
const submitForm = async () => {
  if (valid.value) {
    const coachData = {
      firstName: firstName.value,
      lastName: lastName.value,
      description: description.value,
      subjects: subjects.value.split(',').map(s => s.trim()), // Преобразование строки в массив
      rate: rate.value,
      contact: contact.value,
      experience: experience.value,
      location: location.value
    };

    try {
      await store.dispatch('coaches/registerCoach', coachData); // Используем store.dispatch
      alert('Репетитор успешно зарегистрирован!');
      resetForm();
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Ошибка регистрации. Пожалуйста, попробуйте снова.');
    }
  } else {
    form.value.validate(); // Валидация формы
  }
};

// Сброс полей формы
const resetForm = () => {
  firstName.value = '';
  lastName.value = '';
  description.value = '';
  subjects.value = '';
  rate.value = 0;
  contact.value = '';
  experience.value = 0;
  location.value = '';
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
  padding-top: 30px;
}
</style>
