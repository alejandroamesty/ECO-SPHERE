<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <div class="leaf-header">
                    <div class="header-layout">
                        <div class="breadcrumb">
                            <img class="arrow-icon" :src="ARROW_LEFT" alt="Back" @click="handleBackClick" />
                            <div class="user-info">
                                <img src="https://via.placeholder.com/48" alt="Back" />
                                <div class="user">
                                    <div class="name">Alejandro Ávila</div>
                                    <div class="username">@alejandroamesty</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="buttons">

                    </div>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" scroll-y="false">
            <div class="content">
                <Message message="Hi" time="07:00" mode="in" />
                <Message message="Hi" time="08:00" mode="out" />
                <div class="input">
                    <TextInput placeholder="Buscar" />
                    <!-- <RoundButton :icon="FILTER" :size=40 :onClick="handleFilterClick" /> -->
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonHeader, IonToolbar } from '@ionic/vue';
// import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { ARROW_LEFT } from '../../utils/icons';
import { TextInput, Message } from '../../components/index';
import { Keyboard } from '@capacitor/keyboard';

const router = useRouter();

/**
 * Navega a la vista anterior.
 */
const handleBackClick = () => {
    router.back();
};

onMounted(() => {
    Keyboard.setResizeMode({
        mode: 'body',
    });
});

// onIonViewWillLeave(() => {
//     filterMenu.value.hideMenu();
//     Keyboard.setResizeMode({
//         mode: 'none',
//     });
// });
</script>

<style scoped>
ion-header {
    background-color: #40A578 !important;
}

ion-toolbar {
    --background: #40A578;
    border-radius: 0px 0px 0px 50px;
}

ion-content {
    --background: #40A578;
    border-radius: 50px 50px 0px 0px;
}

.leaf-header {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
    left: 0px;
    right: 25px;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #40A578;
    border-radius: 0px 0px 0px 50px;
}

.header-layout {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 25px;
    padding-right: 25px;
    height: fit-content;
    justify-content: space-between;
    position: relative;
    flex-direction: row;
    flex-shrink: 0;
}

.buttons {
    display: flex;
    flex-direction: row;
    position: relative;
    gap: 8px;
}

.content {
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    gap: 30px;
    padding: 30px;
    bottom: 0;
    border-radius: 50px 50px 0px 0px;
    z-index: 5;
}

.input {
    display: flex;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: 25px;
}

.breadcrumb {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    cursor: pointer;
}

.user-info {
    display: flex;
    flex-direction: row;
    gap: 15px;
    padding: 10px 5px;
}

.user-info img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}

.user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* gap: 5px; */
}

.name {
    display: flex;
    align-items: center;
    font-family: 'Stolzl Regular';
    font-size: 16px;
    color: #FFFFFF;
}

.username {
    display: flex;
    align-items: center;
    font-family: 'Stolzl Regular';
    font-size: 12px;
    color: #FFFFFF;
}
</style>