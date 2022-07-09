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
import Input from "../components/Input";
import { useRouter } from "next/router";

export default function Cart(){
    const router = useRouter();
    const cart = useAppSelector(selectCart);
    const [currentAddress,setAddress] = useState("");
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState("");
    const [isLoading,setLoading] = useState(false);

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
                    <Input set={setName} title="Имя:" type={"name"}/>
                    <Input Change={(value)=>setAddress(value)} title="Адресс:" type={"address"}/>
                    <Input set={setPhone} title="Телефон:" type={"phone"}/>
                    <Input set={setEmail} title="Почта:" type={"email"}/>
                    <button onClick={async ()=>{
                        setLoading(true)
                        const data = {name:name,phone:phone,address:currentAddress,email:email,order:cart}
                        const response = await fetch("http://localhost:3000/api/history", {
                            method: 'POST', // *GET, POST, PUT, DELETE, etc.
                            mode: 'cors', // no-cors, *cors, same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            redirect: 'follow', // manual, *follow, error
                            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                            body: JSON.stringify(data) // body data type must match "Content-Type" header
                        });
                        setLoading(false);
                        router.push("/")
                        //console.log("Values:",currentAddress,phone,name,email,cart[0].id)
                    }} type="submit" class="flex justify-center items-center btn py-1 px-2 my-2 rounded-lg bg-indigo-600 hover:bg-indigo-800">Заказать{isLoading&&<svg class="animate-spin mx-2 h-5 w-5 mr-3 border-2 rounded-full border-t-black" viewBox="0 0 24 24"></svg>}</button>   
                </div>
                <div className="flex flex-col rounded-lg bg-gray-500 m-10 p-10">
                    {
                        !cart?.length
                        &&
                        <div className="px-4 py-2 bg-indigo-600 rounded-t-lg border-2 border-indigo-600">
                            Корзина пуста
                        </div>
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