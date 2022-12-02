import { useDispatch } from "react-redux";
import IconCheckboxTodo from "../assets/IconCheckboxTodo";
import IconDeleteTodo from "../assets/IconDeleteTodo";
import IconEditTodo from "../assets/IconEditTodo";
import { removeTodo } from '../store/todoSlice';
import { isCompletedTodo } from '../store/todoSlice';
import { editTodo } from '../store/todoSlice';

const TodoItem = ({ id, text, completed }) => {
    const dispatch = useDispatch()

    return (
        <li>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => dispatch(isCompletedTodo({ id }))}
            />

            <span>{text}</span>

            <div onClick={() => dispatch(editTodo({ id }))}>
                <IconEditTodo />
            </div>
            
            <div onClick={() => dispatch(removeTodo({ id }))} >
                <IconDeleteTodo />
            </div>


        </li>
    )
}

export default TodoItem