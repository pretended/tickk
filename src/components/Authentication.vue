<template>
  <ion-content class="ion-padding">
    <ion-segment :value="where" v-model="where" >
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
       <div class="ion-margin-top ion-align-self-start" v-if="isIOS">
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
</template>

<script>
import {getPlatforms, IonButton, IonContent, IonIcon, IonLabel, IonSegment, IonSegmentButton,} from '@ionic/vue';
import {mailOutline} from "ionicons/icons";
import {newUserWithGoogleSignIn} from "@/firebase/logic";

export default {
  name: "AuthenticationPage",
  components: {IonContent,  IonSegment, IonSegmentButton, IonLabel, IonButton, IonIcon, },

  setup () {
  return {
    mailOutline,
  }

},
  methods: {
    async authUser(mode) {
      try {

        if (this.isReturning) {
          if (mode === 'apple') {
            // todo contine with apple
          } else if (mode === 'google') {
            let isRegistered = await newUserWithGoogleSignIn()
            console.log(isRegistered)
            isRegistered ? await this.$router.push('/app/friends') : await this.$router.push('/register-username')
          } else if (mode === 'email') {
            await this.$router.push('/login')
          }
        } else {
          if (mode === 'apple') {
            // todo contine with apple
          } else if (mode === 'google') {
            let isRegistered = await newUserWithGoogleSignIn()
            isRegistered ? await this.$router.push('/app/friends') : await this.$router.push('/register-username')
          } else if (mode === 'email') {
            await this.$router.push('/register')
          }
        }
      } catch (e) {
        console.error(e);

      } finally {
        this.$store.commit('updateAuthModal', false)
      }

    }
  },
  computed: {
    where : {
      get() {
        return this.$store.state.where;
      },
      set(value) {
        this.$store.commit('updateIntro', value)
      }
    },
    isIOS () {
      return getPlatforms().includes('ios') || getPlatforms().includes('iphone')
    },
    isReturning () {
      return this.where === 'returning'
    }
  }

}
</script>

<style scoped>
.header {
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 33px;
  padding-top: 25px;

  letter-spacing: -0.08em;
  font-feature-settings: 'ordn' on;

  color: #000000;
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
.btn {

}
</style>
