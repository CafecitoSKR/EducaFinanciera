<template>
  <div class="profile">
    <h2>Profile</h2>
    <p>Welcome to your profile page!</p>
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script>
import { removeToken } from '@/auth';

export default {
  name: 'ProfileComponent',
  methods: {
    logoutUser() {
      removeToken();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.profile {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.profile button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>