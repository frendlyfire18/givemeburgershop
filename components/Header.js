import LinkCustom from "./CustomLink"
import Text from "./CustomText"
import {useRouter} from "next/router"
import Link from "next/link"
import {selectCart} from "../redux/feature/cartSlice"
import {useAppDispatch, useAppSelector} from "../redux/hook"

function Badge({children}){
  return(
    <div className="flex jutify-center text-xs items-center rounded-full ml-1 mb-2 px-1.5 py-0.5 bg-fuchsia-800">
      {children}
    </div>
  )
}

export default function Header() {
  const router = useRouter();
  const cart = useAppSelector(selectCart);
  
  return (
    <>
      <div className="flex border-b-4  px-5 items-center bg-gray-700">
        <div className="flex">
            <svg fill="#FFFFFF" stroke="#000000" viewBox="0 0 70 50" width="30" height="40">
              <rect width="60" height="10"></rect>
              <rect y="20" width="60" height="10"></rect>
              <rect y="40" width="60" height="10"></rect>
            </svg>
             <Text>
                GiveMeBurgerShop
            </Text>
        </div>
      
        <Text>|</Text>
        <Link href={"/"}>
          <LinkCustom>Каталог{/*<Badge/>*/}</LinkCustom>
        </Link>
        <Link href={"/cart"}>
          <LinkCustom>Корзина <Badge>{cart.length}</Badge></LinkCustom>
        </Link>
        <LinkCustom>История</LinkCustom>
      </div>
    </>
  );
}
