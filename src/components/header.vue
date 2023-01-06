<template>
    <ion-header :translucent="true">
        <ion-toolbar color="primary app-header">
        <ion-title>{{ title }}</ion-title>
            <ion-buttons slot="secondary">
                <ion-menu-button></ion-menu-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
</template>  
<style>
.app-header {
    border-radius: 0px 0px 20px 20px;
}
</style>
<script lang="ts">

import { IonHeader, IonToolbar, IonButtons,  IonTitle, menuController,IonMenuButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { personCircle ,menu} from 'ionicons/icons';

export default defineComponent({
    name: 'appHeader',
    components: { IonHeader, IonToolbar, IonButtons, IonTitle,IonMenuButton },
    props: {
        title: String
    },
    setup() {
        const openMenu = () => {
            menuController.open("main-content")
        }
        return {
            IonHeader,
            IonToolbar,
            IonButtons,
            IonTitle,
            IonMenuButton,
            openMenu,
            personCircle,
            menu
        }
    }
});
</script>