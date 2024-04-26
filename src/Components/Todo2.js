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

const Todo2 = () => {
    const [input, setInput] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [editableformat, setEditableformat] = useState(false);
    const ref = useRef(null);
    const [editIdx, setEditIdx] = useState(null)

    //add items
    const addItems = () => {
        if (!input) {
            toast.warn("Please enter a item !", { position: "top-center", theme: "colored" })
        }
        else if (input && editableformat) {
            setItems(
                items.map((elm) => {
                    if (elm.id == editIdx) {
                        return { ...elm, name: input }
                    }
                    return elm;
                })
            )
            setInput('')
            setEditableformat(false)
            toast.info("Item edited successfully", { position: "top-center", theme: "colored" })
        }
        else {
            toast.success("Item added successfully !", { position: "top-center", theme: "colored" })
            const allInputData = { id: new Date().getTime().toString(), name: input }
            setItems([...items, allInputData])
            setInput('')

        }
        ref.current.focus();
    }

    //edit items
    const editItem = (id) => {
        //     setEditableformat(true)
        //     toast.info("Ready to edit the item !", { position: "top-center", theme: "colored" })
        //     const localData = getLocalItems();
        //     setInput(localData[id])
        //     setEditableIdx(id)

        let newEditItem = items.find((elem) => {
            return elem.id === id;
        })
        console.log(newEditItem);
        setInput(newEditItem.name)
        setEditableformat(true)
        setEditIdx(id)
    }

    //update items
    // const updateItems = () => {
        //     toast.success("Item is updated successfully !", { position: "top-center", theme: "colored" })
        //     const oldItems = items;
        //     oldItems[editableIdx] = input;
        //     setItems(oldItems);
        //     localStorage.setItem('list',JSON.stringify(items))

        //     setInput('')
        //     setEditableformat(false)
        //     ref.current.focus();
    // }

    //delete items
    const deleteItem = (idx) => {
        toast.error(`${items[idx]} deleted !`, { position: "top-center", theme: "colored" })
        const updatedItem = items.filter((elm) => {
            return elm.id !== idx
        })
        setItems(updatedItem)
    }

    //remove all items
    const removeAll = () => {
        setItems([])
        toast.error("All item deleted !", { position: "top-center", theme: "colored" })
    }

    //save to localstorage
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(items))
        // alert("useEffect for item is called");
    }, [items]);

    return (
        <>
            <h1>Todo2 List App</h1>
            <div className='container'>
                <figure>
                    <img src={todo} alt="todologo" />
                    <figcaption>Add your list here</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" ref={ref} placeholder=' ✍️ Add items...' value={input} onChange={(e) => { setInput(e.target.value) }} />
                    {
                        editableformat ? <FcApproval className='addIcon' onClick={addItems} /> : <FcPlus className='addIcon' onClick={addItems} />
                    }
                </div>
                <div className="showItems">
                    {
                        items.map((item) => {
                            return (
                                <div className="eachItem" key={item.id}>
                                    <span>{item.name}</span>
                                    <div className='itembtn'>
                                        <FiEdit className='edit' onClick={() => editItem(item.id)} />
                                        <FaTrashAlt className='trash' onClick={() => deleteItem(item.id)} />
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

export default Todo2
