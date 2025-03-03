import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

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

// Service Worker Registration
const sw = new URL('service-worker.js', import.meta.url);
if ('serviceWorker' in navigator) {
    const s = navigator.serviceWorker;
    s.register(sw.href, {
        scope: '/To-Do-App/'
    })
    .then(_ => console.log('Service Worker Registered for scope:', sw.href, 'with', import.meta.url))
    .catch(err => console.error('Service Worker Error:', err));
}

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Function to sanitize user input
function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
}

// Function to add task to Firestore
async function addTaskToFirestore(taskText) {
    try {
        await addDoc(collection(db, "todos"), {
            text: taskText, 
            completed: false
        });
        renderTasks(); // Refresh task list after adding
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// Function to get tasks from Firestore
async function getTasksFromFirestore() {
    try {
        const data = await getDocs(collection(db, "todos"));
        let tasks = [];
        data.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() }); 
        });
        return tasks;
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
        if (!task.completed) {
            const taskItem = document.createElement("li");
            taskItem.id = task.id;
            taskItem.textContent = task.text;
            taskList.appendChild(taskItem);
        }
    });
}

// Add Task Event Listener
addTaskBtn.addEventListener('click', async () => {
    const taskText = sanitizeInput(taskInput.value.trim());

    if (taskText) {
        await addTaskToFirestore(taskText);
        taskInput.value = "";
    }
});

// Remove Task on Click (Currently only removes from UI, not Firestore)
taskList.addEventListener('click', async (e) => {
    if (e.target.tagName === 'LI') {
        e.target.remove();
        // Here, you might want to delete the task from Firestore as well
    }
});

// Load tasks on page load
document.addEventListener("DOMContentLoaded", renderTasks);
