import './App.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/todoSlice';
import TodoList from './components/TodoList';
import Input from './components/Input';

function App() {
    //inputHandler
    const [text, setText] = useState('');
    const dispatch = useDispatch()

    const buttonHandler = () => {
        if (text.length !== 0) {
            dispatch(addTodo({ text }))
        }
        setText('')
    }
    //inputHandler



    const [boards, setBoards] = useState([
        { id: 1, title: 'Сделать', items: [{ id: 1, title: 'Пойти магаз' }, { id: 2, title: 'Пойти магаз2' }, { id: 3, title: 'Пойти магаз3' }] },
        { id: 2, title: 'В процессе', items: [{ id: 4, title: 'Пойти магаз4' }, { id: 5, title: 'Пойти магаз5' }, { id: 6, title: 'Пойти магаз6' }] },
        { id: 3, title: 'Сделано', items: [{ id: 7, title: 'Пойти магаз7' }, { id: 8, title: 'Пойти магаз8' }, { id: 9, title: 'Пойти магаз9' }] },
    ])

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null)

    const dragOverHandler = (e) => {
        e.preventDefault()
        if (e.target.className == 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    const dragLeaveHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }

    const dragStartHandler = (e, board, item) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    const dragEndHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }

    const dropHandler = (e, board, item) => {
        e.target.style.boxShadow = 'none'
        e.preventDefault()
        e.stopPropagation()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }

            if (b.id === currentBoard.id) {
                return currentBoard
            }

            return b
        }))
    }

    const dropCardHandler = (e, board) => {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }

            if (b.id === currentBoard.id) {
                return currentBoard
            }

            return b
        }))
    }

    return (
        <div className="App">
            <Input
                addTodo={buttonHandler}
                text={text}
                setText={setText}
            />
            <TodoList />

            <div className='app2'>
                {boards.map(board =>
                    <div
                        className='board'
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropCardHandler(e, board)}
                    >
                        <div className='board__title'>{board.title}</div>
                        {board.items.map(item =>
                            <div
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                // className='todo'
                                draggable={true}
                                className='item'
                            >
                                {item.title}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
