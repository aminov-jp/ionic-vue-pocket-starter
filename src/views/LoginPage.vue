<template>
    <ion-page >
        <div class="ion-page">
            <app-header title="Login"></app-header>
            <ion-content>
                <form novalidate>
                    <ion-grid>
                        <ion-row class="ion-margin-top">
                        </ion-row>
                        <ion-row>
                            <ion-col size-md="2" size="1">
                            </ion-col>
                            <ion-col size-md="8" size="10"  class="app-form">
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
                                            <ion-item fill="solid">
                                                <ion-label position="floating">Password</ion-label>
                                                <ion-input v-model="password" name="password" type="password"
                                                    required></ion-input>
                                                <ion-note v-show="!passwordValid && submitted" color="danger">Enter
                                                    Valid
                                                    Password</ion-note>
                                            </ion-item>
                                        </ion-list>
                                        <ion-row class="ion-margin-top">
                                        </ion-row>
                                        <ion-row responsive-sm>
                                            <ion-col>
                                                <ion-button expand="block" @click="login">LOGIN</ion-button>
                                            </ion-col>
                                        </ion-row>
                                        <ion-row responsive-sm>
                                            <ion-col position="center">
                                                <router-link  to="/auth/reset">
                                                    <a>Forgot Password?</a>
                                                </router-link>
                                            </ion-col>
                                        </ion-row>
                                    </form>
                                </div>
                                <ion-row>
                                    <ion-col align-self-center>
                                        <span class="divider line one-line">or</span>
                                        <span class="already">Not registered, create account</span>
                                        <ion-button router-link="/auth/signup" router-direction="back" expand="block"
                                            color="warning">Sign up</ion-button>
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
    name: 'AuthPage',
    components: {
        IonInput, IonLabel, IonNote, IonList, IonGrid, IonButton,
        IonRow, IonCol, IonItem, IonContent, IonPage,
        appHeader

    },
    setup() {
        const email = ref('')
        const password = ref('')
        const submitted = ref(false)
        const { validateEmail, validatePassword } = inputValidation();
        const { signIn } = authService();
        const { createAlertInfo } = alertService();
        const router = useRouter();

        /**
        * Email validation method
        */
        const emailValid = computed(() => {
            return validateEmail(email.value);
        });
        /**
         * Password validation
         */
        const passwordValid = computed(() => {
            return validatePassword(password.value, password.value);
        });
        /**
         * Login method
         */
        const login = async () => {
            /** Check if inputs are valid or not */
            if (!passwordValid.value || !emailValid.value) {
                submitted.value = true;
                return;
            }
            /** If valid input try to login */
            try {
                await signIn(email.value, password.value);
                /** create an info popup and redirect to home page */
                createAlertInfo("Login Success", "You will be redirected to Home page").then(() => {
                    router.push('/home');
                })
            } catch (error) {
                /**Show to the user that login failed and close */
                await createAlertInfo("Login failed", "Please check your email or password");
            }
        };
        return {
            email,
            password,
            submitted,
            emailValid,
            passwordValid,
            login,
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