<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="friends" href="/app/friends">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>Friends</ion-label>
        </ion-tab-button>


        <ion-tab-button tab="groups" href="/app/groups">
          <ion-icon :icon="peopleCircleOutline" />
          <ion-label>Groups</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="camera" href="/camera">
          <ion-icon :icon="cameraOutline" />
          <ion-label>Camera</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tick" >
          <ion-icon :icon="cogOutline" />
          <ion-label>tickk</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="settings" href="/app/settings">
          <ion-icon :icon="cogOutline" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script >
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { personCircleOutline, peopleCircleOutline, cogOutline, cameraOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      personCircleOutline,
      cogOutline,
      peopleCircleOutline,
      cameraOutline
    }
  }
});
</script>
