import { useEffect, useState } from "react";
import {
    deleteFromCart,
    increment,
    decrement
} from '../redux/feature/cartSlice';
import {selectCart} from "../redux/feature/cartSlice"
import {useAppDispatch, useAppSelector} from "../redux/hook"
import {cur_url_with_host_and_port} from "../lib/constants"

 
 export default function CartItem({upSum,id,num}){
    const [value,setValue] = useState([]);
    const dispatch = useAppDispatch();

    useEffect(async ()=>{
        const res = await fetch(`${cur_url_with_host_and_port}/api/burgers?id=${id}`);
        const data = await res.json();
        setValue(data);
        upSum(currentSum=>currentSum+(parseInt(data[0].price)*num))
    },[])
    if(value.length === 0){
        return(
            <>Loading...</>
        )
    }
    return(
        <div className="flex items-center">
            <div>
                 <img className="w-full h-40" src={value[0].img}></img>
            </div>
           
            <div className="text-center mx-4">
                <div className="">{value[0].name}<br/>Цена:{value[0].price}</div>
                <div className="flex justify-between text-center my-1 text-white">
                    <input className="text-center text-black border border-black rounded-lg" type="text" value={num}/>
                    <div className="flex flex-col ">
                        <button onClick={()=>{
                            dispatch(increment({id:id}))
                            upSum(currentSum=>currentSum+(parseInt(value[0].price)))
                        }} className="w-full px-2 font-bold bg-indigo-600 hover:bg-indigo-800 rounded-tl-lg">/\</button>
                        <button onClick={()=>{
                            dispatch(decrement({id:id}))
                            upSum(currentSum=>(num>1)?currentSum-(parseInt(value[0].price)):currentSum)
                        }} className=" w-full px-2 font-bold bg-indigo-600 hover:bg-indigo-800 rounded-bl-lg">\/</button>
                    </div>
                    <button onClick={()=>{
                            dispatch(deleteFromCart({id:id,num:1}))
                            upSum(currentSum=>currentSum-(parseInt(value[0].price)*num))
                        }} className="w-full px-2 font-bold bg-indigo-600 hover:bg-indigo-800 rounded-r-lg">Удалить</button>
                </div>
            </div>
        </div>
    )
 }