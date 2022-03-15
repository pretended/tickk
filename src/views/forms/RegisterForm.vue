<template>
  <ion-page >
    <ion-header translucent>
      <ion-toolbar >
        <ion-buttons slot="start">
          <ion-back-button text="" ></ion-back-button>
        </ion-buttons>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content >
      <v-form style="margin-top: 5vh" class="ion-padding-horizontal ion-margin-horizontal" @submit="onSubmit" :validation-schema="validation_schema">
        <ion-item class="ion-no-padding" >
          <ion-label >Email</ion-label>
          <v-field  name="email" v-slot="{field}">
          <ion-input name="email" v-bind="field" type="email"  inputmode="email" ></ion-input>
          </v-field>
        </ion-item>
        <v-error-message name="email" class="error"/>
        <ion-item class="ion-no-padding" >
          <ion-label >Password</ion-label>
          <v-field name="password" v-slot="{field}" >
            <ion-input name="password"  v-bind="field"  type="password" ></ion-input>
          </v-field>
        </ion-item>
        <v-error-message name="password" class="error"/>
        <ion-item class="ion-no-padding" >
          <ion-label>Usuario</ion-label>
          <v-field name="username" v-slot="{field}">
            <ion-input name="username" v-bind="field" type="text"  ></ion-input>
          </v-field>
        </ion-item>
        <v-error-message name="username" class="error"/>
        <ion-item class="ion-no-padding" >
          <ion-label>Nombre Completo</ion-label>
          <v-field name="displayName" v-slot="{field}">
            <ion-input name="displayName" v-bind="field" type="text"  ></ion-input>
          </v-field>
        </ion-item>
        <v-error-message name="displayName" class="error"/>


          <div class="ion-margin-top">
            <a class="forgot-password">Forgot password?</a>
          </div>

        <ion-button expand="block" mode="ios"  color="primary" class="btn-text ion-margin-top" type="submit">Registrarse</ion-button>

      </v-form>

    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  toastController,
} from "@ionic/vue";
import * as VeeValidate from 'vee-validate';
import * as yup from "yup";
import {useRouter, } from 'vue-router'
import {newUserWithEmailAndPassword} from "@/firebase/logic";
import {isUsernameAvailable} from "@/firebase/users";

export default {
  name: "RegisterForm",
  components: {IonPage, IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent,
    IonTitle, IonInput, IonItem, IonLabel,IonButton,
    VField: VeeValidate.Field, VForm: VeeValidate.Form, VErrorMessage: VeeValidate.ErrorMessage},
  data: () => ({
    isChecking: false,
  }),
  setup() {
    const router = useRouter()
    const validation_schema =
       yup.object({
         displayName: yup.string().required('Introduce tu nombre').max(15, "Maximo 15 characters"),
        email: yup.string().email('Email no valido').required('Introduce tu email'),
        username: yup.string().min(1, "Minimo 1 caracter")
            .max(15, "Maximo 15 characters").matches('^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$', 'Nombre de usuario no disponible').required('Introduce nombre de perfil'),
        password: yup.string().min(7, 'Contraseña demasiado corta - Min 7 caracteres').matches('(?=.*[A-Z])', 'Una letra en mayuscula').required('Introduce tu contraseña'),
      })
    const openToast = async (toastMsg) => {
      const toast = await toastController
          .create({
            message: toastMsg,
            duration: 4000
          })
      return toast.present();
    }
    const onSubmit = async (data) => {
      try {
        if (await isUsernameAvailable(data.username)) {
          await newUserWithEmailAndPassword(data.email, data.password, {
            username: data.username,
            displayName: data.displayName
          })
          await router.push('/app/friends' )
        } else {
          await openToast('Username is not available!')
        }
      }  catch (e) {
        console.log(e)
      }
    }
    return {
      validation_schema,
      onSubmit,
    }
  },
}
</script>

<style scoped>
.forgot-password {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.01em;
}
.error {
  color: #ff7575;
}
</style>
