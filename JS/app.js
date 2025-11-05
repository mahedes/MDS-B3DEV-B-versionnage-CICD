let todos = [];

document.querySelector(".new-todo").onkeypress = function (e) {
  if (e.key === "Enter" && this.value) {
    todos.push({ text: this.value, done: false, createdAt: new Date() });
    this.value = "";
    show();
  }
};

function show() {
  const list = document.querySelector(".todo-list");
  list.innerHTML = "";

  todos.forEach((todo, i) => {
    list.innerHTML += `
			<li class="${todo.done ? "completed" : ""}">
				<div class="view">
					<input class="toggle" type="checkbox" ${
            todo.done ? "checked" : ""
          } onchange="toggle(${i})">
					<label>
					${todo.text}
					<small style ="display: block; font-size:12px; color:#888;">
					(créé le ${new Date(todo.createdAt).toLocaleDateString()} à ${new Date(
      todo.createdAt
    ).toLocaleTimeString()})
					</small>
					</label>
					<button class="destroy" onclick="remove(${i})"></button>
				</div>
			</li>
		`;
  });

  const left = todos.filter((t) => !t.done).length;
  document.querySelector(
    ".todo-count"
  ).innerHTML = `<strong>${left}</strong> left`;
}

function toggle(i) {
  todos[i].done = !todos[i].done;
  show();
}

function remove(i) {
  todos.splice(i, 1);
  show();
}

show();
