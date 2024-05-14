<template>
  <div class="w-full flex">
    <Sidebar v-if="!isLoginPage" :dataOpenSideBar="openSidebar" />
    <div class="w-full">
      <HeaderTop
        v-if="!isLoginPage"
        :dataOpenSideBar="openSidebar"
        :clickHambuger="toggleSidebar"
      />
      <div v-bind:class="!isLoginPage ? 'w-full' : 'w-full h-screen'">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { computed, defineComponent } from "vue";
import HeaderTop from "./../../components/Header.vue";
import Sidebar from "./../../components/sidebar.vue";
import { useRoute } from "vue-router";
export default defineComponent({
  components: { HeaderTop, Sidebar },
  data() {
    return {
      openSidebar: true,
    };
  },
  setup() {
    const route = useRoute();
    const isLoginPage = computed(() => route.name === "login");

    return {
      isLoginPage,
    };
  },
  methods: {
    toggleSidebar() {
      this.openSidebar = !this.openSidebar;
    },
  },
});
</script>
  
  <style scoped>
</style>
  