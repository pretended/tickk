<template>
  <ion-page >
    <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="" ></ion-back-button>
        </ion-buttons>
        <ion-title>Sign up</ion-title>
      </ion-toolbar>
    <ion-content >
      <v-form @submit="onSubmit" :validation-schema="validation_schema">
      <ion-grid  class="ion-padding-horizontal">
        <ion-row>

            <ion-text class="title" >
              Crea tu cuenta en tickk!
            </ion-text>
        </ion-row>
    <ion-row>
      <ion-text class="ion-padding-top">
        Para seguir usando tickk, confirma estos detalles.
      </ion-text>
    </ion-row>

          <ion-row>    <ion-item class="ion-no-padding ion-padding-top" >
            <ion-label>Usuario</ion-label>
            <v-field name="username" v-slot="{field}">
              <ion-input name="username" v-bind="field" type="text"  ></ion-input>
            </v-field>
          </ion-item>
            <v-error-message name="username" class="error"/>
          </ion-row>

      </ion-grid>
        <ion-button expand="block" mode="ios"  color="primary" class="btn-text ion-margin-horizontal ion-margin-top" type="submit">Continuar</ion-button>

      </v-form>

    </ion-content>
  </ion-page>
</template>

<script>
import {IonContent, IonPage, IonText,  IonTitle, IonBackButton, IonToolbar, IonButtons, IonGrid, IonRow,IonInput, IonButton,IonItem, IonLabel } from "@ionic/vue";
import * as yup from "yup";
import {isUsernameAvailable} from "@/firebase/users";
import * as VeeValidate from "vee-validate";
import { updateUsername, writeDB} from "@/firebase/logic";
import {useRouter} from "vue-router";

export default {
  name: "RegisterUsername",
  components: {IonContent, IonPage, IonText, IonTitle, IonBackButton, IonToolbar,IonButtons, IonGrid, IonRow,IonInput, IonButton, IonItem, IonLabel,
    VField: VeeValidate.Field, VForm: VeeValidate.Form, VErrorMessage: VeeValidate.ErrorMessage},
  setup() {
    const router = useRouter()
    const validation_schema =
        yup.object({
          username: yup.string().min(1, "Minimo 1 caracter")
              .max(15, "Maximo 15 caracteres").matches('^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$', 'Nombre de usuario no disponible').required('Introduce nombre de perfil').test('username', 'Usuario no disponible', async (username) => await isUsernameAvailable(username)),
        })
    const localStorageUser = localStorage.getItem('user')
    const onSubmit = async (data) => {
      try {
          console.log(localStorageUser)
          const userUId = JSON.parse(localStorageUser).uid
          await updateUsername(data.username, userUId )
          const user = await writeDB('users', userUId, {username: data.username}, {merge: true}, true )
          localStorage.setItem('user', JSON.stringify(user))
          await router.push('/app/friends')
      }  catch (e) {
        console.log(e)
      }
    }
    return {
      onSubmit,
      validation_schema
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 27px;
  line-height: 33px;
  text-align: center;
  letter-spacing: -0.07em;
  font-feature-settings: 'ordn' on;
  padding-top: 5vh;
  color: #000000;


}
.error {
  color: #ff7575;
}
</style>
