<template>
    <div :style="{ backgroundColor: backgroundColor }" class="badge-container">
        <div class="badge-items">
            <img :src="icon" alt="icon" class="badge-icon">
            <span :style="{ fontSize: fontSize, color: textColor }" class="badge-text">{{ text }}</span>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    backgroundColor: {
        type: String,
        default: 'rgba(79, 84, 88, 0.5)',
    },
    textColor: {
        type: String,
        default: '#FFFFFF',
    },
});

const { text, icon, backgroundColor, textColor, fontSize } = toRefs(props);
</script>

<style scoped>
.badge-container {
    display: flex;
    align-self: center;
    width: fit-content;
    height: 33px;
    padding: 0 13px;
    backdrop-filter: blur(26px);
    border-radius: 100px;
}

.badge-items {
    display: flex;
    align-items: center;
    justify-content: center;
}

.badge-icon {
    flex-shrink: 0;
    width: 15px;
    height: 15px;
    margin-right: 6px;

}

.badge-text {
    display: flex;
    align-items: center;
    font-size: 11px;
    font-family: 'Stolzl Regular';
    line-height: 13px;
}
</style>