import { useEffect, useState } from "react";
import {
    deleteFromCart,
    increment,
    decrement
} from '../redux/feature/cartSlice';
import {selectCart} from "../redux/feature/cartSlice"
import {useAppDispatch, useAppSelector} from "../redux/hook"
import {cur_url_with_host_and_port} from "../lib/constants"

 
 export default function HistoryItem({upSum,id,num}){
    const [value,setValue] = useState([]);

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
                </div>
            </div>
        </div>
    )
 }