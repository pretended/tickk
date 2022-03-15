<template>
  <TemplateModal :title="group.groupName" :modal-id="modalId">
    <ion-grid  class="ion-padding-horizontal " style="display: flex; flex-direction: column; ">
        <ion-row>
          <ion-col v-for="(user, index) in group.infoUsers" :key="index">
            <Avatar :src="user.photoUrl"></Avatar>
          </ion-col>
        </ion-row>
    </ion-grid>
  </TemplateModal>
</template>

<script>
import {ellipsisHorizontal} from 'ionicons/icons';
import { IonGrid, IonRow, IonCol, } from "@ionic/vue";
import TemplateModal from "@/components/TemplateModal";
import Avatar from "@/components/Avatar";
export default {
  name: "GroupProfile",
  components: {Avatar, TemplateModal,  IonGrid, IonRow, IonCol, },
  props: {
    group: Object,
    modalId: String,
  },
  setup() {

    return { ellipsisHorizontal}
  }
}
</script>

<style scoped>

</style>
