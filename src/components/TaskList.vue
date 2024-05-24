<script setup>
import TaskLine from "./TaskLine.vue";
import TaskNew from "./TaskNew.vue";

import { useTasksStore } from "@/stores/tasks.js"
const tasksStore = useTasksStore()

import { ref } from "vue";
const isNewMode = ref(false);

import { onMounted } from 'vue';
import axios from "axios"

onMounted(async () => {
    // if (localStorage.getItem('lists')) {
    //     tasksStore.lists = JSON.parse(localStorage.getItem('lists'))
    // }
    const tasks = await axios.get("http://localhost:3000/tasks")
    console.log(tasks.data)
    tasksStore.lists = tasks.data;

    document.getElementById("test").scrollIntoView()
})

</script>

<template>
    <div id="test">
        <TaskLine class="my-3" v-for="task of tasksStore.lists" :task="task" />
        <TaskLine class="my-3" v-if="isNewMode" :isNewMode="true" @newTaskAdded="isNewMode = false" />
    </div>
    <TaskNew v-if="!isNewMode" @addNewTask="isNewMode = true" />
</template>