<template>
<ion-page>
  <slot name="header"> </slot>
  <ion-content>
    <ion-searchbar   placeholder="Search Some Values" animated @input="search($event.target.value)" >

    </ion-searchbar>
    <ion-item-divider>Personas en tickk</ion-item-divider>

    <ion-list>
      <ion-item class="ion-no-padding"  v-for="(user, index) in friendsAdded" :key="index">
        <ion-avatar class="ion-margin">
          <ion-img v-if="user.photoUrl" :src="user.photoUrl"></ion-img>
          <ion-img v-else :src="require('../../assets/pnglogo.png')"></ion-img>
        </ion-avatar>
        <div class="ion-margin-horizontal">
          @{{user.username}}
          {{user.displayName}}
        </div>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-page>
</template>

<script>
import { ref} from "vue";
import {querySearchForUsernameOrDisplayName} from "@/firebase/users";
import { IonPage, IonContent,  IonList,IonAvatar, IonImg, } from '@ionic/vue';

export default {
  name: "AddFriends",
  components: {
   IonContent, IonPage, IonList, IonAvatar, IonImg, },
  setup() {
    const friendsAdded = ref([])
    let searchInput = ref('')
    const search = async (text) => {
      friendsAdded.value = await querySearchForUsernameOrDisplayName(text)
    }
    return {
      friendsAdded,
      search,
      searchInput
    }
  }
}
</script>

<style scoped>

</style>
