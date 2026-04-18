import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import Todoitems from './Todoitems'

const Todo = () => {

  const [todoList, setTodoList] = useState(
    localStorage.getItem('todoList')
      ? JSON.parse(localStorage.getItem('todoList'))
      : []
  )

  const inputRef = useRef()

  const add = () => {
    const inputText = inputRef.current.value.trim()

    if (inputText === '') return

    const newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false
    }

    setTodoList((prev) => [...prev, newTodo])
    inputRef.current.value = ''
  }

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  return (
    <div className="min-h-screen flex items-center justify-center ">

      <div className="w-11/12 max-w-md bg-white shadow-xl rounded-2xl p-6 flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img src={todo_icon} alt="todo icon" className="w-10" />
          <h1 className="text-2xl font-bold text-gray-800">
            To-Do List
          </h1>
        </div>

        {/* Input Section */}
        <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add your task..."
            className="flex-1 h-12 px-5 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={add}
            className="bg-indigo-600 hover:bg-indigo-700 transition-all text-white px-6 h-12 font-medium"
          >
            ADD
          </button>
        </div>

        {/* Todo List */}
        <div className="mt-6 space-y-3 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
          {todoList.map((item) => (
            <Todoitems
              key={item.id}
              text={item.text}
              id={item.id}
              completed={item.completed}
              onDelete={deleteTodo}
              toggleComplete={toggleComplete}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Todo