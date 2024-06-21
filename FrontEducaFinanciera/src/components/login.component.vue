<script>
import { mapActions } from 'vuex';

export default {
    name: 'LoginComponent',
  data() {
    return {
        usuario: {
            name: '',
            password: '',
        }
    }
  },
  methods: {
    ...mapActions(['login'])
}
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="login(usuario)">
      <input type="text" v-model="usuario.name" placeholder="name">
      <input type="password" v-model="usuario.password" placeholder="pass">
      <button type="submit">Login</button>
    </form>
    {{ username }}
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
