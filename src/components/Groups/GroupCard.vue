<template>
<ion-card @click="openGroupCardModal" class="card_color" style="padding-top: 15px; padding-bottom: 15px; padding-left: 15px;  display: flex; flex-direction: row; justify-content: space-between" >
    <div style=" display: flex; flex-direction: row">
      <div v-for="(user, index) in users" :key="user.uid">
        <Avatar v-if="index <= 1" :class="index === 1 ? 'avatar_abs' : ''" :height="50" :width="50" :src="user.photoUrl"></Avatar>
      </div>

      <div style="margin-left: 25px">
        <ion-text style="font-weight: bold">{{groupName}}</ion-text>
          <div style="display: flex; flex-direction: row">
            <div v-for="(user, index) in users" :key="index">@{{user.username}}</div>
          </div>

      </div>
    </div>
  <div :style="badgeCameraStyle ">
    <ion-icon size="small" :icon="cameraOutline"></ion-icon>
    <Badge v-if="isGroupOwner" style="margin-top:5px;" color="#CBFFDA" text="Owner" text-color="#00E132"></Badge>
  </div>
</ion-card>
</template>

<script>
import Avatar from "@/components/Avatar";
import {  cameraOutline } from 'ionicons/icons';
import {IonIcon, IonCard, IonText} from "@ionic/vue";
import Badge from "@/components/Badge";
export default {
  name: "GroupCard",
  components: {Badge, Avatar, IonIcon, IonCard, IonText},
  setup() {
    const openGroupCardModal = () => {

    }
    return {
      cameraOutline,
      openGroupCardModal
    }
  },
  props: {
    groupName: String,
    users: Array,
    created: [String, Date],
    reveal: [String, Date],
    creatorUId: String
  },
  computed: {
    isGroupOwner() {
      return this.creatorUId === JSON.parse(localStorage.getItem('user')).uid;
    },
    badgeCameraStyle() {
      return  this.isGroupOwner ?
          'display: flex; align-items: end; margin-right: 15px; flex-direction: column; justify-content: space-between;' : 'display: flex; align-items: center; margin-right: 15px;'

    }
  }
}
</script>

<style scoped>
.avatar_abs {
  position: absolute;
  top: 30px;
  left: 33px;
  border: 2px solid #ffffff;
}

</style>
