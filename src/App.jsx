import React, { useRef } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react"; // es un hook que permite ejecutar codigo en el momento que se crea el compontente
//en useState el estado es una propiedad que renderiza el componente cada vez que hagamos modificaciones
//useRef para utilizar referencias de diferentes puntos del codigo

const KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: "tarea 1", completed: false },
  ]);

  const todoTaskRef = useRef();

  //Comprueba que no tenemos toDos en cache, y si las hay, las muestra de nuevo
  useEffect(() => {
    console.log('primer console', localStorage.getItem(KEY));

    if (localStorage.getItem(KEY) !== 'undefined') {
      const storedTodos = JSON.parse(localStorage.getItem(KEY));
      if (storedTodos) {
        setTodos(storedTodos);
      }
    }
  }, []);


  //recibe una funcion callback y luego un array de dependencias
  //que si lo dejas vacío hace que se ejecute la función cuando se crea el componente, pero si
  //quieres ejecutarlo continuamente hay que indicar las variables y dependencias que quieres que esté
  //escuchando para usar el useEffect
  //en este caso queremos escuchar el array de todos

  const toggleTodo = (id) => {
    //esto va a recibir el id del todo y crea una copa de los todos con newTodos
    const newTodos = [...todos]; //copia
    const todo = newTodos.find((todo) => todo.id === id); //buscame el todo cuyo id es igual al id que estamos pasando
    todo.completed = !todo.completed; //si estaba a true la ponemos a false y vice-versa
    setTodos(newTodos);
    localStorage.setItem(KEY, JSON.stringify(newTodos));
  };

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === "") return;
    setTodos((prevTodos) => {
      localStorage.setItem(KEY, JSON.stringify([...prevTodos, { id: uuidv4(), task, completed: false }]));
      return [...prevTodos, { id: uuidv4(), task, completed: false }];
    }); //añadimos la nueva tarea al array de estados con setTodos. Si haces cambios en el estado tienes que hacer una copia del anterior estado

    /* todoTaskRef.target.reset(); */
    todoTaskRef.current.value = null;
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    localStorage.setItem(KEY, JSON.stringify(newTodos));
  };

  return (
    <div className="App">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
      <button onClick={handleTodoAdd}>➕</button>
      <button onClick={handleClearAll}>🗑️</button>
      <div>
        Te quedan {todos.filter((todo) => !todo.completed).length} tareas por
        terminar
      </div>
    </div>
  );
}

export default App;

//pintamos un array vacío en TodoList
//para utilizar el useState creamos una constante y usamos el destructuring del array
//useState es un array que devuelve dos propiedades: el estado en sí y la función que hace
//modificar ese estado
//al estado en sí lo vamos a llamar todos y a la función la llamaremos setTodos
//el estado inicial va a ser un array
//a continuación, vamos a pintar un input para añadir las tareas
//ponemos la propiedad onClick en los botones para que escuche y ejecute una función al hacer click en ella
