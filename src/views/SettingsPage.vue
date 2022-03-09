<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title >Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
      <ion-img style="height: 100px; width: 100px; border-radius: 50% !important;" :src="user.photoUrl"></ion-img>
        <p class="ion-color-primary">{{ user.displayName }}
          <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import {useStore} from "vuex";
import {computed} from "vue";

export default defineComponent({
  name: 'SettingsPage',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage },

  setup() {
    const store = useStore()

    return {
      // access a state in computed function
      user: computed(() => store.state.user),

    }
  }
});
</script>

<style scoped>
#container {
  display: flex;
  padding-top: 10vh;
  height: 100%;
  align-items: center;
  flex-direction: column;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
