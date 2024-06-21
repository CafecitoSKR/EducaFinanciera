<script>
import { mapActions } from 'vuex';

export default {
    name: 'RegisterComponent',
  data() {
    return {
        username: {
      name: '',
      email: '',
      password: '',
        },
    };
  },
  methods: {
    ...mapActions(['register']),
  }
};
</script>

<template>
  <div class="container">
    <div class="logo">
    </div>
    <form @submit.prevent="register(usuario)">
      <input type="text" v-model="username.name" placeholder="name" required>
      <input type="email" v-model="username.email" placeholder="email" required>
      <input type="password" v-model="username.password" placeholder="pass" required>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo img {
  width: 100px;
  height: 100px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
