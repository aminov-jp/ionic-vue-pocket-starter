<template>
    <ion-page>
        <Suspense>

            <div class="ion-page">
                <ion-header>
                    <ion-toolbar color="primary">
                        <ion-buttons slot="start">
                            <ion-menu-button></ion-menu-button>
                        </ion-buttons>
                        <ion-title>Verification</ion-title>
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <!-- Signup form and buttons -->
                    <ion-grid>
                        <ion-row class="ion-margin-top">
                        </ion-row>
                        <ion-row>
                            <ion-col size-md="2" size="1">
                            </ion-col>
                            <ion-col size-md="8" size="10">
                                <ion-row class="ion-margin-top" v-if="!status">
                                    <ion-col>
                                        <!-- SUCCESS-->
                                        <ion-row class="ion-justify-content-center">
                                            <h2 class="ion-text-center ion-text-uppercase">
                                                <ion-text color="danger">Email validation failed</ion-text>
                                            </h2>
                                            <br />
                                        </ion-row>
                                        <ion-row class="ion-justify-content-center">
                                            <p>
                                                <IonText>
                                                    Email validation failed, the link is probably invalid or expired
                                                    please retry to signup or check your latest email
                                                </IonText>
                                            </p>
                                        </ion-row>
                                    </ion-col>
                                </ion-row>
                                <ion-row class="ion-margin-top" v-else>
                                    <ion-col>
                                        <!-- SUCCESS-->
                                        <ion-row class="ion-justify-content-center">
                                            <h2 class="ion-text-center ion-text-uppercase">
                                                <ion-text color="success">Email Validated</ion-text>
                                            </h2>
                                            <br />
                                        </ion-row>
                                        <ion-row class="ion-justify-content-center">
                                            <p>
                                                <IonText>
                                                    Email validation succeeded, you can now try to login
                                                </IonText>
                                            </p>
                                        </ion-row>
                                    </ion-col>
                                </ion-row>
                                <ion-row responsive-sm>
                                    <ion-col>
                                        <ion-button expand="block" router-link="/"
                                            router-direction="back">HOME</ion-button>
                                    </ion-col>
                                    <ion-col>
                                        <ion-button   v-if="!status" color="light" router-link="/auth/signup" router-direction="back"
                                            expand="block">Signup</ion-button>
                                            <ion-button   v-else color="light" router-link="/auth/login" router-direction="back"
                                            expand="block">Login</ion-button>
                                    </ion-col>
                                </ion-row>

                            </ion-col>
                            <ion-col size-md="2" size="1">
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-content>
            </div>
        </Suspense>
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
    margin-bottom: 0;
}
</style>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonIcon, IonPage, IonText, IonButtons, IonMenuButton, IonTitle, IonToolbar, IonHeader, IonRow, IonCol, IonContent, IonGrid, IonButton } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { authService } from '@/composables/auth.service';

export default defineComponent({
    name: 'AuthPage',
    components: { IonPage, IonText, IonButtons, IonMenuButton, IonTitle, IonToolbar, IonHeader, IonRow, IonCol, IonContent, IonGrid, IonButton },
    async setup() {
        const { confirmToken } = authService();
        const status = ref(false);
        const route = useRoute();
        let token = route.params.tok;

        if (await confirmToken(token.toString())) {
            status.value = true;
        } else {
            status.value = false;
        }
        return {
            status,
            IonPage,
            IonIcon,
            IonText,
            IonRow,
            IonCol,
            IonContent,
            IonGrid
        }
    }
});
</script>