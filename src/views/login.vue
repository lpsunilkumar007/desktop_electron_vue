<template>
  <div
    class="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-1 px-8"
  >
    <div class="flex h-full flex-col items-center justify-center">
      <div class="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10">
        <p
          tabindex="0"
          class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
        >
          Login to your account
        </p>
        <p
          tabindex="0"
          class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
        >
          Dont have account?
          <a
            class="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer"
          >
            Sign up here</a
          >
        </p>
        <div>
          <label
            id="email"
            class="float-left text-sm font-bold leading-none text-gray-800"
          >
            Email
          </label>
          <input
            v-model="email"
            aria-labelledby="email"
            type="email"
            class="focus:outline-none bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
          />
        </div>
        <div class="mt-6">
          <label
            for="pass"
            class="float-left font-bold text-sm leading-none text-gray-800"
          >
            Password
          </label>
          <div class="">
            <input
              v-model="password"
              id="pass"
              type="password"
              class="focus:outline-none bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
          </div>
        </div>
        <div class="mt-8">
          <button
            v-on:click="login"
            role="button"
            class="text-sm font-semibold leading-none text-white focus:outline-none bg-sonic-primary border rounded py-4 w-full"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const email = ref("example@soundpaysqq.com");
const password = ref("P@ssw0rd");

const login = () => {
  store.dispatch("login", {
    username: email.value,
    password: password.value,
  });
};
</script>
