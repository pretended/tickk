<template>
<ion-page>
  <slot name="header"> </slot>
  <ion-content>
    <ion-searchbar   placeholder="Buscar" animated @input="search($event.target.value)" >
    </ion-searchbar>
    <ion-item-divider>Personas en tickk</ion-item-divider>

    <ion-list v-if="friendsToAdded.length > 0">
      <ion-item class="ion-no-padding"  v-for="(user, index) in friendsToAdded" :key="index">

       <div style="display: flex; flex-direction: row">
         <ion-avatar class="ion-margin">
           <ion-img v-if="user.photoUrl" :src="user.photoUrl"></ion-img>
           <ion-img v-else :src="require('../../assets/pnglogo.png')"></ion-img>
         </ion-avatar>
         <div class="ion-margin-vertical" >
           <div style="font-weight: 600;">{{user.displayName}}</div>
           <div>@{{user.username}}</div>
         </div>
       </div>
        <div slot="end">
          <ion-button @click="sendFriendRe(user)">
            <ion-icon  slot="start" :icon="addOutline" ></ion-icon>
            Add</ion-button>
        </div>
      </ion-item>
    </ion-list>

  </ion-content>
</ion-page>
</template>

<script>
import { ref} from "vue";
import {querySearchForUsernameOrDisplayName, sendFriendRequest} from "@/firebase/users";
import { IonPage, IonContent,  IonList,IonAvatar, IonImg, IonSearchbar, IonItemDivider, IonItem, IonIcon, IonButton, } from '@ionic/vue';
import {addOutline} from "ionicons/icons";
import {useStore} from "vuex";
export default {
  name: "AddFriends",
  components: {
   IonContent, IonPage, IonItem, IonList, IonAvatar, IonImg, IonSearchbar, IonItemDivider, IonIcon, IonButton,},
  setup() {
    const friendsToAdded = ref([])
    let searchInput = ref('')
    const store = useStore();
    const sendFriendRe = async (userInfo) => {
      try {
        const user = store.state.user;
        await sendFriendRequest(user, userInfo.uid)
      } catch (e) {
        console.warn(e)
      }
    }
    const search = async (text) => {
      // delete yourself from list and change add for sent or a cross to delete a friend from my list
      friendsToAdded.value = await querySearchForUsernameOrDisplayName(text)
    }
    return {
      sendFriendRe,
      addOutline,
      friendsToAdded,
      search,
      searchInput
    }
  }
}
</script>

<style scoped>

</style>
