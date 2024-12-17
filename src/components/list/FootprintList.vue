<template>
    <div class="list">
        <div class="scope" :class="{ first: options.first }">
            <div class="scope-data">
                <span class="title">ALCANCE 1: EMISIONES DIRECTAS</span>
                <a class="subtitle">4.5 toneladas de CO2 kg/año</a>
            </div>
            <button @click="handleClick" class="scope-button" :class="{ first: options.first }">
                <img :src="ARROW_DIAGONAL" alt="button-icon" />
            </button>
        </div>

        <div class="scope" :class="{ second: options.second }">
            <div class="scope-data">
                <span class="title">ALCANCE 2: EMISIONES INDIRECTAS</span>
                <a class="subtitle">3.2 toneladas de CO2 kg/año</a>
            </div>
            <button @click="handleClick" class="scope-button" :class="{ second: options.second }">
                <img :src="ARROW_DIAGONAL" alt="button-icon" />
            </button>
        </div>

        <div class="scope" :class="{ third: options.third }">
            <div class="scope-data">
                <span class="title">ALCANCE 3: OTRAS EMISIONES INDIRECTAS</span>
                <a class="subtitle">5.6 toneladas de CO2 kg/año</a>
            </div>
            <button @click="handleClick" class="scope-button" :class="{ third: options.third }">
                <img :src="ARROW_DIAGONAL" alt="button-icon" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ARROW_DIAGONAL } from '../../utils/icons';

const props = defineProps({
    options: {
        type: Object,
        required: true,
        default: () => ({
            first: false,
            second: false,
            third: false,
            fourth: false
        })
    }
});

const handleClick = (event) => {
    console.log('Click');
};
</script>

<style scoped>
.list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 22px;
}

.scope {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 22px;
    /* gap: 22px; */
    background: #F6F6F6;
    box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(221, 221, 221, 0.5), inset -5px 5px 10px rgba(221, 221, 221, 0.2), inset 5px -5px 10px rgba(221, 221, 221, 0.2), inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px 5px 13px rgba(221, 221, 221, 0.9);
    border-radius: 37px;
}

.scope-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
}

.title {
    font-family: 'Stolzl Regular';
    font-size: 12px;
    text-transform: uppercase;
    color: #949799;
}

.subtitle {
    font-family: 'Stolzl Regular';
    font-size: 20px;
    color: #292B2E;
}

.scope-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-bottom: 26px;
    border-radius: 100px;
    background: #949799;
    box-shadow: 1px 1px 2px rgba(163, 166, 168, 0.3), -1px -1px 2px rgba(133, 136, 138, 0.5), inset -5px 5px 10px rgba(133, 136, 138, 0.2), inset 5px -5px 10px rgba(133, 136, 138, 0.2), inset -5px -5px 10px rgba(163, 166, 168, 0.9), inset 5px 5px 13px rgba(133, 136, 138, 0.9);
}

.scope-button img {
    width: 24px;
    height: 24px;
}

/* Highlighted */

.first {
    background: #9DDE8B;
    box-shadow: 1px 1px 2px rgba(173, 244, 153, 0.3), -1px -1px 2px rgba(141, 200, 125, 0.5), inset -5px 5px 10px rgba(141, 200, 125, 0.2), inset 5px -5px 10px rgba(141, 200, 125, 0.2), inset -5px -5px 10px rgba(173, 244, 153, 0.9), inset 5px 5px 13px rgba(141, 200, 125, 0.9);
}

.second {
    background: #40A578;
    box-shadow: 1px 1px 2px rgba(70, 182, 132, 0.3), -1px -1px 2px rgba(58, 149, 108, 0.5), inset -5px 5px 10px rgba(58, 149, 108, 0.2), inset 5px -5px 10px rgba(58, 149, 108, 0.2), inset -5px -5px 10px rgba(70, 182, 132, 0.9), inset 5px 5px 13px rgba(58, 149, 108, 0.9);
}

.third {
    background: #006769;
    box-shadow: 1px 1px 2px rgba(0, 113, 116, 0.3), -1px -1px 2px rgba(0, 93, 95, 0.5), inset -5px 5px 10px rgba(0, 93, 95, 0.2), inset 5px -5px 10px rgba(0, 93, 95, 0.2), inset -5px -5px 10px rgba(0, 113, 116, 0.9), inset 5px 5px 13px rgba(0, 93, 95, 0.9);
}

.fourth {
    background: #E7F994;
    box-shadow: 1px 1px 2px rgba(254, 255, 163, 0.3), -1px -1px 2px rgba(208, 224, 133, 0.5), inset -5px 5px 10px rgba(208, 224, 133, 0.2), inset 5px -5px 10px rgba(208, 224, 133, 0.2), inset -5px -5px 10px rgba(254, 255, 163, 0.9), inset 5px 5px 13px rgba(208, 224, 133, 0.9);
}

.scope.first span {
    color: #5FA64B;
}

.scope.second span {
    color: #2C634B;
}

.scope.third span {
    color: #002B2B;
}

.scope.fourth span {
    color: #9BA56F;
}

.scope.second a {
    color: #FFFFFF;
}

.scope.third a {
    color: #FFFFFF;
}

.scope.first img {
    filter: invert(1) brightness(255%) contrast(100%) grayscale(0);
}

.scope.second img {
    filter: none;
}

.scope.third img {
    filter: none;
}

.scope.fourth img {
    filter: invert(1) brightness(255%) contrast(100%) grayscale(0);
}
</style>