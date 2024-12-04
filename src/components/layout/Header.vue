<template>
    <ion-header class="ion-no-border">
        <ion-toolbar>
            <div class="leaf-header">
                <slot name="header-layout"></slot>
            </div>
        </ion-toolbar>
        <div class="leaf-end"></div>
    </ion-header>
</template>

<script setup>
import { IonHeader, IonToolbar } from '@ionic/vue';
</script>

<style scoped>
ion-header {
    background-color: transparent !important;
}

ion-toolbar {
    position: relative;
    border-radius: 0px 0px 0px 50px;
    --background: #40A578;
}

.leaf-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 129px;
    left: 0px;
    flex-direction: column;
    gap: 20px;
    background: #40A578;
    border-radius: 0px 0px 0px 50px;
}

.leaf-end {
    position: absolute;
    right: 0;
    width: 50px;
    height: 50px;
    border-radius: 0 50px 0 0;
    box-shadow: 25px -25px 0 25px #40A578;
    background: transparent;
    z-index: 9999;
}
</style>