<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="user.name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="user.email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="user.password" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:3000/api/user/register', this.user);
        console.log(response.data);
        alert('Registration successful!');
      } catch (error) {
        console.error(error.response.data);
        alert('Registration failed: ' + error.response.data.error);
      }
    }
  }
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.register div {
  margin-bottom: 10px;
}
.register label {
  display: block;
  margin-bottom: 5px;
}
.register input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.register button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>