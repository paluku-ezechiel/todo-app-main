const form = document.querySelector("form");
const input = document.querySelector("#todo-input");
const ul = document.querySelector("#todo-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") return;
  const value = input.value;
  addTodo(value);
  input.value = "";
});

const todos = [
  { id: 1, text: "Complete only javascript course", completed: false },
  { id: 2, text: "Drag and drop to reorder list", completed: false },
  { id: 3, text: "Read for 1 hour", completed: false },
];

const fetchTodo = () => {
  const todoNodes = todos.map((todo) => {
    return createTodoElement(todo);
  });
  ul.innerHTML = "";
  ul.append(...todoNodes);
};

const createTodoElement = (todo) => {
  const li = document.createElement("li");
  li.className = "todo-item";

  const todoItemLeft = document.createElement("div");
  todoItemLeft.className = "todo-item-left";

  const circleDecoration = document.createElement("span");
  circleDecoration.classList.add("circle-decoration");

  const todoText = document.createElement("p");
  todoText.id = "todo-text";
  todoText.classList.add("todo-text");
  todoText.innerText = `${todo.text}`;

  if (todo.completed) {
    circleDecoration.classList.add("checked");
    todoText.classList.add("completed-text");
    li.classList.add("todo-completed");
  }

  circleDecoration.addEventListener("click", (e) => {
    toggleCircleDecoration(todo.id);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteTodo(todo.id);
  });

  const img = document.createElement("img");
  img.src = "./images/icon-cross.svg";
  img.alt = "delete todo";

  todoItemLeft.append(circleDecoration, todoText);
  deleteBtn.appendChild(img);
  li.append(todoItemLeft, deleteBtn);
  return li;
};

const addTodo = (text) => {
  todos.push({
    id: Date.now(),
    text,
    completed: false,
  });

  fetchTodo();
};

const deleteTodo = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
  fetchTodo();
};

const toggleCircleDecoration = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  console.log(todo);
  if (todo) {
    todo.completed = !todo.completed;
  } else {
    console.log("Erreur: Aucun todo trouvé avec l'id", id);
  }
  fetchTodo();
};

fetchTodo();
