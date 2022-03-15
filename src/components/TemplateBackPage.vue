<template>
  <ion-page>
    <ion-header :translucent="true" v-if="useHeader">
      <ion-toolbar >
        <ion-buttons slot="start">
          <ion-back-button text="" ></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <slot></slot>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent} from "@ionic/vue";

export default {
  name: "TemplateBackPage",
  components: {IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent},
  props: {
    title: {
      type: String,
      default: ''
    },
    useHeader: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>

</style>
