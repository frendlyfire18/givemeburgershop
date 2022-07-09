import {useRouter} from "next/router";
import {
  addToCart,
} from '../redux/feature/cartSlice';
import {useAppDispatch} from "../redux/hook";

export default function GoodCard({ id, title, desc, price, img }) {
  const dispatch = useAppDispatch()
  const router = useRouter();
    return (
      <div className="py-3 px-5 my-3 mx-5 rounded-lg bg-indigo-500">
        <div className="py-2">
            <a className="hover:text-neutral-400 cursor-pointer" onClick={()=>router.push(`/goods?q=${id}`)}>{title}</a>
          </div>
        <div className="rounded-md my-2 bg-indigo-900 px-4 py-3">
          <img className={"w-full h-56"} src={img} alt={title}></img>
          <button onClick={()=>{
            dispatch(addToCart({id:id,num:1}))
          }} className="rounded-md mt-5 py-1 px-4 bg-sky-700 hover:bg-sky-800">
            Добавить в корзину
          </button>
        </div>
      </div>
    );
  }