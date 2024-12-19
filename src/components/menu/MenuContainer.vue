<template>
    <div class="menu-container">
        <div class="menu-options" :class="{ 'menu-open': isOpen }">
            <slot name="menu"></slot>
            <div class="options">
                <div v-for="(item, index) in menuWithIcons" :key="index" class="option">
                    <img class="option-icon" :src="item.icon" :alt="item.label" />
                    <span class="option-label">{{ item.label }}</span>
                </div>
            </div>
        </div>
        <div class="view-container" :class="{ 'menu-open': isOpen }">
            <div v-if="isOpen" class="view-overlay" @click="toggleMenu"></div>
            <slot name="view"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import menuItems from '../../utils/profileMenu.json';
import { iconsMap } from '../../utils/icons.js';

const isOpen = ref(false);

/**
 * Agrega los iconos a las opciones del menú.
 */
const menuWithIcons = menuItems.map(item => ({
    ...item,
    icon: iconsMap[item.icon]
}));

/**
 * Alterna el estado del menú lateral.
 */
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};

defineExpose({ isOpen, toggleMenu });
</script>

<style scoped>
.menu-container {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    background: #006769;
    overflow: hidden;
}

.menu-options {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    transition: transform 0.3s ease;
}

.options {
    position: absolute;
    height: 535px;
    top: 23%;
    right: 13px;
}

.option {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    cursor: pointer;
    border-radius: 12px;
    transition: background 0.3s ease;
}

.option:hover {
    background: #015E60;
}

.option-icon {
    width: 24px;
    height: 24px;
}

.option-label {
    color: white;
    max-width: 150px;
    font-size: 13px;
    font-family: 'Stolzl Medium';
}

.view-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    transform-origin: top left;
    transition: transform 0.3s ease, border-radius 0.3s ease, box-shadow 0.3s ease, left 0.5s ease;
    z-index: 2;
    background: white;
    overflow: hidden;
}

.view-container.menu-open {
    left: -92px;
    transform: translate3d(0, 16%, 0) scale(0.6);
    will-change: transform;
    border-radius: 0px 30px 30px 0px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.view-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: rgba(0, 0, 0, 0.4); */
    z-index: 3;
    cursor: pointer;
}
</style>