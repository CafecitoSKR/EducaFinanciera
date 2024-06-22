<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
    <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
    <router-link v-if="isAuthenticated" to="/profile">Profile</router-link>
    <router-link v-if="isAuthenticated" to="/posts">Posts</router-link>
    <button v-if="isAuthenticated" @click="logoutUser">Logout</button>
  </nav>
</template>

<script>
import { isAuthenticated, removeToken } from '@/auth';

export default {
  computed: {
    isAuthenticated() {
      return isAuthenticated();
    }
  },
  methods: {
    logoutUser() {
      removeToken();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: #007bff;
  color: white;
}
nav a {
  color: white;
  text-decoration: none;
}
nav button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>