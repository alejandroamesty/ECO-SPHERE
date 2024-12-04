<template>
    <div class="post-container">
        <div class="user-container">
            <img :src="icon" alt="icon" class="user-icon">
            <div class="user-info">
                <div class="name">{{ name }}</div>
                <div class="username">{{ username }}</div>
            </div>
        </div>
        <div class="content-container">
            <div class="content-text">{{ content }}</div>
        </div>
        <div class="interactions-container">
            <Badge text="100K" :icon="LIKE" />
            <Badge text="100K" :icon="COMMENT" />
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { Badge } from "../index";
import { LIKE, COMMENT } from '../../utils/icons';

const props = defineProps({
    content: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

const { content, icon, name, username } = toRefs(props);
</script>

<style scoped>
.post-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    padding: 24px;
    height: fit-content;
    background: #F6F6F6;
    box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(221, 221, 221, 0.5), inset -5px 5px 10px rgba(221, 221, 221, 0.2), inset 5px -5px 10px rgba(221, 221, 221, 0.2), inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px 5px 13px rgba(221, 221, 221, 0.9);
    border-radius: 30px;
}

.user-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: fit-content;
    gap: 13px;
}

.user-icon {
    width: 40px;
    height: 40px;
    border-radius: 100%;
}

.user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.name {
    display: flex;
    align-items: center;
    width: 114px;
    height: 16px;
    top: 0;
    font-family: 'Stolzl Medium';
    font-size: 14px;
    color: #292B2E;
}

.username {
    display: flex;
    align-items: center;
    width: 129px;
    height: 16px;
    font-family: 'Stolzl Regular';
    font-size: 11px;
    color: #949799;
}

.content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.content-text {
    width: 100%;
    height: fit-content;
    font-family: 'Stolzl Regular';
    font-size: 12px;
    color: #292B2E;
}

.interactions-container {
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: fit-content;
    gap: 9px;
}
</style>