<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script >
import {  onMounted } from 'vue';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, watch  } from 'vue';
import '@capacitor-community/camera-preview'
import {useStore} from "vuex";
export default defineComponent({
  name: 'App',
  setup() {
    onMounted(() => {
      GoogleAuth.initialize({
        scopes: ['profile', 'email'],
        forceCodeForRefreshToken: true,
        clientId:  '64359081462-hfk338vvanvdfgand8i9hgbmoon5c9r1.apps.googleusercontent.com'
      })
    });

    const store = useStore();
    watch(
        () => store.state.user,
        (state) => {
          localStorage.setItem('user', JSON.stringify(state));
        },
        { deep: true }
    );
  },
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>
