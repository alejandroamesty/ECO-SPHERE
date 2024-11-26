<template>
    <ion-page>
        <Header>
            <template #header-layout>
                <div class="header-layout">
                    <span class="title-1">Chats</span>
                    <div class="buttons">
                        <RoundButton :icon="SEARCH" :size=40 />
                    </div>
                </div>
                <ToggleButton v-model="toggleValue" leftLabel="Amigos" rightLabel="Comunidades" />
            </template>
        </Header>
        <ion-content></ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { SEARCH } from '../../utils/icons';
import { Header, RoundButton, ToggleButton } from "../../components/index"

const toggleValue = ref(false);
</script>
