<template>
    <div :class="['message-container', mode]">
        <div v-if="mode === 'out'" class="time">{{ time }}</div>
        <div class="message-box">
            <div class="message">{{ message }}</div>
        </div>
        <div v-if="mode === 'in'" class="time">{{ time }}</div>
    </div>
</template>


<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    message: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
        validator: (value) => ['in', 'out'].includes(value),
    },
});
</script>

<style scoped>
.message-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0px;
    gap: 7px;
    width: 100%;
}

.message-box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 12px 16px;
    gap: 10px;
    background: rgba(157, 222, 139, 0.8);
    border: 1px solid rgba(35, 35, 35, 0.02);
    box-shadow: 0px 2px 5px rgba(35, 35, 35, 0.05);
    border-radius: 20px 8px 20px 20px;
}

.message {
    font-family: 'Stolzl Regular';
    font-size: 16px;
    color: #232323;
}

.time {
    font-family: 'Stolzl Regular';
    font-size: 13px;
    display: flex;
    align-items: flex-end;
    text-align: right;
    color: #BDBDBD;
}

.out .message-box {
    background: rgba(157, 222, 139, 0.8);
    border: 1px solid rgba(35, 35, 35, 0.02);
    box-shadow: 0px 2px 5px rgba(35, 35, 35, 0.05);
    border-radius: 20px 8px 20px 20px;
    flex: none;
    order: 0;
    flex-grow: 0;
}

.out .message {
    color: #232323;
}

.out .message-container {
    justify-content: flex-end;
}

.in .message-box {
    background: #E1E1E1;
    border: 1px solid rgba(35, 35, 35, 0.02);
    box-shadow: 0px 2px 5px rgba(35, 35, 35, 0.05);
    border-radius: 8px 20px 20px 20px;
}

.in .message {
    color: #232323;
}

.message-container.in {
    justify-content: flex-start;
}
</style>