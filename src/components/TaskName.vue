<script setup>
const emits = defineEmits(["newTaskAdded", "editTaskDone"])

const props = defineProps({
    task: Object,
    isNewMode: {
        type: Boolean,
        default: false,
    },
    isEditMode: {
        type: Boolean,
        default: false
    },
});

import { useTasksStore } from "@/stores/tasks.js"
// import { v4 as uuidv4 } from 'uuid';

const tasksStore = useTasksStore()
let isAdded = false;
function addNewTask(event) {
    if (!isAdded && event.target.value.length) {
        isAdded = true;
        if (props.isNewMode) {
            tasksStore.addTask(event.target.value, false);
            emits("newTaskAdded");
        } else {
            tasksStore.editTask(props.task.id, event.target.value);
            isAdded = false;
            emits("editTaskDone");
        }
    }
}

function checkIfEnterKey(event) {
    if (event.keyCode == 13) {
        addNewTask(event)
    }
}

</script>

<template>
    <div v-if="isNewMode || isEditMode" class="relative z-0">
        <input @focusout="addNewTask" @keypress="checkIfEnterKey" type="text" id="floating_standard"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " :value="task?.name" />
        <label for="floating_standard"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            <span v-if="task"> {{ task.name }}</span>
            <span v-else>New Task</span>
        </label>
    </div>
    <div v-else>{{ task.name }}</div>
</template>