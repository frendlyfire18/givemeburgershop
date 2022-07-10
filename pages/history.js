import Head from "next/head";
import { useRouter } from "next/router";
import LinkCustom from "../components/CustomLink";
import Header from "../components/Header";
import { cur_url_with_host_and_port } from "../lib/constants";
import Input from "../components/Input";
import { useState } from "react";
import HistoryItem from "../components/HistoryItem";

export default function History({ shops }) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [summ, setSum] = useState(0);

  return (
    <div>
      <Head>
        <title>GiveMeBurgerShop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex">
        <div className="px-5 py-5 h-full bg-gray-700">
          {shops.map((shop) => (
            <LinkCustom
              onClick={() => {
                router.push(`/shop/${shop.name}`);
              }}
            >
              {shop.name}
            </LinkCustom>
          ))}
        </div>

        <div className="flex items-start justify-center">
          <div>
            <div className="my-5 text-center text-4xl">
              <h1>Ваши данные</h1>
            </div>
            <div className="flex flex-col rounded-lg bg-gray-500 m-10 p-10">
              <Input
                set={setPhone}
                leftItem={"+"}
                title="Телефон:"
                type={"phone"}
              />
              <Input set={setEmail} title="Почта:" type={"email"} />
              <button
                onClick={async () => {
                  setLoading(true);
                  const response = await fetch(
                    `${cur_url_with_host_and_port}/api/history?email=${email}&phone=${phone}`
                  );
                  const data = await response.json();
                  console.log(data);
                  setData(data);
                  setLoading(false);
                }}
                type="submit"
                class="flex justify-center items-center btn py-1 px-2 my-2 rounded-xl bg-indigo-600 hover:bg-indigo-800"
              >
                Поиск
                {isLoading && (
                  <svg
                    class="animate-spin mx-2 h-5 w-5 mr-3 border-2 rounded-full border-t-black"
                    viewBox="0 0 24 24"
                  ></svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <div className="my-5 text-center text-4xl">
              <h1>История ваших заказов</h1>
            </div>
            <div className="flex flex-col rounded-lg bg-gray-500 m-10 p-10">
              {data?.length &&
                data?.map((value) => (
                  <div className="border-2 border-netural-500">
                    {value.order.map((order) => (
                      <HistoryItem
                        upSum={setSum}
                        id={order.id}
                        num={order.num}
                      />
                    ))}
                  </div>
                ))}
              <div className="px-4 py-2 bg-indigo-600 rounded-b-lg border-2 border-indigo-600">
                Вы заказали на : {summ} ₴
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ context, resolvedUrl }) {
  const res_1 = await fetch(`${cur_url_with_host_and_port}/api/shops`);
  const data_1 = await res_1.json();
  return {
    props: { shops: JSON.parse(JSON.stringify(data_1)) },
  };
}
