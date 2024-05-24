import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

import "bootstrap-icons/font/bootstrap-icons.css";

app.use(createPinia());
app.use(router);

import { ws } from "@/ws.js";

app.mount("#app");

// const xhttp = new XMLHttpRequest();

// //true daca vreau sa fie asincron
// xhttp.open("GET", "http://localhost:3000", true);
// //sa trimita spre server
// xhttp.send();
// //listener care asculta ce va primi
// xhttp.onreadystatechange = function () {
//   if (this.readyState == 4) {
//     console.log(this.responseText);
//   }
//   console.log(this.readyState);
//   console.log(this.status);
// };
