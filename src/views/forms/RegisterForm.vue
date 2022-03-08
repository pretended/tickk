<template>
  <ion-page style="max-width:1200px">
    <ion-header translucent>
      <ion-toolbar>
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
          <v-field name="email" v-slot="{field}" :rules="isRequired">
          <ion-input name="email" v-bind="field" type="email"  inputmode="email" ></ion-input>
          </v-field>
        </ion-item>
        <v-error-message name="email" class="error"/>
        <ion-item class="ion-no-padding" >
          <ion-label >Password</ion-label>
          <v-field name="password" v-slot="{field}" :rules="isRequired">
          <ion-input name="password"  v-bind="field"  type="password" ></ion-input>
          </v-field>
        </ion-item>
        <v-error-message name="password" class="error"/>

          <div class="ion-margin-top">
            <a class="forgot-password">Forgot password?</a>
          </div>

        <ion-button expand="block" mode="ios" color="primary" class="btn-text ion-margin-top" type="submit">Registrarse</ion-button>

        <!--        TODO BIRTHDAY COMPONENT -->
<!--        <ion-item class="ion-padding-horizontal" id="open-datetime-modal">-->
<!--          <ion-icon :icon="calendarOutline" slot="start" color="primary"></ion-icon>-->
<!--          <ion-label >Birthday</ion-label>-->
<!--          <ion-text slot="end">{{formattedStringDate}}</ion-text>-->
<!--        </ion-item>-->

      </v-form>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonInput, IonItem, IonLabel, IonButton} from "@ionic/vue";
import * as VeeValidate from 'vee-validate';
import * as yup from "yup";
import { auth } from "../../firebase/index";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useRouter, } from 'vue-router'
export default {
  name: "RegisterForm",
  // eslint-disable-next-line vue/no-unused-components
  components: {IonPage, IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent,
    IonTitle, IonInput, IonItem, IonLabel,IonButton,
    VField: VeeValidate.Field, VForm: VeeValidate.Form, VErrorMessage: VeeValidate.ErrorMessage},
  data: () => {
    const schema = yup.object({
      email: yup.string().required('Necesito tu email').email('Email no valido'),
      password: yup.string().required('Necesito tu contraseña').min(7, 'Contraseña demasiado corta - Min 7 caracteres').matches('(?=.*[A-Z])', 'Una letra en mayuscula'),
      //TODO CHECK
      // passwordConfirmation: Yup.string()
      //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
    return {
      validation_schema: schema
    }
  },
  setup() {
    const router = useRouter()
    const onSubmit = async (data) => {
      try {
        const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
        console.log(res)
        await router.push('/tabs/tab1' )
      }  catch (e) {
        console.log(e)
      }
    }
    const isRequired = (value) => {
      if (!value) return "This field is required."
      return true;
    }
    return {
      onSubmit,
      isRequired
    }
  }
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
