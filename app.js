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

javascript// Render single task
function renderTask(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;
    
    li.innerHTML = `
        <button class="btn-complete" aria-label="Markera som ${task.completed ? 'ej klar' : 'klar'}">
            ${task.completed ? '↩️' : '✓'}
        </button>
        <span class="task-text">${escapeHtml(task.title)}</span>
        <span class="priority ${task.priority}">${task.priority}</span>
        <button class="btn-delete" aria-label="Ta bort task">🗑️</button>
    `;
    
    return li;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Render all tasks
function renderTasks() {
    const filteredTasks = filterTasks(tasks, currentFilter);
    
    tasksContainer.innerHTML = '';
    
    filteredTasks.forEach(task => {
        tasksContainer.appendChild(renderTask(task));
    });
    
    updateActiveCount();
}

// Filter tasks
function filterTasks(tasks, filter) {
    switch (filter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

// Update active count
function updateActiveCount() {
    const count = tasks.filter(task => !task.completed).length;
    activeCount.textContent = count;
}
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        saveTasks();
    }
}

// Event delegation for complete button
tasksContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-complete')) {
        const taskItem = e.target.closest('.task-item');
        if (taskItem) {
            toggleComplete(taskItem.dataset.id);
        }
    }
});
javascript// Delete task
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
    saveTasks();
}

// Event delegation for delete button
tasksContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) {
        const taskItem = e.target.closest('.task-item');
        if (taskItem) {
            if (confirm('Är du säker på att du vill ta bort denna task?')) {
                deleteTask(taskItem.dataset.id);
            }
        }
    }
});
bashgit add app.js
git commit -m "feat: add delete task feature"