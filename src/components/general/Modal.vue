<template>
    <Teleport to="body">
        <div v-if="isVisible" class="modal-container" :class="{ 'is-closing': isClosing }"
            :style="{ transform: `translateY(${offsetY}px)` }" @animationend="onAnimationEnd">
            <div class="bar-container" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"
                @click="closeModal">
                <div class="bar" />
            </div>
            <div class="header">
                <div class="round-button" @click="props.backButton">
                    <img :src="BACK" alt="Go back" />
                </div>
                <div class="title">{{ title }}</div>
                <div class="round-button" @click="props.nextButton">
                    <img :src="CHECK" alt="Done" />
                </div>
            </div>
            <slot />
        </div>
    </Teleport>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';
import { BACK, CHECK } from '../../utils/icons';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    backButton: {
        type: Function,
        required: true,
    },
    nextButton: {
        type: Function,
        required: true,
    },
    isOpen: {
        type: Boolean,
        required: true,
    },
    onClose: {
        type: Function,
        required: true,
    },
});

const isVisible = ref(false);
const isClosing = ref(false);
const touchStartY = ref(0);
const offsetY = ref(0);

/**
 * Observa el cambio de la propiedad isOpen.
 */
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        isVisible.value = true;
        isClosing.value = false;
    } else {
        isClosing.value = true;
    }
});

/**
 * Captura la posición inicial del toque.
 */
function onTouchStart(event) {
    touchStartY.value = event.touches[0].clientY;
}

/**
 * Calcula la distancia que se ha movido el dedo.
 */
function onTouchMove(event) {
    const currentY = event.touches[0].clientY;
    offsetY.value = Math.max(currentY - touchStartY.value, 0);
}

/**
 * Determina si se debe cerrar el modal o no.
 */
function onTouchEnd() {
    const screenHeight = window.innerHeight;
    if (offsetY.value > screenHeight / 4) {
        closeModal();
    } else {
        offsetY.value = 0;
    }
}

/**
 * Cierra el modal.
 */
function closeModal() {
    isClosing.value = true;
}

/**
 * Maneja el evento cuando la animación termina.
 */
function onAnimationEnd() {
    if (isClosing.value) {
        isVisible.value = false;
        offsetY.value = 0;
        props.onClose();
    }
}
</script>

<style scoped>
.modal-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 62px;
    background: #ffffff;
    border-radius: 50px 50px 0px 0px;
    overflow: hidden;
    z-index: 1000;
    transition: transform 0.3s ease-in-out;
    animation: slide-up 0.3s ease-in-out forwards;
}

.modal-container.is-closing {
    animation: slide-down 0.3s ease-in-out forwards;
}

.bar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 40px;
    border-radius: 50px 50px 0px 0px;
}

.bar {
    position: relative;
    width: 83px;
    height: 6px;
    background: #edeef0;
    border-radius: 100px;
    margin: 0 auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
}

.round-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f5f5f5;
}

.round-button img {
    width: 18px;
    height: 18px;
    filter: invert(1) brightness(255%) contrast(100%) grayscale(0);
}

.title {
    width: 166px;
    height: 25px;
    font-family: 'Stolzl Medium';
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    color: #292B2E;
}

@keyframes slide-up {
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
}

@keyframes slide-down {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(100%);
    }
}
</style>
