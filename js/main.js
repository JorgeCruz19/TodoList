/* Selectors */
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

/* Event Listeners */
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

/* Functions */
function addTodo(event) {
   event.preventDefault();
   /* todo div */
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");
   /* li */
   const newTodo = document.createElement("li");
   newTodo.innerText = todoInput.value;
   newTodo.classList.add("todo-item");
   todoDiv.appendChild(newTodo);
   //Add todo a localstorage
   saveLocalStorage(todoInput.value);
   //listo
   const completeButton = document.createElement("button");
   completeButton.innerHTML = '<i class="fas fa-check"></i>';
   completeButton.classList.add("complete-btn");
   todoDiv.appendChild(completeButton);
   //delete
   const trashButton = document.createElement("button");
   trashButton.innerHTML = '<i class="fas fa-trash"></i>';
   trashButton.classList.add("trash-btn");
   todoDiv.appendChild(trashButton);
   //
   todoList.appendChild(todoDiv);
   //Clear todo input
   todoInput.value = "";
}

function deleteCheck(e) {
   const item = e.target;
   console.log(item.classList[0]);
   //delete
   if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
      //animation
      todo.classList.add("fall");
      removeLocalTodos(todo);
      todo.addEventListener("transitionend", () => {
         todo.remove();
      });
   }
   //Check Mark
   if (item.classList[0] === "complete-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
   }
}

function filterTodo(event) {
   const todos = todoList.childNodes;
   todos.forEach(function (e) {
      switch (event.target.value) {
         case "all":
            e.style.display = "flex";
            break;
         case "completed":
            if (e.classList.contains("completed")) {
               e.style.display = "flex";
            } else {
               e.style.display = "none";
            }
            break;
         case "uncompleted":
            if (!e.classList.contains("completed")) {
               e.style.display = "flex";
            } else {
               e.style.display = "none";
            }
            break;
      }
   });
}

function saveLocalStorage(todo) {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.forEach((todo) => {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      /* li */
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      //listo
      const completeButton = document.createElement("button");
      completeButton.innerHTML = '<i class="fas fa-check"></i>';
      completeButton.classList.add("complete-btn");
      todoDiv.appendChild(completeButton);
      //delete
      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //
      todoList.appendChild(todoDiv);
   });
}
//https://mega.nz/folder/Ep8DkaIa#iwZl6ZYXcDp-Yp5rqmLV3w
function removeLocalTodos(todo){
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem('todos', JSON.stringify(todos));
}