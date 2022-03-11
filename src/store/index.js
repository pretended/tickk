import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import {getCurrentUser} from "@/firebase/logic";

export const store = createStore({
    plugins: [createPersistedState()],
    state: {
        user : getCurrentUser() || null
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
