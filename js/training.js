const ul = document.querySelector("#todo-list");
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const clearCompleted = document.querySelector("#clear-completed");
const itemsLeft = document.querySelector("#items-left");
const filterBtn = document.querySelectorAll(".filter-btn");
let currentFilter = "all";

let todos = [
  { id: 1, text: "Complete only javascript course", completed: false },
  { id: 2, text: "Drag and drop to reorder list", completed: false },
  { id: 3, text: "Read for 1 hour", completed: false },
];

filterBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    const target = e.target;
    const filter = target.dataset.filter;
    currentFilter = filter;

    fetchAll();
  });
});

clearCompleted.addEventListener("click", () => {
  if (todos.length) {
    todos = todos.filter((el) => el.completed === false);
  }
  fetchAll();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  addTodo(value);
  input.value = "";
});

const fetchAll = () => {
  let tableauAAfficher;
  if (currentFilter === "active") {
    tableauAAfficher = todos.filter((el) => el.completed === false);
  } else if (currentFilter === "completed") {
    tableauAAfficher = todos.filter((el) => el.completed === true);
  } else {
    tableauAAfficher = todos;
  }
  const response = tableauAAfficher.map((todo) => {
    return createTodoElement(todo);
  });

  ul.innerHTML = "";
  ul.append(...response);

  const countIndex = todos.filter((todo) => todo.completed === false);
  const count = countIndex.length;
  itemsLeft.innerText = `${count} items left`;
};

const createTodoElement = (todo) => {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  const todoItemLeft = document.createElement("div");
  todoItemLeft.classList.add("todo-item-left");
  const circleDecoration = document.createElement("span");
  circleDecoration.classList.add("circle-decoration");

  circleDecoration.addEventListener("click", () => {
    toggleCircleDecoration(todo.id);
  });

  const todoText = document.createElement("p");
  todoText.classList.add("todo-text");
  todoText.innerText = todo.text;
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  const img = document.createElement("img");
  img.src = "./images/icon-cross.svg";
  img.alt = "delete todo";

  if (todo.completed) {
    circleDecoration.classList.add("checked");
    todoText.classList.add("completed-text");
  }

  deleteBtn.addEventListener("click", () => {
    deleteTodo(todo.id);
  });

  todoItemLeft.append(circleDecoration, todoText);
  deleteBtn.appendChild(img);
  todoItem.append(todoItemLeft, deleteBtn);
  return todoItem;
};

const addTodo = (text) => {
  todos.push({
    id: Date.now(),
    text,
    completed: false,
  });
  fetchAll();
};

const deleteTodo = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
  fetchAll();
};

const toggleCircleDecoration = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  } else {
    console.log("Erreur: Aucun todo trouvé avec l'id", id);
  }

  fetchAll();
};

fetchAll();
