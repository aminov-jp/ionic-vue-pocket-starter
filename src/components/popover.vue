<template>
    <ion-content class="ion-padding" color="danger"> {{ message }} </ion-content>
</template>  
<style>
.error-popover {
    --background: rgba(218, 40, 40, 0.6);
}
</style>
<script lang="ts">

import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PopOver',
    components: { IonContent },
    props: {
        message: String
    }
});
</script>