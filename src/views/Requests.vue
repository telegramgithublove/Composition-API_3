<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Запросы на работу</v-card-title>
          <v-card-text>
            <v-list v-if="requests.length">
              <v-list-item v-for="request in requests" :key="request.id">
                <v-list-item-content>
                  <v-list-item-title>Email: {{ request.email }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Сообщение: {{ request.message }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn color="red" @click="deleteRequest(request.id)">Удалить</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-alert v-else type="info">
              Запросов на работу пока нет.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const coachId = route.params.id;

const requests = computed(() => store.getters['requests/requests']);

const deleteRe------quest = (requestId) => {

store.dispatch('requests/deleteRequest', requestId);
};

onMounted(() => {
  store.dispatch('requests/fetchRequests', coachId);
});
</script>

<style scoped>
.v-container {
  padding-top: 20px;
}
</style>
