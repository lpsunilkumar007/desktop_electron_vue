import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    name: "Master",
    path: "/",
    component: () => import('./../views/Pages/MasterLayout.vue'),
    redirect: '/User',
    children: [
      {
        name: 'user',
        path: '/user',
        component: () => import('./../views/User.vue'),       
      },
      {
        name: 'login',
        path: '/login',
        component: () => import('./../views/login.vue'),
      }
      ,
      {
        name: 'about',
        path: '/about',
        component: () => import('./../views/about.vue'),
      },{ path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./../components/NotFound.vue'), },
    ]
  }
];
export default routes;
