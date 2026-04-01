// Firebase Application
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Set target date
const target = new Date("May 28, 2026 15:30:00").getTime();

// Update timer every 1s
const timer = setInterval(() => {
    const diff = target - new Date().getTime();

    //Convert ms to days, hours, mins, seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerText = `${days}d ${hours}h ${mins}m ${secs}s`;

    // Stop when finished
    if (diff < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerText = "YAY";

    }
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addToDo');
    const input = document.getElementById('task');
    const assigneeSelect = document.getElementById('assignee');
    const brideList = document.getElementById('brideTasks');
    const groomList = document.getElementById('groomTasks');

    // Load saved tasks when page opens
    loadTasks();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskText = input.value.trim();
        if (taskText === '') return;

        const assignee = assigneeSelect.value;

        const task = {
            text: taskText,
            assignee: assignee
        };

        addTaskToDOM(task);
        saveTask(task);

        input.value = '';
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const span = document.createElement('span');
        span.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';

        deleteBtn.addEventListener('click', function() {
            li.remove();
            removeTask(task);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        if (task.assignee === 'bride') {
            brideList.appendChild(li);
        } else {
            groomList.appendChild(li);
        }
    }

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    function removeTask(taskToRemove) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskToRemove.text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});