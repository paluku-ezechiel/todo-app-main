const form = document.querySelector("form");
const input = document.querySelector("#todo-input");
const ul = document.querySelector("#todo-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  addTodo(value)
  input.value = "";
});

const todos = [
  { id: 1, text: "Complete only javascript course" },
  { id: 2, text: "Drag and drop to reorder list" },
  { id: 3, text: "Read for 1 hour" },
];

const fetchTodo = () => {
  const todoNodes = todos.map((todo, index) => {
    return createTodoElement(todo, index);
  });
  ul.innerHTML = "";
  ul.append(...todoNodes);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  li.className = "todo-item";

  const todoItemLeft = document.createElement("div");
  todoItemLeft.className = "todo-item-left";

  const circleDecoration = document.createElement("span");
  circleDecoration.classList.add("circle-decoration");

  const todoText = document.createElement("p");
  todoText.id = "todo-text";
  todoText.classList.add("todo-text");
  todoText.innerHTML = `${todo.text}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");

  const img = document.createElement("img");
  img.src = "./images/icon-cross.svg";
  img.alt = "delete todo";

  todoItemLeft.append(circleDecoration, todoText);
  deleteBtn.appendChild(img);
  li.append(todoItemLeft, deleteBtn);
  return li;
};

fetchTodo();
