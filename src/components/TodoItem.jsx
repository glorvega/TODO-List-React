import React from 'react'

function TodoItem({todo, toggleTodo}) {
    const {id, task, completed} = todo;
const handleTodoClick = () => {
    toggleTodo(id);
}

  return <li><input type="checkbox" checked={completed} onChange={handleTodoClick}/>{task}</li>;
}

export default TodoItem;

//el todo item recibe el objeto todo que está declarado en el useState de la app