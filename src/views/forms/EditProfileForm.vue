<template>
<ion-page>
  <ion-header translucent>
    <ion-toolbar >
      <ion-buttons slot="start">
        <ion-back-button text="" ></ion-back-button>
      </ion-buttons>
      <ion-title>Edit Profile</ion-title>
      <ion-buttons slot="end">
        Save
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content fullscreen class="ion-padding">
      <UserAvatar style="margin-left: 25px;" :use-edit="true" @click="selectImage">

      </UserAvatar>
  <div class="ion-text-center">
    <div class="name ion-padding-top" >{{ user.displayName }}</div>
    <div class="username">@{{ user.username }}</div>
  </div>
  </ion-content>
</ion-page>
</template>

<script>
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, isPlatform} from "@ionic/vue";
import UserAvatar from "@/components/users/UserAvatar";
import {Camera,} from '@capacitor/camera';
import {storage} from "@/firebase";
import {ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {useStore} from "vuex";
import {Filesystem} from '@capacitor/filesystem';
import {writeDB} from "@/firebase/logic";

export default {
  name: "EditProfileForm",
  components: {UserAvatar, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent,},
  setup() {
    const store = useStore()

    const selectImage = async () => {

      const user = store.getters.getUser;
      // const checkPermissions = await Camera.checkPermissions();
      // console.log(checkPermissions)
      const image = await Camera.pickImages({
        presentationStyle: 'popover',
        limit: 1
      })
      const imgRef = await ref(storage, 'users/' + user.uid + '/profile_image.jpg' )

      const platform = isPlatform('hybrid')
      if (platform) {
        const data = (await Filesystem.readFile({
          path: image.photos[0].path
        })).data;
        // TODO FINSIH THIS
        console.log(data);
      } else {
        const response = await fetch(image.photos[0].webPath);
        const blob = await response.blob()
        await uploadBytes(imgRef, blob, {  contentType: 'image/jpeg'});
        const url = await getDownloadURL(imgRef);
        await writeDB('users', user.uid, {photoUrl: url}, {merge: true} )
        let newUserInfo = {...store.state.user};
        newUserInfo.photoUrl = url;
        store.commit('setUser', newUserInfo)
      }


    }
    return {
      selectImage
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
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
