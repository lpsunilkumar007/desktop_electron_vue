import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/site.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import Vuex from "vuex"
import { Vue } from 'vue-class-component'
library.add(fas)
createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(ToastPlugin).use(store).use(router).mount('#app')