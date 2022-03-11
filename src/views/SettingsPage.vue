<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title >My Profile</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <ion-grid class="grid" >
            <ion-row @click="() => this.$router.push('/app/edit-account')">
              <ion-col size="4">
                <UserAvatar></UserAvatar>
              </ion-col>
              <ion-col size="1">

              </ion-col>
              <ion-col size="6" class="ion-padding-top">
                <div>
                  <div class="name">{{ user.displayName }}</div>
                  <div class="username">@{{ user.username }}</div>
                </div>
              </ion-col>
              <ion-col size="1" class="ion-text-center" style="margin: auto">
                <ion-icon color="medium"  :icon="createOutline"></ion-icon>
              </ion-col>
            </ion-row>
          <ion-row style="padding-top: 20px">
            <div class="settings_title" >
              My account
            </div>

          </ion-row>
          <ion-row>
            no hya nada :)
          </ion-row>
        </ion-grid>
        <div style=" width: 90%;">
          <ion-button expand="block"  @click="signOut" >
            Cerrar sesion
          </ion-button>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonCol, IonGrid,  IonRow,IonButton, IonIcon,  } from '@ionic/vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed} from "vue";
import {GoogleSignOut} from "@/firebase/logic";
import {createOutline} from "ionicons/icons";
import UserAvatar from "@/components/users/UserAvatar";
export default defineComponent({
  name: 'SettingsPage',
  components: {UserAvatar,  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonGrid, IonRow,IonButton, IonIcon, },

  setup() {
    const store = useStore()
    const router = useRouter()
    const signOut = async () => {
      const user = store.state.user;
      store.commit('setUser', null)
      user.googleLogin ? await GoogleSignOut() : ''
      await router.push('/')
    }
    return {
      signOut,
      user: computed(() => store.state.user),
      createOutline,
    }
  }
});
</script>

<style scoped>
#container {
  display: flex;
  padding-top: 2vh;
  align-items: center;
  flex-direction: column;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

.grid {
width: 90%;
}

.name {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: -0.04em;
}
.username {
  font-weight: 500;
  font-size: 14px;
  color: #9A9A9A;

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
.settings_title {
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 17px;
  /* identical to box height */
  letter-spacing: -0.08em;

  color: #C1C1C1;


}
</style>
