import { defineStore } from "pinia";
import axios from "axios";

import { ws } from "@/ws.js";

export const useTasksStore = defineStore("tasks", {
  state: () => {
    return {
      lists: [],
    };
  },
  actions: {
    async addTask(name, favorite) {
      const newTask = {
        name,
        favorite,
      };
      this.lists.push(newTask);
      console.log(this.lists, "aici e lista din pinia");
      const taskRow = await axios.post("http://localhost:3000/tasks", newTask, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.lists[this.lists.length - 1].id = taskRow.data.id;

      localStorage.setItem("lists", JSON.stringify(this.lists));

      ws.send(JSON.stringify(this.lists));
    },
    editTask(taskId, value) {
      const taskIndex = this.lists.findIndex(task => task.id === taskId);
      this.lists[taskIndex].name = value;
      axios.put(
        "http://localhost:3000/tasks",
        { taskId, value },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("lists", JSON.stringify(this.lists));
    },
    toggleFavorite(taskId) {
      const taskIndex = this.lists.findIndex(task => task.id === taskId);
      this.lists[taskIndex].favorite = !this.lists[taskIndex].favorite;

      axios.put(
        "http://localhost:3000/tasks/favorite",
        { taskId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("lists", JSON.stringify(this.lists));
    },
    deleteTask(taskId) {
      console.log(taskId, "aici e taskIDDDDDD");
      const taskIndex = this.lists.findIndex(task => task.id === taskId);
      this.lists.splice(taskIndex, 1);

      axios.delete("http://localhost:3000/tasks", {
        headers: {
          "Content-Type": "application/json",
        },
        data: { taskId },
      });
      localStorage.setItem("lists", JSON.stringify(this.lists));
    },
  },
});
