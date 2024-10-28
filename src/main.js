import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './plugins/router';
import store from './store/store.js'


createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .mount('#app');