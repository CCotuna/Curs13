import { defineStore } from "pinia";
import axios from "axios";

export const useTasksStore = defineStore("tasks", {
  state: () => {
    return {
      lists: [],
    };
  },
  actions: {
    addTask(id, name, favorite) {
      const newTask = {
        id,
        name,
        favorite,
      };
      this.lists.push(newTask);

      axios.post("http://localhost:3000/tasks", newTask, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("lists", JSON.stringify(this.lists));
    },
    editTask(taskId, value) {
      const taskIndex = this.lists.findIndex(task => task.id === taskId);
      this.lists[taskIndex].name = value;
      localStorage.setItem("lists", JSON.stringify(this.lists));
    },
    toggleFavorite(taskId) {
      const taskIndex = this.lists.findIndex(task => task.id === taskId);
      this.lists[taskIndex].favorite = !this.lists[taskIndex].favorite;
      localStorage.setItem("lists", JSON.stringify(this.lists));
    },
    deleteTask(taskId) {
      const taskIndex = this.lists.findIndex(task => task.id === taskId);
      this.lists.splice(taskIndex, 1);
      localStorage.setItem("lists", JSON.stringify(this.lists));
    },
  },
});
