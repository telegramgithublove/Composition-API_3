import { ref, set } from 'firebase/database';
import { database } from '../../plugins/farebase'
import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      coaches: JSON.parse(localStorage.getItem('coaches')) || [] 
    };
},
mutations: {
  setCoaches(state, coaches) {
    state.coaches = coaches;
    localStorage.setItem('coaches', JSON.stringify(coaches)); // Сохраняем в localStorage
  },
  addCoach(state, coach) {
    state.coaches.push(coach);
    localStorage.setItem('coaches', JSON.stringify(state.coaches)); // Сохраняем в localStorage
  }
},

actions: {

  async registerCoach({ commit }, coachData) {
    try {
      const response = await axios.post(`https://find-a-coach-fcbbd-default-rtdb.firebaseio.com/coaches.json`, {
        firstName: coachData.firstName,
        lastName: coachData.lastName,
        description: coachData.description,
        subjects: coachData.subjects, // Массив предметов
        rate: coachData.rate,           // Часовая ставка
        contact: coachData.contact,     // Контактная информация
        experience: coachData.experience,// Опыт работы
        location: coachData.location     // Местоположение
      });

      const id = response.data.name; // Firebase возвращает уникальный ID для нового объекта

      // Создание локального объекта репетитора с ID
      const newCoach = {
        id,
        ...coachData
      };

      // Добавление репетитора в состояние Vuex
      commit('addCoach', newCoach);
    } catch (error) {
      console.error('Ошибка регистрации репетитора:', error);
    }
  },

  async fetchCoaches({ commit }) {
    try {
      const response = await axios.get(`https://find-a-coach-fcbbd-default-rtdb.firebaseio.com/coaches.json`);
      
      // Обработка данных
      const coachesArray = [];
      for (const key in response.data) {
        coachesArray.push({
          id: key,
          ...response.data[key]
        });
      }
      
      commit('setCoaches', coachesArray);
    } catch (error) {
      console.error('Ошибка загрузки списка репетиторов:', error);
    }
  },
},
getters: {
  coaches(state) {
    return state.coaches;
  },
  coachById: state => id => state.coaches.find(coach => coach.id === id)
  }
}