<template>
    <div class="toggle-container" @click="toggle">
        <div class="selected-indicator" :class="{ right: isSelected }"></div>
        <div class="option">
            <span class="left-text">{{ leftLabel }}</span>
        </div>
        <div class="option">
            <span class="right-text">{{ rightLabel }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
    modelValue: Boolean,
    leftLabel: {
        type: String,
        required: true
    },
    rightLabel: {
        type: String,
        required: true
    }
});

const { modelValue, leftLabel, rightLabel } = toRefs(props);

const emit = defineEmits(['update:modelValue']);
const isSelected = computed({
    get: () => modelValue.value,
    set: (val) => emit('update:modelValue', val)
});

const toggle = () => {
    isSelected.value = !isSelected.value;
};
</script>

<style scoped>
.toggle-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 208px;
    height: 45px;
    border-radius: 15px;
    background: rgba(39, 103, 75, 0.5);
    backdrop-filter: blur(26.2px);
    cursor: pointer;
}

.option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 97px;
    height: 30px;
    border-radius: 10px;
    font-family: 'Stolzl Medium';
    font-size: 10px;
    z-index: 1;
    color: #FFFFFF;
}

.selected-indicator {
    position: absolute;
    top: 7px;
    left: 7px;
    width: 97px;
    height: 30px;
    border-radius: 10px;
    transition: left 0.3s ease;
    background: rgba(33, 83, 61, 0.5);
    backdrop-filter: blur(2px);
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.selected-indicator.right {
    left: 104px;
}

.left-text {
    position: relative;
    text-align: center;
    left: 7px;
}

.right-text {
    position: relative;
    text-align: center;
    right: 7px;
}
</style>