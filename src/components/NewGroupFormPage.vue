<template>
<TemplateModal :title="title" :modal-id="modalId">
<v-form class="ion-padding" @submit="onSubmit" :validation-schema="validation_schema">
  <ion-item style="  font-weight: 600" size="small" class="ion-no-padding">
    <ion-label position="floating"   clear-input  >
      Group Name
    </ion-label>
    <v-field name="groupName" v-slot="{field}">
    <ion-input   name="groupName" v-bind="field"    autofocus>
    </ion-input>
    </v-field>
  </ion-item>
  <v-error-message name="groupName" class="error"/>
 <div style="margin-top: 30px; ">
   <ion-label style="font-weight: 600; ">Reveal Date *</ion-label>
   <v-field name="revealDate" v-slot="{field}">
   <ion-datetime
       style="margin-top: 10px;"
       :min="getMinDate" :max="getMaxDate" presentation="date-time"
       @ionChange="(ev) => dateChanged(ev)"
       :value="getCustomDateTime" v-bind="field"
       minute-values="0,15,30,45"
   />
   </v-field>
   <v-error-message name="revealDate" class="error"/>
 </div>
  <ion-text style="font-weight: 600"><small> * Una vez elegida la fecha de revelacion, no podras cambiarla.</small></ion-text>

  <ion-button expand="block" strong style="margin-top: 20px" type="submit">Submit</ion-button>
</v-form>
</TemplateModal>
</template>

<script>
import TemplateModal from "@/components/TemplateModal";
import {IonItem, IonLabel, IonInput, IonDatetime, IonText, modalController} from "@ionic/vue";
import {ref, computed } from "vue";
import { calendar } from 'ionicons/icons';
import * as moment from "moment";
import * as yup from "yup";
import * as VeeValidate from "vee-validate";
import {createNewGroup} from "@/firebase/groups";
export default {
  name: "NewGroupFormPage",
  components: {TemplateModal, IonItem, IonLabel, IonInput, IonDatetime   ,IonText,
    VField: VeeValidate.Field, VForm: VeeValidate.Form, VErrorMessage: VeeValidate.ErrorMessage},
  props: {
    title: String,
    modalId: String
  },
  setup() {
    const validation_schema =
        yup.object({
          groupName: yup.string().min(1, "Minimo 1 caracter")
              .max(15, "Maximo 15 caracteres").required(),
          revealDate: yup.date().required()
        })
    const onSubmit = async (data) => {
      const user = JSON.parse(localStorage.getItem('user'))
      await createNewGroup(data.groupName, data.revealDate, user.uid);
      await modalController.dismiss(undefined, undefined, 'new-group-modal')
    }
    const parseDateMinMaxStr = (date) => date.toLocaleDateString().replaceAll('/', '-').split('-').reverse().map(date =>  date < 10 ? '0' + date : date).join('-');
    const tomorrow = new Date()
    const maxConstrain = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    maxConstrain.setDate(maxConstrain.getDate() + (7 * 4))

    const getMinDate = parseDateMinMaxStr(tomorrow)
    const customDatetime = ref(getMinDate);

    const getMaxDate = parseDateMinMaxStr(maxConstrain)
    const dateChanged = (value) => {
      customDatetime.value = value.detail.value
      console.log(customDatetime.value)
    };

    return {
      customDatetime,
      getCustomDateTime: computed(() => moment(new Date(customDatetime.value), ).format()),
      getMinDate,
      getMaxDate,
      dateChanged,
      calendar,
      validation_schema,
      onSubmit
    }
  },
}
</script>

<style scoped>
.error {
  color: #ff7575;
}
</style>
