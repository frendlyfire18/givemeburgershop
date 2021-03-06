import Head from "next/head";
import {useRouter} from "next/router";
import GoodCard from "../components/Card";
import LinkCustom from "../components/CustomLink"
import Text from "../components/CustomText"
import Header from "../components/Header"
import { cur_url_with_host_and_port } from "../lib/constants";

export default function Home({ movies,shops }) {
  const router = useRouter();
  
  return (
    <div>
      <Head>
        <title>GiveMeBurgerShop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      
      <div className="flex">
        <div className="px-5 py-5 h-full bg-gray-700">
          {shops.map((shop) => (
            <LinkCustom onClick={()=>{
              router.push(`/shop/${shop.name}`)
            }}>{shop.name}</LinkCustom>
          ))}
        </div>
        <div className="w-screen">
          <Text>Все товары : {movies.length}</Text>
          <div className="grid xl:grid-cols-4 xl:gap-4">
            {movies.map((movie, index) => (
              <GoodCard
                id={movie._id}
                title={movie.name}
                desc={"Item description Lorem Ipsum Lorem Ipsum"}
                price={"$150"}
                img={movie.img}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({context,resolvedUrl }) {
  const res = await fetch(`${cur_url_with_host_and_port}/api/burgers`);
  const data = await res.json();

  const res_1 = await fetch(`${cur_url_with_host_and_port}/api/shops`);
  const data_1 = await res_1.json();
  return {
    props: { movies: JSON.parse(JSON.stringify(data)),shops: JSON.parse(JSON.stringify(data_1)) },
  };
}
