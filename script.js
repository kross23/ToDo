'use strict';
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input');

const todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function () {
    todoData = JSON.parse( localStorage.getItem('key')); /// object = JSON.parse (localStorage.getItem ("object"));
    todoList.textContent = '';
    todoCompleted.textContent = '';

    console.log(todoData);
    if (todoData !== null) {
        todoData.forEach(function (item, index, object) {
            const Li = document.createElement('li');
            Li.classList.add('todo-item');
            Li.innerHTML = `<span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
            </div>`;
            if (item.completed) {
                todoCompleted.append(Li);
            } else {
                todoList.append(Li);
            }

            const todoComplet = Li.querySelector('.todo-complete');
            const todoRemove = Li.querySelector('.todo-remove');

            todoComplet.addEventListener('click', function () {
                item.completed = !item.completed;
                localStorage.setItem('key', JSON.stringify(todoData));
                render();

            });
            todoRemove.addEventListener('click', function () {
                object.splice(index, 1);
                localStorage.setItem('key', JSON.stringify(todoData));
                render();
            });
        });
    }
    //сериализуем его
    localStorage.setItem('key', JSON.stringify(todoData));
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false,
        };
        todoData[todoData.length] = newTodo;
        localStorage.setItem('key', JSON.stringify(todoData));
    }
    headerInput.value = '';
    render();
});

render();

//localStorage.clear();