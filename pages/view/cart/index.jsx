import Head from "next/head";
import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";

import Breadcrumb from "../../../components/view/Breadcrumb";
import Cart from "../../../components/view/Cart";
import Header from "../../../components/view/Header";

import { PageContext } from "../../../context/PageContext";
import { CartContext } from "../../../context/CartContext";
import MultipleObserver from "../../../utils/multipleObserver";
import { getTotal } from "../../../utils/formatData";

const PageCart = () => {
  const { showDropdown, setShowDropdown, isPageView, setIsPageView } =
    useContext(PageContext);

  const { cart, dispatch } = useContext(CartContext);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getTotal(cart));
  }, [cart]);

  return (
    <Fragment>
      <Head>
        <title>
          買い物かご | ひな人形、五月人形の幸一光 公式オンラインショップ
        </title>
      </Head>

      <Header
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        isPageView={isPageView}
        setIsPageView={setIsPageView}
      />

      <Breadcrumb
        crumbs={[
          {
            url: "/",
            title: "ホーム",
          },
          {
            url: "#",
            title: "買い物かご",
          },
        ]}
      />

      <main className="cart-content">
        <header className="cart-header">
          <img src="/images/arrow.svg" alt="" />
          <MultipleObserver>
            <h1>買い物かご</h1>
          </MultipleObserver>
          <p>Cart</p>
        </header>

        {cart.length === 0 ? (
          <div className="cart-link">
            <p className="cart-noCart">買い物かごに商品はありません</p>
            <Link href="/">
              <a className="cart-linkAnchor">前のページに戻る</a>
            </Link>
          </div>
        ) : (
          <Cart cart={cart} total={total} dispatch={dispatch} />
        )}
      </main>
    </Fragment>
  );
};

PageCart.pageClass = "__page-view";

export default PageCart;
