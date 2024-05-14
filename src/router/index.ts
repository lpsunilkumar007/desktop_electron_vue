import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import routes from "./routers";
import store from "@/store/index";

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next)=>{
  if ( to.name !== 'login' && !store.state.isLoggedIn){
    next({
      path: 'login',
      replace: true
    })
  } else {
    next();
  }
})
export default router;
