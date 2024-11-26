<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <div class="leaf-header">
                    <div class="header-layout">
                        <Breadcrumb label="Buscar" @back="handleBackClick" />
                        <RoundButton :icon="FILTER" :size=40 :onClick="handleFilterClick" />
                    </div>
                    <div class="buttons">
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" scroll-y="false">
            <div class="body" :class="{ active: isActive }">
                <!-- <SearchInput placeholder="Buscar" /> -->
            </div>
        </ion-content>
        <ContextMenu ref="filterMenu" :options="menuOptions" />
        <div class="content"></div>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonHeader, IonToolbar } from '@ionic/vue';
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { FILTER, PROFILE, COMMUNITY } from '../../utils/icons';
import { RoundButton, ContextMenu, SearchInput, Breadcrumb } from '../../components/index';

const router = useRouter();

const menuOptions = [
    { label: 'Perfiles', icon: PROFILE },
    { label: 'Comunidades', icon: COMMUNITY },
];

const isActive = ref(false);
const filterMenu = ref(null);

/**
 * Posiciona el menú de filtro en la pantalla.
 * @param event 
 */
const handleFilterClick = (event) => {
    if (filterMenu.value.isVisible) {
        filterMenu.value.hideMenu();
        return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const menuWidth = 160;

    const x = window.innerWidth - menuWidth - 25;
    const y = rect.bottom + 10;

    const position = { x, y };
    filterMenu.value.showMenu(position);
};

/**
 * Navega a la vista anterior.
 */
const handleBackClick = () => {
    router.push('/tabs/feed');
};

/**
 * Activa la animación de entrada.
 */
onIonViewWillEnter(() => {
    isActive.value = false;
    setTimeout(() => {
        isActive.value = true;
    }, 100);
});

/**
 * Oculta el menú de filtro al salir de la vista.
 */
onIonViewWillLeave(() => {
    filterMenu.value.hideMenu();
});
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
    border-radius: 50px 50px 0px 0px;
}

.body {
    display: flex;
    width: 100%;
    height: 0;
    background: #40A578;
    border-radius: 0px 0px 0px 50px;
    transition: height 0.6s ease-in-out, border-radius 0.6s ease-in-out;
}

.body.active {
    height: 100%;
    border-radius: 0px;
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
    padding-top: 8px;
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

.title-1 {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 25px;
    color: #FFF;
    font-family: "BR Omny SemiBold";
    font-size: 20px;
}

.title-2 {
    font-family: "BR Omny Regular";
}

.buttons {
    display: flex;
    flex-direction: row;
    position: relative;
    gap: 8px;
}

.content {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    bottom: 0;
    border-radius: 50px 50px 0px 0px;
}
</style>