let todos = [];

const input = document.querySelector('.new-todo');
const prioritySelect = document.querySelector('.priority-select');
const list = document.querySelector('.todo-list');
const count = document.querySelector('.todo-count');
const clearCompletedBtn = document.querySelector('.clear-completed');

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && input.value.trim() !== '') {
    todos.push({
      text: input.value.trim(),
      priority: prioritySelect.value
    });

    input.value = '';
    prioritySelect.value = "low";
    render();
  }
});

function render() {
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div class="view">
        <label>${todo.text}</label>
        <span class="priority ${todo.priority}">${todo.priority}</span>
      </div>
    `;

    // Bouton supprimer
    const destroyBtn = document.createElement('button');
    destroyBtn.className = 'destroy';
    destroyBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      render();
    });

    li.querySelector('.view').appendChild(destroyBtn);

    list.appendChild(li);
  });

  updateCount();
}

function updateCount() {
  const total = todos.length;
  count.innerHTML = `<strong>${total}</strong> total`;
}

clearCompletedBtn.addEventListener('click', () => {
  todos = [];
  render();
});

render();
