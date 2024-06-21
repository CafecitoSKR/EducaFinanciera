<template>
 <pv-toolbar>
  <template #start>
  </template>
  <template #end>
    <pv-router-link to="/register">Register</pv-router-link>
    <pv-router-link to="/login">Login</pv-router-link>
    <pv-router-link to="/foro">Foro</pv-router-link>
    </template> 
 </pv-toolbar>
 <main>
  <router-view/>
 </main>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();

const readToken = () => {
  store.dispatch('readToken');
};

readToken();
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
}
</style>
