const Input = ({ addTodo, text, setText }) => {
    return (
        <label>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && addTodo(text)}
            />
            <button onClick={addTodo}>add todo</button>
        </label>
    )
}

export default Input