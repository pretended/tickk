import { createStore } from "vuex";

import { auth } from "../firebase/index";
import router from "@/router";


export const store = createStore({
    state() {
        return {
            authModal: false,
            where: 'new',
        };
    },
    actions: {
        async signInWithEmailAndPassword  ({commit}, payload)  {
            let ret = {
                success: true,
                errorMsg: '',
                signMethod: payload.signMethod
            }
            try {
               let res = await auth.signInWithEmailAndPassword(payload.email, payload.password);
                console.log(res);
                commit;
                await router.push("/tabs/tab1");
            } catch (error) {
                ret.success = false;
                ret.errorMsg = error.message;
            }
        }
    },
    mutations: {
        updateIntro(state, value) {
            state.where = value
        },
        updateAuthModal(state, value) {
            state.authModal = value
        }
    }
});
