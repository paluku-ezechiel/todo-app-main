const ul = document.querySelector("#todo-list");
const clearComplete = document.querySelector("#clear-completed");
const filterBtn = document.querySelectorAll(".filter-btn");
let currentFilter = "all";

// Ajout de la todo a partir de l'input
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");

const itemLeft = document.querySelector("#items-left");

let todos = [
  { id: 1, text: "Complete only javascript course", completed: false },
  { id: 2, text: "Drag and drop to reorder list", completed: false },
  { id: 3, text: "Read for 1 hour", completed: false },
];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    const value = input.value;
    addTodo(value);
    input.value = "";
  } else {
    alert("La zone de saisie ne doit pas etre vide");
  }
});

clearComplete.addEventListener("click", () => {
  todos = todos.filter((el) => el.completed === false);
  fetchAllTodos();
});

filterBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    const target = e.target;
    const value = target.dataset.filter;
    currentFilter = value;

    fetchAllTodos();
  });
});

const fetchAllTodos = () => {
  let tableauAAfficher;
  if (currentFilter === "active") {
    tableauAAfficher = todos.filter((el) => el.completed === false);
  } else if (currentFilter === "completed") {
    tableauAAfficher = todos.filter((el) => el.completed === true);
  } else {
    tableauAAfficher = todos;
  }
  const todoNodes = tableauAAfficher.map((todo) => {
    return createTodoElement(todo);
  });

  ul.innerHTML = "";
  ul.append(...todoNodes);

  const countFalsyTodo = todos.filter((el) => el.completed === false);
  const count = countFalsyTodo.length;
  itemLeft.innerText = `${count} items left`;
};

const createTodoElement = (todo) => {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  const todoItemLeft = document.createElement("div");
  todoItemLeft.classList.add("todo-item-left");

  const circleDecoration = document.createElement("span");
  circleDecoration.classList.add("circle-decoration");

  circleDecoration.addEventListener("click", () => {
    toggleCircleTodo(todo.id);
  });

  const todoText = document.createElement("p");
  todoText.classList.add("todo-text");
  todoText.innerText = todo.text;

  if (todo.completed) {
    circleDecoration.classList.add("checked");
    todoText.classList.add("completed-text");
    todoItem.classList.add("todo-item");
  }

  const deleteTodo = document.createElement("button");
  deleteTodo.classList.add("delete-btn");

  deleteTodo.addEventListener("click", () => {
    deleteTodoElement(todo.id);
  });

  const img = document.createElement("img");
  img.src = "./images/icon-cross.svg";
  img.alt = "delete todo";

  todoItemLeft.append(circleDecoration, todoText);
  deleteTodo.appendChild(img);

  todoItem.append(todoItemLeft, deleteTodo);

  return todoItem;
};

const addTodo = (text) => {
  todos.push({
    id: new Date.now(),
    text,
    completed: false,
  });

  fetchAllTodos();
};

const deleteTodoElement = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
  }

  fetchAllTodos();
};

const toggleCircleTodo = (id) => {
  const todoCircle = todos.find((el) => el.id === id);
  if (todoCircle) {
    todoCircle.completed = !todoCircle.completed;
  } else {
    console.log("Erreur: Aucun todo trouvé avec l'id", id);
  }
  fetchAllTodos();
};

fetchAllTodos();
