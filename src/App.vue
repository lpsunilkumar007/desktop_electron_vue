<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {},
  setup() {
    const route = useRoute();
    // Correctly check if the current route is the login route or an undefined path
    const isLoginPage = computed(
      () => route.path === "/login" || route.path === "/:pathMatch(.*)*"
    );
    return {
      isLoginPage,
    };
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

