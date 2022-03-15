<template>
  <TemplateBackPage title="Profile" :use-header="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">Profile</ion-title>
        <ion-buttons slot="end" @click="presentActionSheet">
          <ion-button  style="font-weight: 500"><ion-icon :icon="ellipsisHorizontal"></ion-icon> </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-grid v-if="!loading" class="ion-padding-horizontal " style="display: flex; flex-direction: column; ">
      <ion-row style="padding-top: 70px">
        <ion-col >
          <Avatar style="margin: auto" :src="user.photoUrl"></Avatar>
        </ion-col>
      </ion-row>
      <ion-row >
        <div class="ion-text-center" style="margin: auto">
          <div class="name ion-padding-top" >{{ user.displayName }}</div>
          <div class="username">@{{ user.username }}</div>
        </div>
      </ion-row>
      <ion-row style="padding-top: 40px">
        <div style="margin: auto;">
          🔗 <a style="font-weight: 600; color: inherit" >tickk.io/{{user.username}}</a>
        </div>
      </ion-row>
      <ion-row style="padding-top: 40px">
        <ion-button strong style="width: 100%" expand="block">Unfollow</ion-button>
      </ion-row>
    </ion-grid>
    <ion-grid v-else>
      <ion-loading></ion-loading>
    </ion-grid>
  </TemplateBackPage>
</template>

<script>
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import {getFromDB} from "@/firebase/logic";
import TemplateBackPage from "@/components/TemplateBackPage";
import Avatar from "@/components/Avatar";
import {IonGrid, IonRow, IonCol, IonLoading, IonIcon, IonButtons, actionSheetController, IonButton, IonTitle, IonToolbar, IonHeader,} from "@ionic/vue";
import {ellipsisHorizontal, close,  trash, share, copy } from 'ionicons/icons';
export default {
  name: "UserProfile",
  components: {Avatar, TemplateBackPage, IonGrid, IonRow, IonCol, IonLoading, IonIcon, IonButtons, IonButton, IonTitle, IonToolbar, IonHeader },
  setup() {
    const route = useRoute();
    const user = ref({})
    const loading = ref(false)
    onBeforeMount(async () => {
      loading.value = true
      const username = route.params.username;
      const usernameId = (await  getFromDB('usernames', username))[username];
      user.value = (await getFromDB('users', usernameId))
      loading.value =false;
    })
    const presentActionSheet = async () => {
      const actionSheet = await actionSheetController
          .create({
            header: user.value.username ? user.value.username : '',
            cssClass: 'my-custom-class',
            buttons: [
              {
                text: 'Delete',
                role: 'destructive',
                icon: trash,
                id: 'delete-button',
                data: {
                  type: 'delete'
                },
                handler: () => {
                  // remove friend
                  console.log('Delete clicked')
                },
              },
              {
                text: 'Copy Profile URL',
                icon: copy,
                handler: () => {
                  console.log('copy clicked')
                },
              },
              {
                text: 'Share profile',
                icon: share,
                handler: () => {
                  console.log('Share clicked')
                },
              },
              {
                text: 'Close',
                icon: close,
                role: 'cancel',
                handler: () => {
                  console.log('Close clicked')
                },
              },
            ],
          });
      await actionSheet.present();

      const { role, data } = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role and data', role, data);
    }
    return {user, loading, ellipsisHorizontal, presentActionSheet}
  }
}
</script>

<style scoped>
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
</style>
