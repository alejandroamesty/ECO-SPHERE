<template>
    <ion-page>
        <Header>
            <template #header-layout>
                <div class="header-layout">
                    <span class="title-1">Chats</span>
                    <div class="buttons">
                        <RoundButton :icon="ADD" :size=40 />
                        <RoundButton :icon="SEARCH" :size=40 />
                    </div>
                </div>
                <ToggleButton v-model="toggleValue" leftLabel="Amigos" rightLabel="Comunidades" />
            </template>
        </Header>
        <ion-content>
            <Slider :currentIndex="toggleValue" @update:currentIndex="toggleValue = $event">
                <template #slide1>
                    <div class="body">
                        <ChatList :chats="chatData" @chatClick="handleChatClick" />
                    </div>
                </template>
                <template #slide2>
                    <div class="body">
                        <ChatList :chats="chatData" @chatClick="handleChatClick" />
                    </div>
                </template>
            </Slider>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { ADD, SEARCH } from '../../utils/icons';
import { Header, RoundButton, ToggleButton, ChatList, Slider } from "../../components/index"
import { useRouter } from 'vue-router';

const router = useRouter();

const toggleValue = ref(false);

const chatData = [
    {
        id: 1,
        image: 'https://via.placeholder.com/48',
        name: 'John Doe',
        latest: 'Hello, how are you?',
        time: '10:45 AM',
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/48',
        name: 'Jane Smith',
        latest: 'Lets catch up later.',
        time: 'Yesterday',
    },
];

const handleChatClick = (chat) => {
    console.log('Chat clicked:', chat);
    router.push('/private-chat');
};
</script>

<style scoped>
.body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 25px;
}
</style>