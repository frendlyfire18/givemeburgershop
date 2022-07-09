import Head from "next/head";
import {useRouter} from "next/router";
import GoodCard from "../../components/Card";
import LinkCustom from "../../components/CustomLink"
import Text from "../../components/CustomText"
import Header from "../../components/Header"
import { cur_url_with_host_and_port } from "../lib/constants";

export default function Home({ movies,shops }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{router.query.name}</title>
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
            <Text>Товары : {movies.length}</Text>
            <LinkCustom onClick={()=>{router.push("/")}}>
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
            {"Назад"}
            </LinkCustom>
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

export async function getServerSideProps(context) {
  const res = await fetch(`${cur_url_with_host_and_port}/api/burgers?q=${context.query.name}`);
  const data = await res.json();

  const res_1 = await fetch(`${cur_url_with_host_and_port}/api/shops`);
  const data_1 = await res_1.json();

  return {
    props: { movies: JSON.parse(JSON.stringify(data)),shops: JSON.parse(JSON.stringify(data_1)) },
  };
}