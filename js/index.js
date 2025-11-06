document.addEventListener("DOMContentLoaded", function () {
      let todos = [];
      let filter = 'all';

      const input = document.querySelector(".new-todo");
      const prioritySelect = document.querySelector(".priority-select");
      const list = document.querySelector(".todo-list");
      const count = document.querySelector(".todo-count");
      const clearCompletedBtn = document.querySelector(".clear-completed");
      const footer = document.querySelector(".footer");
      const main = document.querySelector(".main");
      const filterLinks = document.querySelectorAll(".filters a");

      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && input.value.trim() !== "") {
          todos.push({
            text: input.value.trim(),
            priority: prioritySelect.value,
            createdAt: new Date(),
            completed: false
          });

          input.value = "";
          prioritySelect.value = "low";
          render();
        }
      });

      filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          filterLinks.forEach(l => l.classList.remove('selected'));
          link.classList.add('selected');
          
          const hash = link.getAttribute('href');
          if (hash === '#/') filter = 'all';
          else if (hash === '#/active') filter = 'active';
          else if (hash === '#/completed') filter = 'completed';
          
          render();
        });
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

        const filteredTodos = todos.filter(todo => {
          if (filter === 'active') return !todo.completed;
          if (filter === 'completed') return todo.completed;
          return true;
        });

        filteredTodos.forEach((todo, index) => {
          const actualIndex = todos.indexOf(todo);
          const li = document.createElement("li");
          if (todo.completed) {
            li.classList.add('completed');
          }

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

          // Bouton compléter
          const completeBtn = document.createElement("button");
          completeBtn.className = "complete" + (todo.completed ? " completed" : "");
          completeBtn.textContent = todo.completed ? "↻" : "✓";
          completeBtn.title = todo.completed ? "Marquer comme active" : "Marquer comme terminée";
          completeBtn.addEventListener("click", () => {
            todo.completed = !todo.completed;
            render();
          });

          // Bouton modifier
          const editBtn = document.createElement("button");
          editBtn.className = "edit";
          editBtn.textContent = "✎";
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
            const confirmation = confirm("Vous êtes sûr de vouloir le supprimer ?");
            if (confirmation) {
              todos.splice(actualIndex, 1);
              render();
            }
          });

          li.querySelector(".view").appendChild(completeBtn);
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
        const activeTodos = todos.filter(t => !t.completed).length;
        count.innerHTML = `<strong>${activeTodos}</strong> ${
          activeTodos > 1 ? "restantes" : "restante"
        }`;
      }

      clearCompletedBtn.addEventListener("click", () => {
        if (todos.length === 0) return;

        const confirmation = confirm("Vous êtes sûr de vouloir tout effacer ?");
        if (confirmation) {
          todos = [];
          render();
        }
      });

      render();
    });