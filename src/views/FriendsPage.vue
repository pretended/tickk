<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>

        <ion-buttons slot="end">
          <ion-button @click="setOpenModal(true)" style="font-weight: 600"> Add friends </ion-button>
        </ion-buttons>
        <ion-title  style="font-weight: bold">Friends</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Friends</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card v-if="friendRequestRef" color="light" style="box-shadow: none !important; display: flex; flex-direction: row; justify-content: space-between" class="ion-padding"  >
<div style="display: flex; flex-direction: row; padding-top: 5px;">
  <ion-avatar class="ion-margin-end" style="min-width: 64px !important;" >
    <ion-img :src="require('../assets/pnglogo.png')"></ion-img>
  </ion-avatar>
    <div>
      <ion-card-header class="ion-no-padding header_notification_friendrequest">
        Tienes peticiones de amistad! no de momento
      </ion-card-header>

      <ion-card-subtitle>
        <ion-text>aaaa + 2 mas</ion-text>
      </ion-card-subtitle>
    </div>

</div>
        <ion-card-subtitle style="display: flex; align-items: center;">
          <ion-icon size="small" :icon="chevronForwardOutline">

          </ion-icon>
        </ion-card-subtitle>
      </ion-card>
      <ion-list>
        <ion-card v-for="(friend, index) in friends" :key="index" style="display: flex; flex-direction: row; justify-content: space-between " class="ion-padding ion-margin-vertical">
         <div style="display: flex; flex-direction: row; padding-top: 5px;">
           <ion-avatar>
             <ion-img :src="friend.photoUrl"></ion-img>
           </ion-avatar>
           <ion-card-header class="ion-no-padding ion-margin-horizontal" style="display: flex; flex-direction: column; padding-top: 5px">
             <ion-label style="font-weight: bold">{{friend.displayName}}</ion-label>
             <ion-label >@{{friend.username}}</ion-label>
           </ion-card-header>
         </div>
          <ion-card-subtitle style="display: flex; align-items: center;">
            <ion-icon size="small" :icon="chevronForwardOutline">

            </ion-icon>
          </ion-card-subtitle>
        </ion-card>

      </ion-list>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-modal
          :is-open="addFriendsModalRef"
          @didDismiss="setOpenModal(false)"
          :presenting-element="$parent.$refs.ionRouterOutlet"
          :swipe-to-close="true"
      >
        <AddFriends>
          <template v-slot:header>
            <ion-header>
              <ion-toolbar>
                <ion-buttons slot="start">
                  <ion-button @click="setOpenModal(false)" style="font-weight: 600"> Close </ion-button>
                </ion-buttons>
                <ion-buttons slot="end">
                  <ion-button @click="setOpenModal(false)" style="font-weight: 600"> Save </ion-button>
                </ion-buttons>
                <ion-title >Add Friends</ion-title>
              </ion-toolbar>
            </ion-header>
          </template>
        </AddFriends>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonText, IonRefresherContent, IonButton, IonButtons, IonList, IonLabel, IonModal,IonAvatar, IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonIcon } from '@ionic/vue';
import {chevronDownCircleOutline, chevronForwardOutline} from "ionicons/icons";
import {useStore} from "vuex";
import {getFromDB} from "@/firebase/logic";
import AddFriends from "@/views/forms/AddFriends";

export default  defineComponent({
  name: 'Tab1Page',
  components: {
    AddFriends,
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage,  IonRefresher, IonRefresherContent,IonText, IonButton, IonButtons, IonList, IonLabel, IonModal,IonAvatar, IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonIcon  },

  setup() {
    const store = useStore()
    const addFriendsModalRef = ref(false);
    const friendRequestRef = ref(true);
    const setOpenModal = (state) => addFriendsModalRef.value = state;
    const getFriends = async () => await getFromDB('friends', store.state.user.uid)
    const friends = ref([])
    onMounted(async () => {
       friends.value = (await getFriends()).friends
    })
    const doRefresh = async (event) => {
      friends.value = (await getFriends(store.state.user.uid)).friends;
      event.target.complete();
    }
    return { chevronDownCircleOutline, doRefresh, friends, user: store.state.user, addFriendsModalRef, setOpenModal, chevronForwardOutline, friendRequestRef }
  }
});
</script>

<style scoped>
.header_notification_friendrequest {
  display: flex; flex-direction: column; padding-top: 5px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.05em;
}
</style>
