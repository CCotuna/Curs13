import { useTasksStore } from "@/stores/tasks.js";

export const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  console.log(`Connected to server`);
};

ws.onmessage = ws => {
  //   const taskStore = useTasksStore();
  //   taskStore.lists = JSON.parse(ws.data);
  console.log("Message from server:", ws.data);
};
