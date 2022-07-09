import Header from "../components/Header"
import {useState} from "react"

import Text from "../components/CustomText"
import CartItem from "../components/CartItem";
import Head from "next/head"
import {
    deleteFromCart,
    increment,
    decrement
} from '../redux/feature/cartSlice';
import {selectCart} from "../redux/feature/cartSlice"
import {useAppDispatch, useAppSelector} from "../redux/hook"

function Input({Change,title,type}){
    const [value,setValue] = useState("");

    const handlInput = (e)=>{
        setValue(e.target.value);
    }
    return(
        <div>
            <label>{title}</label>
            <br/>
            <input onChange={handlInput}className={`px-2 color-white my-3 bg-gray-600 ${(type === "address")?"w-80":"w-96"} ${(type === "address")&&"py-1"}`} type={type} value={value}/>
            {(type === "address")&&<button onClick={Change(value)} className="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-r-lg">Поиск</button>}
        </div>   
    )
}

export default function Cart(){
    const cart = useAppSelector(selectCart);
    const [currentAddress,setAddress] = useState("");

    const [summ,setSum] = useState(0);
    return(
        <>
            <Head>
                <title>Корзина</title>
            </Head>
            <Header/>
            <div className="my-5 text-center text-4xl">
                <h1>Заказать товар</h1>
            </div>
            <div className="flex justify-center">
               <iframe
                src={`https://www.google.com/maps?q=${currentAddress}&z=16&output=embed`}
                width="750"
                height="450"
                allowfullscreen=""
                loading="lazy"
            ></iframe>
            </div>
            
            <div className="flex justify-center">
                <div className="flex flex-col rounded-lg bg-gray-500 m-10 p-10"> 
                    <Input title="Имя:" type={"name"}/>
                    <Input Change={(value)=>setAddress(value)} title="Адресс:" type={"address"}/>
                    <Input title="Телефон:" type={"phone"}/>
                    <Input title="Почта:" type={"email"}/>
                    <button type="submit" class="btn py-1 px-2 my-2 rounded-xl bg-indigo-600 hover:bg-indigo-800">Заказать</button>   
                </div>
                <div className="flex flex-col rounded-lg bg-gray-500 m-10 p-10">
                    {
                        !cart?.length
                        &&
                        <Text>
                            Корзина пуста
                        </Text>
                    }
                    {
                        cart?.length!==0
                        &&
                        cart?.map(item=>(
                            <div className="border-2 border-netural-500">
                                <CartItem upSum={setSum} id={item.id} num={item.num}/>
                            </div>
                        ))
                    }
                    <div className="px-4 py-2 bg-indigo-600 rounded-b-lg border-2 border-indigo-600">Заказать все за : {summ} ₴</div>
                </div>
            </div>
        </>
    )
} 