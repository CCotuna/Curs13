<script setup>

const props = defineProps({
    taskId: {
        type: String,
        required: true
    }
})

import { useTasksStore } from "@/stores/tasks.js"
const tasksStore = useTasksStore()

function deleteTask() {
    tasksStore.deleteTask(props.taskId);
}

function toggleFavorite() {
    tasksStore.toggleFavorite(props.taskId);
}

defineEmits(["editTask", "toggleFavorite"])

import { computed } from 'vue'
const isFavorite = computed(() => {
    const taskIndex = tasksStore.lists.findIndex(task => task.id === props.taskId);
    return tasksStore?.lists[taskIndex]?.favorite
})

</script>
<template>
    <div class="ms-10">
        -> Actions:

        <button @click="deleteTask"><i class="bi bi-trash mx-3"></i></button>
        <button @click="$emit('editTask')"><i class="bi bi-pen me-3"></i></button>
        <button @click="toggleFavorite">
            <i v-if="isFavorite" class="bi bi-star-fill text-yellow-500"></i>
            <i v-else class="bi bi-star"></i>
        </button>
    </div>
</template>
