<template>
  <v-container>
    <v-row>
      <v-col v-for="coach in coaches" :key="coach.id" cols="12" md="6" lg="4">
        <v-card>
          <v-card-title>{{ coach.firstName }} {{ coach.lastName }}</v-card-title>
          <v-card-subtitle>{{ coach.subjects.join(", ") }}</v-card-subtitle>
          <v-card-text>
            <div>Описание: {{ coach.description }}</div>
            <div>Ставка: {{ coach.rate }} USD/час</div>
            <div>Опыт: {{ coach.experience }} лет</div>
            <div>Местоположение: {{ coach.location }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="contactCoach(coach.id)">Связаться</v-btn>
            <!-- Добавляем кнопку "Отклики" -->
            <v-btn color="secondary" @click="viewResponses(coach.id)">
              Отклики
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";



const store = useStore();
const router = useRouter();

function contactCoach(coachId) {
  router.push({ name: "ContactCoach", params: { id: coachId } });
}

const coaches = computed(() => store.getters["coaches/coaches"]);

onMounted(() => {
  store.dispatch("coaches/fetchCoaches");
});

const viewResponses = (coachId) => {
  router.push({ name: "Requests", params: { id: coachId } });
};


</script>

<style scoped>
v-container {
  padding: 20px;
}
</style>