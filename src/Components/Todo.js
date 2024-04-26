import React, { useEffect, useRef, useState } from 'react'
import { FcPlus, FcApproval } from "react-icons/fc";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import todo from './images/todo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//get data from localstorage
const getLocalItems = () => {
  const lists = localStorage.getItem('list');
  if (lists) {
    return JSON.parse(localStorage.getItem('list'));
  }
  else {
    return [];
  }
}

const Todo = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState(getLocalItems());
  const [editableformat, setEditableformat] = useState(false);
  const ref = useRef(null);
  // let editableIdx = -1;
  const [editableIdx, setEditableIdx] = useState(null)

  //save to localstorage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(items))
    alert("useEffect for item is called");
  }, [items]);

  //add items
  const addItems = () => {
    setItems([]);
    if (input) {
      toast.success("Item added successfully !", { position: "top-center", theme: "colored" })
      setItems([...items, input])
      setInput('')
    }
    else {
      toast.warn("Please enter a item !", { position: "top-center", theme: "colored" })
    }
    ref.current.focus();
  }

  //edit items
  const editItem = (id) => {
    setEditableformat(true)
    toast.info("Ready to edit the item !", { position: "top-center", theme: "colored" })
    const localData = getLocalItems();
    setInput(localData[id])
    setEditableIdx(id)
  }

  //update items
  const updateItems = () => {
    toast.success("Item is updated successfully !", { position: "top-center", theme: "colored" })
    const oldItems = items;
    oldItems[editableIdx] = input;
    // console.log(oldItems);
    // console.log(items);
    setItems(oldItems);
    // console.log(items);
    // localStorage.setItem('list',JSON.stringify(items))

    setInput('')
    setEditableformat(false)
    ref.current.focus();
  }

  //delete items
  const deleteItem = (idx) => {
    toast.error(`${items[idx]} deleted !`, { position: "top-center", theme: "colored" })
    const updatedItem = items.filter((elm, id) => {
      return id !== idx
    })
    setItems(updatedItem)
  }

  //remove all items
  const removeAll = () => {
    setItems([])
    toast.error("All item deleted !", { position: "top-center", theme: "colored" })
  }
  // //save to localstorage
  // useEffect(() => {
  //   localStorage.setItem('list', JSON.stringify(items))
  //   // alert("useEffect for item is called");
  // }, [items]);

  return (
    <>
      <h1>Todo List App</h1>
      <div className='container'>
        <figure>
          <img src={todo} alt="todologo" />
          <figcaption>Add your list here</figcaption>
        </figure>
        <div className="addItems">
          <input type="text" ref={ref} placeholder=' ✍️ Add items...' value={input} onChange={(e) => { setInput(e.target.value) }} />
          {
            editableformat ? <FcApproval className='addIcon' onClick={updateItems} /> : <FcPlus className='addIcon' onClick={addItems} />
          }
        </div>
        <div className="showItems">
          {
            items.map((item, idx) => {
              return (
                <div className="eachItem" key={idx}>
                  <span>{item}</span>
                  <div className='itembtn'>
                    <FiEdit className='edit' onClick={() => editItem(idx)} />
                    <FaTrashAlt className='trash' onClick={() => deleteItem(idx)} />
                  </div>
                </div>
              )
            })
          }
        </div>
        <button className='removebtn' onClick={removeAll} >Remove All</button>
      </div>
      <ToastContainer />
    </>
  )
}

export default Todo
