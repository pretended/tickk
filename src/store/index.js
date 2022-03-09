import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
    plugins: [createPersistedState()],
    state: {
        user : null
    },
    getters:{
        getUser: state => {
            return state.user;
        }
    },
    actions: {

    },
    mutations: {
        updateIntro(state, value) {
            state.where = value
        },
        updateAuthModal(state, value) {
            state.authModal = value
        },
        setUser(state, user){
            state.user = user;
        },
    }
});
