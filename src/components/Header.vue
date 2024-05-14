<template>
  <div class="w-full bg-sonic-primary">
    <div class="flex justify-between items-center h-[50px]">
      <div class="p-4 cursor-pointer" @click="clickHambuger">
        <font-awesome-icon icon="bars" />
      </div>
      <div class="py-2">
        <InputText
          type="text"
          v-model="value"
          class="h-[40px]"
          placeholder="Search.."
        />
      </div>
      <div class="flex space-x-3 items-center justify-center px-3">
        <button
          @click="logout"
          class="px-6 py-2 text-white transition duration-500 ease-out bg-sonic-primary rounded-lg"
        >
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    dataOpenSideBar: Boolean,
    clickHambuger: Function,
  },
  setup() {
    const value = ref("");
    const store = useStore();

    const logout = () => {
      console.log("Logging out...");
      store.dispatch("logout");
    };

    const toggle = (event: MouseEvent) => {
      // Assuming you have a ref named 'menu' defined in your template
      const menuRef = document.querySelector(".menu") as HTMLElement;
      if (menuRef) {
        menuRef.classList.toggle("open");
      }
    };

    return {
      value,
      logout,
      toggle,
    };
  },
});
</script>

<style scoped>
</style>
