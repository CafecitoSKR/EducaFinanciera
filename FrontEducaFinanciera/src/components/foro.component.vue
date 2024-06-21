<script>
import { mapState } from 'vuex';
export default {
  name: 'ForoComponent',
  computed: {
    ...mapState(['token']),
  },
    methods: {
        async datosProtegidos() {
            try {
                const response = await fetch('http://localhost:4000/api', {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': this.token,
                    },
                })
                const dataDB = await response.json();
                console.log(dataDB);
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.datosProtegidos();
    }
};
</script>

<template>
  <h1>Foro</h1>
</template>

<style scoped>


</style>
