<template>
    <div class="menu-container">
        <div class="menu-options" :class="{ 'menu-open': isOpen }">
            <slot name="menu"></slot>
        </div>
        <div class="profile-container" :class="{ 'menu-open': isOpen }">
            <slot name="profile"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

/**
 * Despliega el menú lateral.
 */
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
}

defineExpose({ isOpen, toggleMenu });
</script>

<style scoped>
.menu-container {
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
    background: #00494a;
    z-index: 1;
    transition: transform 0.3s ease;
}

.profile-container {
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

.profile-container.menu-open {
    left: -50px;
    transform: scale(0.6) translate(0px, 260px);
    border-radius: 0px 30px 30px 0px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}
</style>