document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const emptyImage = document.querySelector(".empty-image");
  const progress = document.getElementById("progress");
  const numbers = document.getElementById("numbers");

  const toggleEmpty = () => {
    emptyImage.style.display = taskList.children.length ? "none" : "block";
  };

  const updateProgress = () => {
    const total = taskList.children.length;
    const completed = taskList.querySelectorAll(".checkbox:checked").length;

    progress.style.width = total ? `${(completed / total) * 100}%` : "0%";
    numbers.textContent = `${completed} / ${total}`;

    if (total > 0 && completed === total) Confetti();
  };

  const saveTasks = () => {
    const tasks = [...taskList.children].map(li => ({
      text: li.querySelector("span").textContent,
      completed: li.querySelector(".checkbox").checked
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
  };

  const addTask = (text, completed = false) => {
    const taskText = text || taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${completed ? "checked" : ""}>
      <span>${taskText}</span>
      <div class="task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    const checkbox = li.querySelector(".checkbox");
    const editBtn = li.querySelector(".edit-btn");

    if (completed) li.classList.add("completed");

    checkbox.addEventListener("change", () => {
      li.classList.toggle("completed", checkbox.checked);
      updateProgress();
      saveTasks();
    });

    editBtn.addEventListener("click", () => {
      if (!checkbox.checked) {
        taskInput.value = li.querySelector("span").textContent;
        li.remove();
        saveTasks();
        updateProgress();
        toggleEmpty();
      }
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
      saveTasks();
      updateProgress();
      toggleEmpty();
    });

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
    updateProgress();
    toggleEmpty();
  };

  addTaskBtn.addEventListener("click", e => {
    e.preventDefault();
    addTask();
  });

  taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });

  loadTasks();
  toggleEmpty();
  updateProgress();
});

function Confetti() {
  confetti({ particleCount: 150, spread: 100, origin: { y: 0.7 } });
}
