<template>
<ion-avatar :style="imgAvatarStyle" v-if="loaded">
  <ion-img :src="src" @onIonImgDidLoad="avatarLoaded"></ion-img>
</ion-avatar>
  <ion-skeleton-text animated v-else :style="skeletonTextStyle"></ion-skeleton-text>
</template>

<script>
import {IonImg, IonAvatar, IonSkeletonText} from "@ionic/vue";
import {ref} from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Avatar",
  components: {IonImg, IonAvatar, IonSkeletonText},
  setup() {
    const loaded = ref(true)
    const avatarLoaded = () => {
      console.log('FULLY LOADED')
      loaded.value = true;
    }
    return {avatarLoaded, loaded};
  },
  props: {
    src: [String, null, undefined],
    width: {
      type: [Number, String],
      default: 125
    },
    height:  {
      type: [Number, String],
      default: 125
    },
  },
  computed: {
    imgAvatarStyle () {
      return 'width: ' + this.width + 'px; height: ' + this.height + 'px'
    },
    skeletonTextStyle() {
      return 'width: ' + this.width + 'px; height: ' + this.height + 'px; border-radius: 50%'
    }
  }
}
</script>

<style scoped>

</style>
