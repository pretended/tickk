<template>
  <ion-page>
    <ion-content class="my-custom-camera-preview-content" :fullscreen="true">
      <div id="cameraPreview" class="cameraPreview">
        <div v-if="cameraActive">
          <ion-button color="light" size="small" @click="stopCamera" fill="clear" class="image-overlay" id="closeCamera">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
          <ion-button color="light" size="small" @click="changeFlash" fill="clear" class="image-overlay" id="flashCamera">
            <ion-icon :icon="!this.flash ? flashOutline : flashOffOutline"></ion-icon>
          </ion-button>
          <ion-button  color="light" size="small" @click="flipCamera" fill="clear"  class="image-overlay" id="flipCamera">
            <ion-icon :icon="cameraReverseOutline"></ion-icon>
          </ion-button>
          <ion-button  color="light" size="small" @click="captureImage" fill="clear"  class="image-overlay" id="cameraCapture">
            <ion-icon slot="icon-only"  :icon="ellipseOutline"></ion-icon>
          </ion-button>
        </div>
      </div>
      <ion-img :src="image" v-if="image && !cameraActive"></ion-img>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonImg, IonButton, IonIcon} from '@ionic/vue';
import {
  closeOutline,
  ellipseOutline,
  flashOutline,
  flashOffOutline,
    cameraReverseOutline

} from 'ionicons/icons';
import {CameraPreview} from "@capacitor-community/camera-preview";

export default {
  name: "CameraPage",
  components: {IonContent, IonPage, IonImg, IonButton, IonIcon},
  data: () => {
    return {
      image: null,
      cameraActive: false,
      flash: false
    }
  },
  async mounted() {

   await this.openCamera()
  },

  methods: {
    async openCamera() {
      const cameraPreviewPictureOptions = {
        position: 'rear',
        height: window.screen.height,
        width: window.screen.width,
        parent: 'cameraPreview',
        className: 'cameraPreview'
      };
      await CameraPreview.start(cameraPreviewPictureOptions);
      this.cameraActive = true;
    },
    async stopCamera() {
    await  this.$router.back()
    },
    async flipCamera() {
      await CameraPreview.flip()
    },
    async captureImage() {
      const cameraPreviewPictureOptions= {
        quality: 100
      };
      const result = await CameraPreview.capture(cameraPreviewPictureOptions);
      const base64PictureData = result.value;
      this.image = base64PictureData;
    },
    async changeFlash() {
      this.flash = !this.flash

      const CameraPreviewFlashMode = {
        flashMode: this.flash ? 'off' : 'on'
      }
        await CameraPreview.setFlashMode(CameraPreviewFlashMode)
    }
  },
  computed: {
    getFlashMode() {
      console.log(CameraPreview.getSupportedFlashModes());
      return true;
    }
  },
  setup() {
    return {
      closeOutline,
      ellipseOutline,
      flashOutline,
      flashOffOutline,
      cameraReverseOutline
    }
  }
}
</script>

<style scoped>
.my-custom-camera-preview-content {
  --background: transparent;
}
#cameraPreview {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
}
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.image-overlay {
  z-index: 1;
  position: absolute;

  width: 50px;
  height: 50px;
}
#flashCamera {
  position: absolute;
  right: 1%;
  --ionicon-stroke-width:36px;

}
#flipCamera {
  position: absolute;
  bottom: 3%;
  right: 3%;
  --ionicon-stroke-width:46px;
}
#closeCamera {
  position: absolute;
  left: 1%;
  --ionicon-stroke-width:46px;
}
#cameraCapture {
  position: absolute;
  left: 50%;
  bottom: 3%;
  --ionicon-stroke-width:46px;
}
ion-icon {
  font-size: 64px;
  color: white;
}
</style>
