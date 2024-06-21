import { createStore } from 'vuex'

export default createStore({
    state: {
        token: null
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload;
        }
    },
    actions: {
       async login ({ commit }, usuario) {
            console.log(usuario);
            try {
                const respuesta = await fetch('http://localhost:4000/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(usuario)
                });
                const resDB = await respuesta.json();
                console.log(resDB.data.token);   
                
                commit('setToken', resDB.data.token);

                localStorage.setItem('token', resDB.data.token);
            } catch (error) {
                console.log(error);
            }
        },
        async register ({ commit }, usuario) {
            console.log(usuario);
            try {
                const respuesta = await fetch('http://localhost:4000/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(usuario)
                });
                const resDB = await respuesta.json();
                console.log(resDB);   
            } catch (error) {
                console.log(error);
            }
        },
        readToken({ commit }) {
            const token = localStorage.getItem('token');
            if (token) {
                commit('setToken', token);
            } else {
                commit('setToken', null);
            }
        }
    },
    modules: {
    }
})