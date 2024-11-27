import React, { useEffect,useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify';

const List = () => {

  const[list,setList]=useState([])

  useEffect(()=>{
fetchList()
  },[])

  const fetchList=async()=>{
    try{
      const res=await axios.get('http://localhost:4000/api/food/list');
      setList(res.data.data)
    }catch(error){
      console.log(error.message)
      toast.error('Failed to fetch food list')
    }
  }


  const removeFood=async(id)=>{
    try{
      await axios.post(`http://localhost:4000/api/food/remove`,{id});
      await fetchList()
      toast.success('Food Item removed successfully')
    }catch(error){
      console.log(error.message)
      toast.error('Failed to remove food item')
    }
  }


  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`http://localhost:4000/images/`+item.image}/>  
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
        
      
    </div>
  )
}

export default List

