<template>
  <ion-card  style="display: flex; flex-direction: row; justify-content: space-between " class="ion-padding ion-margin-vertical">
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

</template>

<script>
import {IonCardHeader, IonCard, IonAvatar, IonImg,  IonCardSubtitle, IonIcon, IonLabel} from "@ionic/vue";
import {chevronForwardOutline} from "ionicons/icons";

export default {
  name: "FriendCard",
  props: {
    friend: Object
  },
  components: {
    IonCard, IonAvatar, IonImg, IonCardHeader, IonCardSubtitle, IonIcon, IonLabel,
  },
  setup() {
    return {chevronForwardOutline};
  }
}
</script>

<style scoped>

</style>
