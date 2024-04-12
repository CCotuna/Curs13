<script setup>
import TaskCheck from './TaskCheck.vue';
import TaskName from './TaskName.vue';
import TaskActions from './TaskActions.vue';

defineEmits(["newTaskAdded"])

defineProps({
    task: Object,
    isNewMode: {
        type: Boolean,
        default: false,
    }
})
import { ref } from "vue";
const isInEditMode = ref(false);
</script>

<template>
    <div class="flex">
        <TaskCheck />
        <TaskName :isNewMode="isNewMode" :task="task" :isEditMode="isInEditMode" @newTaskAdded="$emit('newTaskAdded')"
            @editTaskDone="isInEditMode = false" />
        <TaskActions v-if="!isNewMode" :taskId="task.id" @editTask="isInEditMode = true" />
    </div>
</template>