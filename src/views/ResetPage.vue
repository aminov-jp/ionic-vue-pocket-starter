<template>
    <ion-page>
        <div class="ion-page">
            <app-header title="Reset Password"></app-header>
            <ion-content>
                <form novalidate>
                    <ion-grid>
                        <ion-row class="ion-margin-top">
                        </ion-row>
                        <ion-row>
                            <ion-col size-md="2" size="1">
                            </ion-col>
                            <ion-col size-md="8" size="10">
                                <div>
                                    <form novalidate>
                                        <ion-list>
                                            <ion-item fill="solid">
                                                <ion-label position="floating">Email</ion-label>
                                                <ion-input type="email" v-model="email" :value="email" name="email"
                                                    required></ion-input>
                                                <ion-note v-show="!emailValid && submitted" color="danger">Invalid
                                                    email</ion-note>
                                            </ion-item>
                                        </ion-list>
                                        <ion-row class="ion-margin-top">
                                        </ion-row>
                                        <ion-row responsive-sm>
                                            <ion-col>
                                                <ion-button expand="block" @click="resetRequest">Reset</ion-button>
                                            </ion-col>
                                        </ion-row>
                                    </form>
                                </div>
                                <ion-row>
                                    <ion-col align-self-center>
                                        <span class="divider line one-line">or</span>
                                        <span class="already">Back to Login ?</span>
                                        <ion-button router-link="/auth/login" router-direction="back" expand="block"
                                            color="warning">Login</ion-button>
                                    </ion-col>
                                </ion-row>
                            </ion-col>
                            <ion-col size-md="2" size="1">
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </form>
            </ion-content>
        </div>
    </ion-page>
</template>
<style scoped>

.already {
    display: block;
    text-align: center;
    padding-bottom: 10px;
}
</style>
  
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { inputValidation } from '@/composables/validation.service';
import { authService } from '@/composables/auth.service';
import { alertService } from '@/composables/alert.service';
import appHeader from '@/components/header.vue';
import {
    IonInput, IonText, IonNote, IonItem, IonButtons, IonTitle, IonRow, IonCol, IonContent, IonGrid, IonButton, IonLabel, IonList,
    IonMenuButton, IonPage
} from '@ionic/vue';
export default defineComponent({
    name: 'ResetPage',
    components: {
        IonInput, IonLabel, IonNote, IonList, IonGrid, IonButton,
        IonRow, IonCol, IonItem, IonContent, IonPage,
        appHeader

    },
    setup() {
        const email = ref('')
        const password = ref('')
        const submitted = ref(false)
        const { validateEmail } = inputValidation();
        const { reset } = authService();
        const { createAlertInfo } = alertService();
        const router = useRouter();

        /**
        * Email validation method
        */
        const emailValid = computed(() => {
            return validateEmail(email.value);
        });
        /**
         * Login method
         */
        const resetRequest = async () => {
            /** Check if inputs are valid or not */
            if ( !emailValid.value) {
                submitted.value = true;
                return;
            }
            /** If valid input try to login */
            try {
                await reset(email.value);
                await createAlertInfo("Request Sent", "An email has been sent to "+email.value);
            } catch (error) {
                /**Show to the user that login failed and close */
                await createAlertInfo("Request failed", "Please verify email");
            }
        };
        return {
            email,
            password,
            submitted,
            emailValid,
            resetRequest,
            IonInput,
            IonText,
            IonGrid,
            IonNote,
            IonItem,
            IonRow,
            IonContent,
            IonButtons,
            IonMenuButton,
            IonTitle,
            IonButton,
            IonPage,
            appHeader
        }
    }
});
</script>