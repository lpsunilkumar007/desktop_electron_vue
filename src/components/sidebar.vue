<template>
  <div
    class="h-screen bg-sonic-primary"
    id="side-bar"
    :class="dataOpenSideBar == true ? 'side-bar-visible' : 'side-bar-close'"
  >
    <div class="bg-gray-700 h-[50px] flex justify-center items-center">
      <div
        class="text-xl font-bold text-center flex items-center justify-center text-white h-full"
        v-show="dataOpenSideBar"
      >
        Sonic
      </div>
    </div>
    <div
      class="flex flex-col justify-between h-[calc(100vh-3rem)] bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-1 px-8"
    >
      <div class="menu-man text-left px-2 whitespace-nowrap">
        <div
          class="py-3 rounded-md cursor-pointer text-gray-300 hover:text-white"
        >
          <router-link to="/user" class="px-2 flex space-x-2"
            ><span class="pi pi-user" v-tooltip.right="'User'"></span>
            <span v-show="dataOpenSideBar">
              <font-awesome-icon icon="user" /> User
            </span></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataOpenSideBar: Boolean,
  },
};
</script>

<style>
.p-tooltip-text {
  font-size: 10px !important;
}

#side-bar {
  overflow: hidden;
  transition: 300ms;
}

.side-bar-visible {
  width: 250px !important;
}

.side-bar-close {
  width: 50px !important;
}
</style>