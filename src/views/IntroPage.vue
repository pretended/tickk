<template>
  <ion-page>
    <ion-header>

    </ion-header>
    <ion-content :fullscreen="true">
        <ion-grid style="height: 100%">
          <ion-row  style="display: flex; align-items: center; justify-content: center; height: 100%; margin-top: 4vh">
            <div style="display: flex; align-items: center; justify-content: center; width:100%;flex-direction: column">
              <ion-img class="image-logo"  :src="require('../../src/assets/pnglogo.png')"></ion-img>
              <div class="ion-padding">
                <div class="header">Comparte momentos especiales y revivelos más tarde</div>
                <div class="semi-header ion-margin-top">Revive whatever ipusme test test test test test test tes</div>
              </div>
            </div>
            <div class="ion-padding" style=" width:100%;">
              <ion-button expand="block" mode="ios" size="large" fill="solid" class=" btn-text" @click="setOpen(true, 'new')">Soy un nuevo usuario</ion-button>
              <ion-button expand="block"  size="large" mode="ios" color="light" class="btn-text ion-margin-top" @click="setOpen(true, 'returning')">Ya tengo una cuenta</ion-button>
            </div>
            <ion-modal
                css-class="my-custom-class"
                @didDismiss="setOpen(false, 'new')"
                :is-open="isOpen"
                :breakpoints="[0.1, 0.5, 1]"
                :initialBreakpoint="0.5"
                :scrollable="true"
            >
              <AuthenticationPage></AuthenticationPage>
            </ion-modal>
          </ion-row>
        </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {  IonRow,  IonPage, IonHeader,IonContent,  IonGrid, IonImg, IonButton, IonModal,} from '@ionic/vue';
import { defineComponent,  } from 'vue';
import AuthenticationPage from "@/components/Authentication";
export default  defineComponent({
  name: "IntroPage",
  components: {AuthenticationPage, IonHeader,IonContent, IonPage, IonRow,  IonGrid, IonImg,IonButton,IonModal },
  methods: {
    setOpen(state, w) {
      this.$store.commit('updateIntro', w)
      this.$store.commit('updateAuthModal', state)
    }
  },
  computed: {
    isOpen : {
      get() {
        return this.$store.state.authModal
      },
      set(value) {
        this.$store.commit('updateAuthModal', value)
      }
    }
  }

});
</script>

<style scoped>
.image-logo {
  width: 40vw;
  height:20vh;
}
.header {
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 33px;
  text-align: center;
  letter-spacing: -0.08em;
  font-feature-settings: 'ordn' on;

  color: #000000;

}
.semi-header {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.1em;
  color: #969696;
}
.btn-text {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */
  text-align: center;
  letter-spacing: -0.08em;
  color: #FFFFFF;
}
</style>
