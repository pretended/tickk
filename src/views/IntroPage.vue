<template>
  <ion-page>

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
                :is-open="introModalRef"
                :breakpoints="[0.1, 0.5, 1]"
                :initialBreakpoint="0.5"
                :scrollable="true"
            >
              <ion-content class="ion-padding">
                <ion-segment :value="segment" @ionChange="segmentChanged($event)" >
                  <ion-segment-button value="new" >
                    <ion-label>New</ion-label>

                  </ion-segment-button>
                  <ion-segment-button value="returning">
                    <ion-label>Returning</ion-label>
                  </ion-segment-button>

                </ion-segment>

                <div>
                  <div >
                    <div class="header">
                      {{ isReturning ? 'Sign In' : 'Sign up' }} for tickk
                    </div>
                    <div class="semi-header">
                      {{ isReturning ? 'Welcome back!' : 'Create a free account to share your memories with your friends.' }}
                    </div>
                    <div class="ion-margin-top ion-align-self-start" v-if="isIos">
                      <ion-button   @click="authUser('apple')" color="dark" expand="block" fill="solid"><img  class="logo_apple ion-margin-end" :src="require('../../src/assets/apple_logo_png.png')" alt="logoApple"/>{{isReturning ? 'Sign In' : 'Continue'}} with Apple</ion-button>
                    </div>
                    <div class="ion-margin-top">
                      <ion-button  @click="authUser('google')" color="light" expand="block" fill="solid"><img class="logo_google ion-margin-end" :src="require('../../src/assets/google_logo.png')" alt="logoGoogle"/>{{isReturning ? 'Sign In' : 'Continue'}} with Google</ion-button>
                    </div>
                    <div class="ion-margin-top">
                      <ion-button @click="authUser('email')" color="secondary" expand="block" fill="solid"><ion-icon :icon="mailOutline" class="ion-margin-end"></ion-icon>{{isReturning ? 'Sign In' : 'Continue'}} with Email</ion-button>
                    </div>
                  </div>

                </div>
              </ion-content>
            </ion-modal>
          </ion-row>
        </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonRow, IonPage, IonContent, IonGrid, IonImg, IonButton, IonModal, getPlatforms, IonSegment, IonSegmentButton, IonLabel, IonIcon, } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import {mailOutline} from "ionicons/icons";
import {newUserWithGoogleSignIn} from "@/firebase/logic";
import {useRouter} from "vue-router";
export default  defineComponent({
  name: "IntroPage",
  components: { IonContent, IonPage, IonRow,  IonGrid, IonImg,IonButton,IonModal, IonSegment, IonSegmentButton, IonLabel, IonIcon,},
  setup() {
    const isReturning = ref(false);
    const router = useRouter();
    const authUser = async (mode) => {
      try {
        if (isReturning.value) {
          if (mode === 'apple') {
            // todo contine with apple
          } else if (mode === 'google') {
            let hasUsername = await newUserWithGoogleSignIn()
            hasUsername ? await router.push('/app/friends') : await router.push('/register-username')
          } else if (mode === 'email') {
            await this.$router.push('/login')
          }
        } else {
          if (mode === 'apple') {
            // todo contine with apple
          } else if (mode === 'google') {
            let hasUsername = await newUserWithGoogleSignIn()
            hasUsername ? await router.push('/app/friends') : await router.push('/register-username')

          } else if (mode === 'email') {
            await router.push('/register')
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setOpen(false, 'new')
      }
    }
    const segment = ref('')
    const introModalRef = ref(false);
    const segmentChanged = async (event) => {
      segment.value = event.detail.value;
      isReturning.value = event.detail.value === 'returning';
    }
    const setOpen = (state, where) => {
      introModalRef.value = state
      segment.value = where
      isReturning.value = where === 'returning'
    };
    return {setOpen, introModalRef, segmentChanged, segment, isReturning, authUser,
    isIos: getPlatforms().includes('ios') || getPlatforms().includes('iphone'),
      mailOutline
    }
  },
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

.logo_apple {
  height: 50px;
}
.logo_google {
  height: 25px;
  width: 25px;
}
.semi-header {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  padding-top: 10px;
  letter-spacing: -0.1em;
  color: #969696;
}

</style>
