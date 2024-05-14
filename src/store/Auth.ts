// store.ts
import { createStore } from 'vuex';

interface User {
  id: number;
  username: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const store = createStore<AuthState>({
  state: {
    user: null,
    isLoggedIn: false,
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  actions: {
    async login({ commit }, credentials: { name: string; password: string }) {
      try {
        const response = await fetch('http://localhost:3000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        if (response.ok) {
          const user: User = await response.json();
          commit('setUser', user);
        } else {
          // Handle login error
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    logout({ commit }) {
      commit('logout');
    },
  },
});

export default store;
