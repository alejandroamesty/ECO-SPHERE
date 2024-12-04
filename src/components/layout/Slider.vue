<template>
    <div class="slider-container" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
        @touchend="handleTouchEnd">
        <div class="slider" :class="{ 'slide-left': currentIndex, 'slide-right': !currentIndex }">
            <div class="slide first">
                <slot name="slide1"></slot>
            </div>
            <div class="slide second">
                <slot name="slide2"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    currentIndex: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['update:currentIndex']);

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let isHorizontalSwipe = false;

/**
 * Maneja el evento de inicio de un toque.
 */
const handleTouchStart = (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    isHorizontalSwipe = false;
};

/**
 * Determina si el movimiento es principalmente horizontal o vertical.
 */
const handleTouchMove = (event) => {
    const deltaX = event.touches[0].clientX - touchStartX;
    const deltaY = event.touches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        isHorizontalSwipe = true;
    }
};

/**
 * Actualiza el índice actual del slider si el swipe fue horizontal.
 */
const handleTouchEnd = (event) => {
    if (!isHorizontalSwipe) {
        return;
    }

    touchEndX = event.changedTouches[0].clientX;

    if (touchStartX > touchEndX) {
        emit('update:currentIndex', true);
    } else if (touchStartX < touchEndX) {
        emit('update:currentIndex', false);
    }
};
</script>

<style scoped>
.slider-container {
    position: relative;
    width: 100%;
    height: calc(100% - 100px);
    overflow: hidden; 
}

.slider {
    display: flex;
    width: calc(200% + 60px);
    transition: transform 0.3s ease-in-out;
}

.slide {
    flex: 0 0 calc(50% - 30px);
    margin-right: 30px;
}

.first,
.second {
    display: flex;
    justify-content: center;
}

.second {
    margin-left: 30px;
}

.slider.slide-left {
    transform: translateX(calc(-50% - 30px));
}

.slider.slide-right {
    transform: translateX(0);
}
</style>