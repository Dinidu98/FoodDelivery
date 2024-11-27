import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from 'axios'
export const StoreContext = createContext(null);

const StoreContextProvide = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token,setToken]=useState('')
  const [food_list,setFood_list]=useState([])

  const addToCart = async(itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 })); //add first time to card
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if(token){
      await axios.post("http://localhost:4000/api/cart/add",{itemId},{headers:{token}})

    }


  };

  const removeFromCart =async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post("http://localhost:4000/api/cart/remove",{itemId},{headers:{token}})

    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

useEffect(()=>{
  
  async function loadData() {
    await fetchFoodList()

    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      await loadCartData(localStorage.getItem("token"))
    }
  }
  loadData()
},[])


const fetchFoodList=async()=>{
  const res=await axios.get('http://localhost:4000/api/food/list')
  setFood_list(res.data.data)
}

const loadCartData=async(token)=>{
  const res=await axios.post('http://localhost:4000/api/cart/get',{},{headers:{token}})
  // console.log(res.data);
  
  setCartItems(res.data.cartData)

}
  

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvide;
