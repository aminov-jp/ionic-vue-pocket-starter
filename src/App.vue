<template>
  <ion-app>
    <ion-split-pane content-id="main-content" when="false">
    <app-menu></app-menu>
    <ion-router-outlet id="main-content" />
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent } from 'vue';
import appMenu from '@/components/menu.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    appMenu
  }
});
</script>