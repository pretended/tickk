<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button  @click="dismissModal" style="font-weight: 600"> Close </ion-button>
      </ion-buttons>

      <ion-title >{{title}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <slot></slot>
  </ion-content>
</ion-page>
</template>

<script>
import {
  IonButton,
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, modalController,
} from "@ionic/vue";

export default {
  name: "TemplateModal",
  props: {
    title: {
      default : '',
      type: String
    },
    modalId: String
  },
  components: {    IonPage, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons},
  setup(props) {
    const dismissModal = async () => {
      await modalController.dismiss(undefined, undefined, props.modalId)

    }
    return {
      dismissModal
    }
  }
}
</script>

<style scoped>

</style>
