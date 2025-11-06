document.addEventListener("DOMContentLoaded", function () {
  let todos = [];

  const input = document.querySelector(".new-todo");
  const prioritySelect = document.querySelector(".priority-select");
  const list = document.querySelector(".todo-list");
  const count = document.querySelector(".todo-count");
  const clearCompletedBtn = document.querySelector(".clear-completed");
  const footer = document.querySelector(".footer");
  const main = document.querySelector(".main");

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
      todos.push({
        text: input.value.trim(),
        priority: prioritySelect.value,
        createdAt: new Date(),
      });

      input.value = "";
      prioritySelect.value = "low";
      render();
    }
  });

  function render() {
    list.innerHTML = "";

    if (todos.length === 0) {
      footer.classList.add("hidden");
      main.classList.add("empty");
      return;
    } else {
      footer.classList.remove("hidden");
      main.classList.remove("empty");
    }

    todos.forEach((todo, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <div class="view">
          <label>${todo.text}
            <small style="display:block; font-size:12px; color:#888; margin-top:4px;">
  ${
    todo.updatedAt
      ? `Modifié le ${new Date(todo.updatedAt).toLocaleDateString(
          "fr-FR"
        )} à ${new Date(todo.updatedAt).toLocaleTimeString("fr-FR")}`
      : `Créé le ${new Date(todo.createdAt).toLocaleDateString(
          "fr-FR"
        )} à ${new Date(todo.createdAt).toLocaleTimeString("fr-FR")}`
  }
</small>
          </label>
          <span class="priority ${todo.priority}">${getPriorityText(
        todo.priority
      )}</span>
        </div>
      `;

      // Bouton modifier
      const editBtn = document.createElement("button");
      editBtn.className = "edit";
      editBtn.textContent = "✎"; // un petit crayon
      editBtn.addEventListener("click", () => {
        const newText = prompt("Modifier la tâche :", todo.text);
        if (newText && newText.trim() !== "") {
          todo.text = newText.trim();
          todo.updatedAt = new Date();
          render();
        }
      });

      const destroyBtn = document.createElement("button");
      destroyBtn.className = "destroy";
      destroyBtn.textContent = "×";
      destroyBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        render();
      });

      li.querySelector(".view").appendChild(editBtn);
      li.querySelector(".view").appendChild(destroyBtn);
      list.appendChild(li);
    });

    updateCount();
  }

  function getPriorityText(priority) {
    const priorities = {
      low: "Faible",
      medium: "Moyenne",
      high: "Haute",
    };
    return priorities[priority] || priority;
  }

  function updateCount() {
    const total = todos.length;
    count.innerHTML = `<strong>${total}</strong> ${
      total > 1 ? "restantes" : "restante"
    }`;
  }

  clearCompletedBtn.addEventListener("click", () => {
    todos = [];
    render();
  });

  render();
});
