import './Form.css';
import {useState} from "react";

const Form = (props) => {
    const [value, setValue] = useState("");

    return (
        <form className="form" onSubmit={e => {
            e.preventDefault(); //изменяем поведение формы, чтобы страницы не перезагружалась
            props.putTodo(value); //выполняет функцию (описана в App) с полученным значением value формы
            setValue(""); //обнуляем состояние после отправки данных
        }}>
           <input type="text" placeholder="Введите текст..." className="input" value={value} onChange={e => setValue(e.target.value)}>
            
            </input> 
        </form>
    );
};

//на каждое нажатие в input изменяем состояние с помощью event на event.target.value
export default Form;