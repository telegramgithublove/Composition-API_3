import axios from 'axios';

export default {
  state() {
    return {
      requests: [],
    };
  },

  mutations: {
    setRequests(state, requests) {
      state.requests = requests;
    },
    addRequest(state, request) {
      state.requests.push(request);
    },
    removeRequest(state, requestId) {
      state.requests = state.requests.filter(request => request.id !== requestId);
    },
  },

  actions: {
    async addNewRequest({ commit }, requestData) {
      try {
        const response = await axios.post(
          'https://find-a-coach-fcbbd-default-rtdb.firebaseio.com/requests.json',
          requestData
        );
        commit('addRequest', { id: response.data.name, ...requestData });
      } catch (error) {
        console.error('Ошибка добавления запроса:', error);
      }
    },

    async fetchRequests({ commit }, coachId) {
      try {
        const response = await axios.get(
          'https://find-a-coach-fcbbd-default-rtdb.firebaseio.com/requests.json',
          {
            params: {
              orderBy: JSON.stringify('coachId'), 
              equalTo: JSON.stringify(coachId),   // JSON-encoded value
            },
          }
        );
    
        const requests = Object.keys(response.data || {}).map((id) => ({
          id,
          ...response.data[id],
        }));
        commit('setRequests', requests);
      } catch (error) {
        console.error('Ошибка загрузки запросов:', error);
      }
    },
    
    async deleteRequest({ commit }, requestId) {
      try {
        await axios.delete(`https://find-a-coach-fcbbd-default-rtdb.firebaseio.com/requests/${requestId}.json`);
        commit('removeRequest', requestId); // Удаляем запрос из состояния
      } catch (error) {
        console.error('Ошибка удаления запроса:', error);
      }
    },
  },

  getters: {
    requests(state) {
      return state.requests;
    },
  },

  namespaced: true,
}
