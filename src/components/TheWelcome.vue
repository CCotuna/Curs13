<script setup>
// js event loop
import { ref } from 'vue'
let welcomeJSON = ref()
import axios from 'axios'

function callAPIWelcome() {
    axios({
        method: 'GET',
        url: 'http://localhost:3000/tasks',

    })
        .then((response) => {
            console.log("RESPONSE", response.data)
            welcomeJSON.value = response.data
            localStorage.setItem('lists', JSON.stringify(response.data))

        })
}

let loggedInMessage = ref('');
let isLoggedIn = ref(false);

function postAPIWelcome() {
    // axios({
    //     method: 'POST',
    //     url: 'http://localhost:3000/tasks',
    //     data: {
    //         name: "Mario",
    //         age: 21
    //     }
    // })
    // .then((response) => {
    //     console.log("RESPONSE", response.data)
    //     welcomeJSON.value = response.data
    //     localStorage.setItem('lists', JSON.stringify(response.data))

    // })

    // varianta scurta
    axios.post("http://localhost:3000/tasks", {
        name: "Mario",
        age: 21
    },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
}

async function displayPostAPIWelcome() {
    welcomeJSON.value = await axios.get("http://localhost:3000/tasks",)
    console.log(welcomeJSON.value);
    // console.log("STUDENTS IN FRONT", students);
}
</script>
<template>
    <button @click="callAPIWelcome" type="button"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Call
        API Welcome</button>

    <button @click="postAPIWelcome" type="button"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">POST
        API</button>
    <button @click="displayPostAPIWelcome" type="button"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Display
        Students</button>
    <div>
        <p>API RESPONSE:</p>
        <h3 v-for="student in welcomeJSON?.data">
            {{ student.name }} + {{ student.age }}
        </h3>
        <span></span>
    </div>
</template>
<style scoped></style>