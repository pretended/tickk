<template>
<TemplateModal title="Friend Requests" :modal-id="modalId">
  <ion-list v-if="friendRequests.length > 0">
    <ion-item class="ion-no-padding"  v-for="(user, index) in friendRequests" :key="index">

      <div style="display: flex; flex-direction: row">
        <ion-avatar class="ion-margin">
          <ion-img v-if="user.photoUrl" :src="user.photoUrl"></ion-img>
          <ion-img v-else :src="require('../assets/default_user.png')"></ion-img>
        </ion-avatar>
        <div class="ion-margin-vertical" >
          <div style="font-weight: 600;">{{user.displayName}}</div>
          <div>@{{user.username}}</div>
        </div>
      </div>
      <div slot="end">
        <ion-button @click="acceptFriendReq(user)">

          Accept</ion-button>
      </div>
    </ion-item>
  </ion-list>
</TemplateModal>
</template>

<script>
import TemplateModal from "@/components/TemplateModal";
import {acceptFriendRequest} from "@/firebase/users";
export default {
  name: "FriendRequestPage",
  components: {TemplateModal},
  props: {
    title: String,
    friendRequests: Array,
    modalId: String
  },
  setup() {
    const acceptFriendReq = async (user) => {
      const myUser = JSON.parse(localStorage.getItem('user'))
      return await acceptFriendRequest(myUser, user)
    }
    return {acceptFriendReq}
  }
}
</script>

<style scoped>

</style>
