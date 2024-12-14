<template>
    <div class="title">
        <div class="subtitle">{{ title }}&nbsp;<span>{{ subtitle }}</span></div>
        <div class="question">{{ question }}</div>
    </div>
    <div class="number">
        <ButtonList :buttons="options" @update:buttons="handleUpdate" />
    </div>
</template>

<script setup>
import { toRef } from "vue";
import { ButtonList } from "../../components/index";

const props = defineProps({
    title: { type: String, required: true, default: 'ALCANCE 1: ' },
    subtitle: { type: String, required: true, default: 'EMISIONES DIRECTAS' },
    question: { type: String, required: true, default: '¿Cuántas hornillas utilizas a la vez en promedio?' },
    options: { type: Array, required: true },
});

const options = toRef(props, 'options');

const emit = defineEmits(['next']);

const handleUpdate = (updatedButtons) => {
    options.value = updatedButtons;
    setTimeout(() => {
        nextStep();
    }, 500);
};

const nextStep = () => {
    emit('next');
};
</script>

<style scoped>
.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 30px;
    gap: 20px;
}

.subtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 328px;
    font-family: 'Stolzl Medium';
    font-size: 12px;
    color: #292B2E;
    text-transform: uppercase;
}

.subtitle span {
    font-family: 'Stolzl Regular';
}

.question {
    width: 318px;
    font-family: 'Stolzl Regular';
    font-size: 25px;
    line-height: 30px;
    text-align: center;
    color: #292B2E;
}

.number {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 75px;
    gap: 50px;
}
</style>