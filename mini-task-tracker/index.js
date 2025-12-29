const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Show tasks d
displayTasks();

// Add Task
     taskForm.addEventListener("submit", function (e) {
         e.preventDefault();

  const title =    document.getElementById("title").value.trim();
  const description =   document.getElementById("description").value.trim();

  if (title === "")  
    {
   
        alert("Task title required");
    return;
  }

  const task = {
    id:  Date.now(),
    title,
    description
  };

  tasks.push(task)

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskForm.reset()
  displayTasks()
});


function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${task.title}</strong>
      <p>${task.description || ""}</p>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(li);
  });
}
//dete 
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}