<template>
    <ion-page>
        <div class="ion-page">
            <app-header title="Change Password"></app-header>
            <ion-content>
                <!-- Signup form and buttons -->
                <ion-grid>
                    <ion-row class="ion-margin-top">
                        <ion-alert :is-open="success" header="Alert" sub-header="Important message" class="my-alert"
                            message="This is an alert!" :buttons="['OK']" @didDismiss="closeSuccessMessage"></ion-alert>
                    </ion-row>
                    <ion-row>
                        <ion-col size-md="2" size="1">
                            <ion-popover :is-open="resetPopOpen" :event="restePopEvent" class="error-popover"
                                @didDismiss="resetPopOpen = false" side="top" alignment="center">
                                <PopOver :message="submittionError"></PopOver>
                            </ion-popover>
                        </ion-col>
                        <ion-col size-md="8" size="10">
                            <div>
                                <form novalidate>
                                    <ion-list>
                                        <ion-item fill="solid">
                                            <ion-label position="floating">Password</ion-label>
                                            <ion-input v-model="password" name="password" type="password"
                                                required></ion-input>
                                        </ion-item>
                                        <ion-item fill="solid">
                                            <ion-label position="floating">Confirm Password</ion-label>
                                            <ion-input v-model="password2" name="password2" type="password"
                                                required></ion-input>
                                            <ion-note v-show="!passwordValid && submitted" color="danger">Enter Valid
                                                Password</ion-note>
                                        </ion-item>
                                    </ion-list>
                                    <ion-row class="ion-margin-top">
                                    </ion-row>
                                    <ion-row responsive-sm>
                                        <ion-col>
                                            <ion-button expand="block" @click="changePassword">Change Password</ion-button>
                                        </ion-col>
                                    </ion-row>
                                </form>
                            </div>
                            <ion-row>
                                <ion-col align-self-center>
                                    <span class="divider line one-line">or</span>
                                    <ion-button router-link="/auth/login" router-direction="back" expand="block"
                                        color="warning">Log In</ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                        <ion-col size-md="2" size="1">
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-content>
        </div>
    </ion-page>
</template>
  
<style scoped>
.login-logo {
    padding: 20px 0;
    min-height: 200px;
    text-align: center;
}

.login-logo img {
    max-width: 150px;
}

.list {
    margin-bottom: 5px;
}

.already {
    display: block;
    text-align: center;
    padding-bottom: 10px;
}
</style>

  
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter , useRoute } from 'vue-router';
import { inputValidation } from '@/composables/validation.service';
import { alertService } from '@/composables/alert.service';
import { authService } from '@/composables/auth.service';
import appHeader from '@/components/header.vue';
import {
    IonAlert, IonInput, IonText, IonNote, IonItem, IonButtons, IonTitle, IonRow, IonCol, IonContent, IonGrid, IonButton, IonLabel, IonList,
    IonMenuButton, IonPopover, IonPage
} from '@ionic/vue';
import PopOver from '../components/popover.vue';
export default defineComponent({
    name: 'ChangePassPage',
    components: {
        IonInput, IonLabel, IonNote, IonList,
        IonGrid, IonButton,
        IonRow, IonCol, IonItem, IonContent,
        PopOver, IonPopover, IonPage, IonAlert,appHeader
    },
    setup() {
        let username = ref('');
        let password = ref('');
        let password2 = ref('');
        let submitted = ref(false);
        const success = ref(false);
        let resetPopOpen = ref(false);
        let restePopEvent = ref<Event>();
        const submittionError = "Error, something went wrong, link maybe expired";
        const { validatePassword } = inputValidation();
        const { applyReset } = authService();
        const { createAlertInfo } = alertService();
        const router = useRouter();
        const route = useRoute();
        let token = route.params.tok;
        const closeSuccessMessage = () => {
            success.value = false;
            router.push('/auth/login');
        }
        /**
         * password validation
         */
        const passwordValid = computed(() => {
            return validatePassword(password.value, password2.value)
        });
        /**
         * Create user method
         */
        const changePassword = async (ev: Event) => {
            /** Check if inputs are valid or not */
            if (!passwordValid.value) {
                submitted.value = true;
                return;
            }
            /** Perform signup */
            const result = await applyReset(token.toString(), password.value);
            if (!result) {
                restePopEvent.value = ev;
                resetPopOpen.value = true;
                return;
            }
            /** alert and redirect in case of success */
            createAlertInfo("Password Changed", "You will be redirected to login page").then(() => {
                closeSuccessMessage();
            })
            return;
        };
        return {
            success,
            username,
            password,
            password2,
            submitted,
            passwordValid,
            submittionError,
            resetPopOpen,
            restePopEvent,
            closeSuccessMessage,
            changePassword,
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
            IonPopover,
            IonPage,
            IonAlert,
            PopOver,
            appHeader
        }
    }
});
</script>