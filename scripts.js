document.addEventListener('DOMContentLoaded', (event) => {
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to load tasks from localStorage
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      const listItem = createTaskElement(task.text, task.checked);
      taskList.appendChild(listItem);
    });
  };

  // Function to save tasks to localStorage
  const saveTasks = () => {
    const tasks = [];
    taskList.querySelectorAll('.list-group-item').forEach(item => {
      const taskText = item.querySelector('.task-text').textContent;
      const isChecked = item.querySelector('.checkbox-input').checked;
      tasks.push({ text: taskText, checked: isChecked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Function to create task element
  const createTaskElement = (taskText, isChecked) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-input mr-3';
    checkbox.checked = isChecked;

    const taskSpan = document.createElement('span');
    taskSpan.className = 'flex-grow-1 task-text'; // Ensures the task text grows and aligns properly
    taskSpan.textContent = taskText;
    if (isChecked) {
      taskSpan.style.textDecoration = 'line-through';
    }

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        taskSpan.style.textDecoration = 'line-through';
      } else {
        taskSpan.style.textDecoration = 'none';
      }
      saveTasks(); // Save tasks on checkbox change
    });

    taskSpan.addEventListener('click', () => {
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        taskSpan.style.textDecoration = 'line-through';
      } else {
        taskSpan.style.textDecoration = 'none';
      }
      saveTasks(); // Save tasks on task text click
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-circle';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(listItem);
      saveTasks(); // Save tasks on delete button click
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteBtn);
    return listItem;
  };

  // Event listener for Add button
  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const listItem = createTaskElement(taskText, false); // Initial state of checkbox is false
      taskList.appendChild(listItem);
      taskInput.value = '';
      saveTasks(); // Save tasks on add new task
    }
  });

  // Event listener for Enter key in input field
  taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        const listItem = createTaskElement(taskText, false); // Initial state of checkbox is false
        taskList.appendChild(listItem);
        taskInput.value = '';
        saveTasks(); // Save tasks on add new task
      }
    }
  });

  // Load tasks when DOM content is loaded
  loadTasks();

  // Adding hover effect
  taskList.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('task-text')) {
      event.target.style.cursor = 'pointer';
    }
  });

  taskList.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('task-text')) {
      event.target.style.cursor = 'default';
    }
  });
});
