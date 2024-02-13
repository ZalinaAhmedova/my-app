import Form from '../Form/Form';
import './App.css';
import {useState} from 'react';

function App() {
    const [todos, setTodos] = useState([]); //состояние todo содержит пустой массив
    const [allTodos, setAllTodos] = useState(0);
    const [allComplete, setAllComplete] = useState(0);

    const putTodo = (value) => {  //функция
      if (value) {
        setTodos([...todos, {id: Date.now(), text: value, done: false}])
        setAllTodos(allTodos + 1);
        //меняем состояние todos на прошлый todos с помощью rest-оператора + непонятная мне конструкция
      } else { //если ничего не введено
        alert("Введите текст!")
      }
    }

    const toggleTodo = (id) => {
      setTodos(todos.map(todo => {
        if (todo.id !== id) return todo;
         //прохожу по каждому туду, если его id и id li-шки не совпадают, возвращаем todo
         setAllComplete(allComplete + 1);
         /*todos.filter(todo => todo.done === true).length*/
         //как сделать чтобы состояние allComplete менялось после изменения параметра done у todo
         return {
          ...todo, done: !todo.done,  //если совпадают, возвращаем todo с пом. spread-оператора +
                                    //его поле done меняем на обратное (true/false) 
        }
      }
      ))
    }
    
    const removeTodo = (id) => {
      setTodos(todos.filter(todo => todo.id !== id))
      setAllTodos(allTodos - 1);
      // функция filter создает новый массив исходя из переданного ему условия
      // новый массив содержит все элементы которые возвращают true из условия 
    }

    /*const completeTodo = () => {
      
    }*/

    const clearTodos = () => {
      setTodos([]);
      setAllTodos(0);
      setAllComplete(0);
    }

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="title">TodoList</h1>
        <Form 
        putTodo={putTodo}
        />
        <ul className="todos"> {
          todos.map(todo => {
            return (
              <li className={todo.done ? 'todo done' : 'todo'} key={todo.id} onClick={() => toggleTodo(todo.id)}> 
                {todo.text}
                <img src="./delete.png" className="delete" alt="delete" onClick={e => {
                  e.stopPropagation();
                  removeTodo(todo.id);
                }}></img>
              </li>
              
            );
            /*key нужен чтобы реакту было легче взаимодействовать со списками, чтобы не приходилось
              перерендерить весь список, а только тот элемент, который был изменен*/
            /*динамический класс у li означает что если поле done у todo = true, то указываем его класс todo done*/
          })}
          <div className="info">
            <span>All todos: {allTodos}</span>
            <span>Complete: {allComplete}</span>
          </div>
          <button className="btn" onClick={clearTodos}>Clear All</button>
        </ul>
      </div>
    </div>
  );
}

export default App;
