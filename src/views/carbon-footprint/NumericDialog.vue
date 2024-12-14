<template>
    <div class="title">
        <div class="subtitle">{{ title }}<span>{{ subtitle }}</span></div>
        <div class="question">{{ question }}</div>
    </div>
    <div class="number">
        <Counter :initialNumber="0" :min="0" :max="20" @updateNumber="handleUpdateNumber" />
        <div class="caption">Haz click para ingresar un número</div>
    </div>
    <div class="button">
        <BigButton caption="Continuar" />
    </div>
</template>

<script setup>
import { Counter, BigButton } from "../../components/index";

const props = defineProps({
    title: { type: String, required: true, default: 'ALCANCE 1: ' },
    subtitle: { type: String, required: true, default: 'EMISIONES DIRECTAS' },
    question: { type: String, required: true, default: '¿Cuántas hornillas utilizas a la vez en promedio?' },
});

const handleUpdateNumber = (newNumber) => {
    console.log('Nuevo número:', newNumber);
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
    height: 15px;
    font-family: 'Stolzl Medium';
    font-size: 12px;
    color: #292B2E;
}

.subtitle span {
    font-family: 'Stolzl Regular';
}

.question {
    width: 318px;
    height: 90px;
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

.caption {
    display: flex;
    align-items: center;
    text-align: center;
    height: 14px;
    font-family: 'Stolzl Regular';
    font-size: 15px;
    color: #292B2E;
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 130px;
    gap: 20px;
}
</style>