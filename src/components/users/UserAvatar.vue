<template>
  <div style="display: flex; justify-content: center">
    <div>
      <ion-img  v-if="!!photoUrl" class="img_thumbnail" :src="photoUrl + '&' + + new Date().getTime()" />

      <ion-img v-else class="img_thumbnail"  :src="require('../../assets/default_user.png')" ></ion-img>
    </div>
    <div class="circle"  v-if="useEdit">
      <div class="edit_th" style="display: flex; justify-content: center; padding-top: 7px">
        <ion-icon color="light" :icon="camera"></ion-icon>
      </div>
    </div>
  </div>
</template>

<script>
import {IonImg, IonIcon} from "@ionic/vue";
import {camera} from "ionicons/icons";

export default {
  name: "UserAvatar",
  components: {IonImg, IonIcon},
  props: {
    useEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    photoUrl() {
      return JSON.parse(localStorage.getItem('user')).photoUrl
    }
  },
  setup() {
    return {
      camera
    }
  },

}
</script>

<style scoped>
.edit_th {
}
.circle {
  position: relative;
  height: 30px;
  width: 30px;
  right: 25px;
  top: 65px;
  background-color: mediumblue;
  border-radius: 50%;
}
.img_thumbnail {
  height: 100px; width: 100px; border-radius: 50% !important;   overflow: hidden;
}
</style>
