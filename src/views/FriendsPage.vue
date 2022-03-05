<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>

        <ion-buttons slot="end">
          <ion-button> + Group </ion-button>
        </ion-buttons>
        <ion-title  style="font-weight: bold">Friends</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Friends</ion-title>
        </ion-toolbar>
      </ion-header>
    <FriendsContentPage/>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonButton, IonButtons } from '@ionic/vue';
import FriendsContentPage from "@/components/FriendsContentPage";
import {chevronDownCircleOutline} from "ionicons/icons";

export default  defineComponent({
  name: 'Tab1Page',
  components: {FriendsContentPage,  IonHeader, IonToolbar, IonTitle, IonContent, IonPage,  IonRefresher, IonRefresherContent, IonButton, IonButtons },
  setup() {
    const doRefresh = (event) => {
      console.log('Begin async operation');

      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
    return { chevronDownCircleOutline, doRefresh }
  }
});
</script>
