import Head from "next/head";
import api from "../utils/api.util";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import EditModal from "../components/Modal/edit";
import ProductList from "../components/Product/list";
import CreateModal from "../components/Modal/create";
import useLocalStorage from "../hooks/useLocalStorage";

import { useEffect } from "react";
import { useApp } from "../hooks/useApp";
import { isJWTValid } from "../utils/auth.util";

export default function Home() {
  const { appState, setAppState } = useApp();
  const [token, _] = useLocalStorage("user_token");

  useEffect(() => {
    fetchProductList();
  }, [token]);

  const fetchProductList = async () => {
    if (isJWTValid(token)) {
      const productlist = await api.product.get();
      setAppState((prev) => ({ ...prev, productlist: productlist.data }));
    }
  };

  return (
    <div>
      <Head>
        <title>Mighty Jaxx</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {appState.isModalActive && <EditModal />}
      {appState.isCreateModalActive && <CreateModal />}

      <Navbar>
        <h1 className="text-4xl font-semibold text-dark-brown">
          Admin Dashboard
        </h1>

        <Search />

        <div className="flex justify-center items-center py-10 text-dark-brown">
          <ProductList />
        </div>
      </Navbar>
    </div>
  );
}
