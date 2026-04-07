const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Versão 2.0 - atualizado para testes

const loadTasks = () => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
};

const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const createTaskElement = (task) => {
  const li = document.createElement('li');
  li.className = `task-item${task.completed ? ' completed' : ''}`;
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', `Marcar "${task.text}" como concluída`);
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '✕';
  deleteBtn.setAttribute('aria-label', `Remover tarefa "${task.text}"`);
  deleteBtn.addEventListener('click', () => removeTask(task.id));

  li.append(checkbox, span, deleteBtn);
  return li;
};

const renderTasks = () => {
  const tasks = loadTasks();
  taskList.innerHTML = '';
  tasks.forEach((task) => taskList.appendChild(createTaskElement(task)));
};

const addTask = (text) => {
  const tasks = loadTasks();
  const newTask = { id: Date.now(), text, completed: false };
  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks();
};

const toggleTask = (id) => {
  const tasks = loadTasks().map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(tasks);
  renderTasks();
};

const removeTask = (id) => {
  const tasks = loadTasks().filter((task) => task.id !== id);
  saveTasks(tasks);
  renderTasks();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = '';
  input.focus();
});

renderTasks();
