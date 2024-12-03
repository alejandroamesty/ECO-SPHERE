<template>
    <div class="profile-container">
        <div class="user-container">
            <img class="user-icon" :src="icon" alt="User Icon" />
            <div class="user-info">
                <div class="name">{{ name }}</div>
                <div class="username">{{ username }}</div>
            </div>
        </div>
        <TextButton v-model:checked="isButtonSelected" :caption="isButtonSelected ? 'SIGUIENDO' : 'SEGUIR'" />
    </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue';
import { TextButton } from '..';

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
    checked: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:checked']);

const { icon, name, username } = toRefs(props);

const isButtonSelected = ref(props.checked);

watch(
    () => props.checked,
    (newValue) => {
        isButtonSelected.value = newValue;
    }
);

watch(
    () => isButtonSelected.value,
    (newValue) => {
        emit('update:checked', newValue);
    }
);
</script>

<style scoped>
.profile-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.user-container {
    display: flex;
    align-items: center;
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
</style>