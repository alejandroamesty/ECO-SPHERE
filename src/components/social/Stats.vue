<template>
    <div class="stats-container">
        <div class="user-container">
            <img class="user-icon" :src="icon" alt="User Icon" />
            <div class="user-info">
                <div class="name">{{ name }}</div>
                <div class="username">{{ username }}</div>
            </div>
        </div>
        <div class="stats">
            <div class="section">
                <div class="co2-reduced">{{ reduced }}</div>
                <div class="co2-reduced-label">REDUCIDO</div>
            </div>
            <div class="separator"></div>
            <div class="section">
                <div class="followers">{{ followers }}</div>
                <div class="followers-label">SEGUIDORES</div>
            </div>
            <div class="separator"></div>
            <div class="section">
                <div class="following">{{ following }}</div>
                <div class="following-label">SIGUIENDO</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
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
    reduced: {
        type: String,
        default: true,
    },
    followers: {
        type: Number,
        required: true,
    },
    following: {
        type: Number,
        required: true,
    },
});

const { icon, name, reduced, followers, following } = toRefs(props);
</script>

<style scoped>
.stats-container {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.user-container {
    display: flex;
    align-items: center;
    gap: 13px;
}

.user-icon {
    width: 60px;
    height: 60px;
    border-radius: 100%;
}

.user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 6px;
}

.name {
    display: flex;
    align-items: center;
    width: 253px;
    height: 25px;
    font-family: 'Stolzl Medium';
    font-size: 20px;
    display: flex;
    color: #FFFFFF;
}

.username {
    display: flex;
    align-items: center;
    width: 171px;
    height: 14px;
    font-family: 'Stolzl Regular';
    font-size: 12px;
    color: #FFFFFF;
}

.stats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
}

.section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.co2-reduced,
.followers,
.following {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 25px;
    font-family: 'Stolzl Medium';
    font-size: 17px;
    color: #FFFFFF;
}

.followers,
.following {
    text-transform: uppercase;
}

.co2-reduced-label,
.followers-label,
.following-label {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 78px;
    height: 17px;
    font-family: 'Stolzl Regular';
    font-size: 12px;
    color: #FFFFFF;
}

.separator {
    width: 2px;
    height: 42px;
    background: #348662;
    border-radius: 100px;
}
</style>