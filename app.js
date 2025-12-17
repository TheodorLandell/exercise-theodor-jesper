// Data
let tasks = [];
let currentFilter = 'all';

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const tasksContainer = document.getElementById('tasks-container');
const activeCount = document.getElementById('active-count');

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Create new task
function createTask(title, priority) {
    return {
        id: generateId(),
        title: title,
        priority: priority,
        completed: false,
        createdAt: new Date().toISOString()
    };
}

// Add task
function addTask(title, priority) {
    const task = createTask(title, priority);
    tasks.push(task);
    return task;
}

// Form submit handler
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = taskInput.value.trim();
    const priority = prioritySelect.value;
    
    if (title) {
        addTask(title, priority);
        taskInput.value = '';
        renderTasks();
        saveTasks();
    }
});