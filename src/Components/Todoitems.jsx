import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import { Trash } from 'lucide-react'
// import delete from '../assets/delete.png'

const Todoitems = ({text , id, completed, onDelete, toggleComplete}) => {
  return (
    <div onClick={
        ()=> {toggleComplete(id)}
    } className='flex items-center my-3 gap-2'>
      <div className='flex flex-1 items-center cursor-pointer'>
        <img src= {completed ? tick : not_tick} alt='' className='w-7'/>
        <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${completed ? 'line-through' : ''}`} >
            {text}</p>
       

      </div>
       <Trash onClick={()=>{onDelete(id)}} className='w-3.5 cursor-pointer' />

    </div>
  )
}

export default Todoitems
