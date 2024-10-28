import { createRouter, createWebHistory } from 'vue-router';
import CoachList from '../views/CoachList.vue';
import CoachDetail from '../views/CoachDetail.vue';
import CoachRegistration from '../views/CoachRegistration.vue';
import ContactCoach from '../views/ContactCoach.vue';
import Requests from '../views/Requests.vue';

const routes = [
  { path: '/', component: CoachList, name: 'Home' },
  { path: '/coaches', component: CoachList, name: 'Coaches' },
  { path: '/coaches/:id', component: CoachDetail, props: true, name: 'CoachDetail' },
  { path: '/register', component: CoachRegistration, name: 'CoachRegistration' },
  { path: '/contact/:id', component: ContactCoach, props: true, name: 'ContactCoach' },
 /**  { path: '/requests', component: Requests, name: 'Requests' }, */
  { path: '/requests/:id', component: Requests, name: 'Requests' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
