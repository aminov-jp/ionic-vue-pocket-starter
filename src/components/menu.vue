<template>
    <ion-menu menu-id="app-menu" content-id="main-content" type="overlay">
        <ion-header>
            <ion-toolbar>
                <ion-title>Welcome!</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label>Home</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>About</ion-label>
                </ion-item>
            </ion-list>
            <ion-item lines="none">
                <ion-button v-if="isAuth" class="logout-btn" slot="start" @click="signOut">
                    <ion-icon :icon="logOut" slot="end"></ion-icon>
                    Logout
                </ion-button>
            </ion-item>
        </ion-content>
    </ion-menu>
</template>
<style>
.error-popover {
    --background: rgba(218, 40, 40, 0.6);
}
.logout-btn {
    width:100%;
}
</style>

<script lang="ts">

import { IonMenu, IonHeader, IonContent, IonToolbar, IonTitle, IonItem, IonList, IonLabel, IonButton, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { logOut } from 'ionicons/icons';
import { authService } from '@/composables/auth.service';
import { computed } from '@vue/reactivity';

export default defineComponent({
    name: 'appMenu',
    components: { IonMenu, IonHeader, IonContent, IonToolbar, IonTitle, IonItem, IonList, IonLabel, IonButton, IonIcon },
    props: {
        message: String
    },
    setup() {
        const state = authService();
        const isAuth = computed(() => {
            console.log(state.valid.value)
            return state.valid.value;
        });
        const signOut = () => {
            console.log("Signout clicked")
            console.log(state.valid.value)
            state.logOut();
        };
        return {
            logOut,
            signOut,
            state,
            isAuth
        }
    }
});
</script>