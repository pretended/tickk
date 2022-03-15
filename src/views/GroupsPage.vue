<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Groups</ion-title>
        <ion-buttons @click="newGroup" slot="end">
          <ion-button  style="font-weight: 600"> New Group </ion-button>
        </ion-buttons>
      </ion-toolbar>

    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Groups</ion-title>
        </ion-toolbar>
      </ion-header>
      <GroupCard @click="openGroupModal(group)" :creatorUId="group.creatorUId" :created="group.created" :group-name="group.groupName" :reveal="group.revealDate" :users="group.infoUsers" v-for="(group, index) in groups" :key="index"></GroupCard>
      <ion-refresher slot="fixed"  @ionRefresh="refreshContent($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
    </ion-content>
  </ion-page>
</template>

<script>
import {defineComponent, onBeforeMount, ref} from 'vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  modalController,
  IonButtons, IonButton
} from '@ionic/vue';
import {getGroupsByUId, getMultipleDocs} from "@/firebase/users";
import NewGroupFormPage from "@/components/NewGroupFormPage";
import GroupCard from "@/components/Groups/GroupCard";
import GroupProfile from "@/components/Groups/GroupProfile";

export default defineComponent({
  name: 'Tab2Page',
  components: {GroupCard, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonRefresherContent, IonRefresher, IonButtons, IonButton },
  setup() {
    const groups = ref([]);
    const reloadData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      groups.value = await getGroupsByUId(user.uid)
      for (const index in groups.value) {
        groups.value[index].infoUsers = await getMultipleDocs('users', 'uid', groups.value[index].users);
      }
    }
    onBeforeMount(async () => {
      await reloadData()
    })
    const newGroup = async () => {
      const modal = await modalController
          .create({
            component: NewGroupFormPage,
            componentProps: {
              title: 'Create a group',
              modalId: 'new-group-modal'
            },
            id:  'new-group-modal'
          })
      return modal.present();
    }
    const openGroupModal = async (group) => {
      const modal = await modalController
          .create({
            component: GroupProfile,
            componentProps: {
              group:  group,
              modalId: 'group-req-modal'
            },
            id: 'group-req-modal'
          })
      return modal.present();
    }
    const refreshContent = async (event) => {
      await reloadData()
      event.target.complete();
    }
    return {groups, refreshContent, newGroup, openGroupModal}
  }
});
</script>
