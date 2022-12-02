import { createSlice } from "@reduxjs/toolkit";

const todoSlide = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        // boards: [
        //     { id: 1, title: 'Сделать'},
        //     { id: 2, title: 'В процессе'},
        //     { id: 3, title: 'Сделано'},
        // ]
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(
                {
                    id: new Date().toISOString(),
                    text: action.payload.text,
                    completed: false,
                }
            )
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        isCompletedTodo(state, action) {
            state.todos = state.todos.map((todo => {
                if (todo.id !== action.payload.id) return todo;

                return {
                    ...todo,
                    completed: !todo.completed
                }
            }))
        },
        editTodo(state, action) {
            const newTodo = prompt('type new todo here to change');
            state.todos = state.todos.filter(todo => {
                if (todo.id === action.payload.id) {
                    todo.text = newTodo
                }
                return todo
            })
        },
    }
});

export const { addTodo, removeTodo, isCompletedTodo, editTodo } = todoSlide.actions;

export default todoSlide.reducer;