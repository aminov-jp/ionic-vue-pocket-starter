<template>
  <ion-page>
    <Suspense>
    <ion-router-outlet></ion-router-outlet>
    </Suspense>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {  IonPage, IonRouterOutlet } from '@ionic/vue';


export default defineComponent({
  name: 'AuthPage',
  components: { IonPage, IonRouterOutlet },
});
</script>
