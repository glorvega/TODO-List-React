import React from 'react'
import TodoItem from './TodoItem';

function TodoList({todos, toggleTodo}) { //TodoList va a recibir unas propiedades, entre ellas un array de todos
  return ( //en esta lista ul llamamos al {todos} y lo insertamos en el codigo
    <ul>
    {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
    ))}
    </ul> //recorremos cada todo y por cada uno imprimimos un componente todoItem con una propiedad todo
  )
}

export default TodoList;

//react a la hora de crear listas necesita tener una propiedad key