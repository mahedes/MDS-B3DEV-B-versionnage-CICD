document.addEventListener('DOMContentLoaded', function() {
  const todoList = document.querySelector('.todo-list');
  const clearBtn = document.querySelector('.clear-completed');
  const input = document.querySelector('.new-todo');
  const todoCount = document.querySelector('.todo-count');

  function updateCount() {
    const count = todoList.children.length;
    todoCount.textContent = `${count} left`;
  }

  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      const li = document.createElement('li');
      li.textContent = input.value;
      todoList.appendChild(li);
      input.value = '';
      updateCount();
    }
  });

  clearBtn.addEventListener('click', function() {
    todoList.innerHTML = '';
    updateCount();
  });

  updateCount();
});
