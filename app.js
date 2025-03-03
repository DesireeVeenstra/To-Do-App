import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBUH1UBpxBHmemq6zUWD7YgsrRst9ehSuc",
    authDomain: "to-do-app-b467e.firebaseapp.com",
    projectId: "to-do-app-b467e",
    storageBucket: "to-do-app-b467e.firebasestorage.app",
    messagingSenderId: "712733840609",
    appId: "1:712733840609:web:759d166d125bb6398c13a0",
    measurementId: "G-RHCN1Z4FLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Register Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register(new URL("service-worker.js", import.meta.url), { scope: "./" })
        .then(() => console.log("Service Worker Registered"))
        .catch((err) => console.error("Service Worker Error:", err));
}

// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to sanitize user input
function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
}

// Function to add task to Firestore
async function addTaskToFirestore(taskText) {
    try {
        await addDoc(collection(db, "todos"), { text: taskText, completed: false });
        renderTasks(); // Refresh task list after adding
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// Function to delete task from Firestore
async function deleteTaskFromFirestore(taskId) {
    try {
        await deleteDoc(doc(db, "todos", taskId));
        renderTasks(); // Refresh task list after deletion
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// Function to get tasks from Firestore
async function getTasksFromFirestore() {
    try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        return [];
    }
}

// Function to render tasks in the UI
async function renderTasks() {
    const tasks = await getTasksFromFirestore();
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.id = task.id;
        taskItem.textContent = task.text;

        // Add delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", async () => {
            await deleteTaskFromFirestore(task.id);
        });

        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    });
}

// Event Listener to Add Task
addTaskBtn.addEventListener("click", async () => {
    const taskText = sanitizeInput(taskInput.value.trim());
    if (taskText) {
        await addTaskToFirestore(taskText);
        taskInput.value = "";
    }
});

// Load tasks on page load
document.addEventListener("DOMContentLoaded", renderTasks);