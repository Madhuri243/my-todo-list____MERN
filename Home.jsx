import React from 'react'
import Creat from './Create'
import {useState, useEffect} from 'react'
import axios from 'axios'
const Home = () => {
    const [todos,setTodos] =useState([])
    useEffect(() => {
      axios.get('http://localhost:5000/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  },[])
  const handleEdit=(id) =>{
    axios.get('http://localhost:5000/update/'+id)
      .then(result =>{location.reload()})
      .catch(err => console.log(err))
  }
  const handleDelete=(id) =>{
    axios.get('http://localhost:5000/delete/'+id)
      .then(result =>{location.reload()})
      .catch(err => console.log(err))
  }
  return (
    <div className='home'>
      <h2>Todo List</h2>
   <Creat/>
      {
        todos.length===0
        ?
        <div><h2>No record</h2></div>
        :
        todos.map(todo => (
            <div className='task'>
              <div className='checkbox' onClick={() => {handleEdit(todo.id)}}>
              {todo.done? 
              <BsFillCheckCircleFill></BsFillCheckCircleFill>
              :  <BsCircleFill className='icon'/>
                }
                <p className={todo.done ? "ine_through": ""}>{todo.task}</p>
                </div>
                <div>
                  <span><BsFillTrashFill className='icon' onClick={()=>handleDelete(todo._id)}/></span>
                  </div>
            </div>
        ))
      }
    </div>
  )
}

export default Home
