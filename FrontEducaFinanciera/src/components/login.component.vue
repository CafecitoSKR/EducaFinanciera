<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="user.email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="user.password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { setToken } from '@/auth';

export default {
  name: 'LoginComponent',
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3000/api/user/login', this.user);
        console.log(response.data);
        alert('Login successful!');
        setToken(response.data.data.token);
        this.$router.push('/profile');
      } catch (error) {
        console.error(error);
        if (error.response) {
          alert('Login failed: ' + error.response.data.error);
        } else {
          alert('Login failed: ' + error.message);
        }
      }
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.login div {
  margin-bottom: 10px;
}
.login label {
  display: block;
  margin-bottom: 5px;
}
.login input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.login button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
