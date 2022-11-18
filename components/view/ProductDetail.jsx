import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { ToastContainer, toast } from "react-toastify";

import ContactUs from "./ContactUs";

import { ACTIONS } from "../../context/Actions";
import { CartContext } from "../../context/CartContext";
import { PageContext } from "../../context/PageContext";
import { formatPrice } from "../../utils/formatData";

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState("1");
  const [contactForm, setContactForm] = useState(false);

  const { cart, dispatch } = useContext(CartContext);
  const { setNotify } = useContext(PageContext);

  const handleChangeInput = (newQuantity) => {
    if (newQuantity > product.inStock) {
      return setQuantity(product.inStock);
    }

    setQuantity(newQuantity);
  };

  const handleClickOrder = () => {
    let newQuantity = Number(quantity);

    if (newQuantity < 1)
      return setNotify({ show: true, text: "数量を1以上で指定してください。" });

    if (product.inStock === 0 || newQuantity > product.inStock) {
      // if product is not have enough stock then notify user
      return setNotify({ show: true, text: "在庫が不足しています。" });
    }

    for (let i = 0; i < cart.length; i++) {
      // check if the product is already in the cart
      if (cart[i]._id === product._id) {
        // if product is already in the cart then check quantity

        if (cart[i].quantity + newQuantity > product.inStock) {
          // if quantity is greater than stock then notify user
          return setNotify({ show: true, text: "在庫が不足しています。" });
        } else {
          // if quantity is less than stock then update user's cart

          cart[i].quantity += newQuantity;

          toast.info("商品の数量を更新しました!");

          return dispatch({
            type: ACTIONS.UPDATE_CART,
            payload: cart[i],
          });
        }
      }
    }

    toast.success("カートに追加された製品!");

    // add product to user's cart
    return dispatch({
      type: ACTIONS.ADD_CART,
      payload: [
        ...cart,
        {
          _id: product._id,
          image: product.images[0],
          title: product.title,
          quantity: newQuantity,
          price: product.price,
          slug: product.slug,
          inStock: product.inStock,
        },
      ],
    });
  };

  // control contact form
  useEffect(() => {
    if (contactForm) {
      document.querySelector("body").classList.add("is-locked");
    } else {
      document.querySelector("body").classList.remove("is-locked");
    }
  }, [contactForm]);

  return (
    <Fragment>
      <header className="product-header">
        <div className="product-headerLeft">
          <p className="product-category">
            <Link href={`/view/category/${product.subCategory.slug}`}>
              <a>{product.subCategory.title}</a>
            </Link>
          </p>

          <h1 className="product-title">{product.title}</h1>
        </div>
        <div className="product-headerRight">
          <div className="product-value">
            <p className="product-valueText">￥{formatPrice(product.price)}</p>
            <p className="product-valueNote">（税込）</p>
          </div>
        </div>
      </header>

      <div className="product-body">
        <div className="product-body-detail">
          {ReactHtmlParser(product.content)}
        </div>

        <div className="product-body-order">
          {product.inStock > 0 ? (
            <Fragment>
              <p className="product-body-orderText">数量</p>
              <input
                type="number"
                className="product-body-orderInput"
                value={quantity}
                onChange={(e) => handleChangeInput(e.target.value)}
              />

              <button
                className="product-body-orderButton"
                onClick={handleClickOrder}
              >
                買い物かごに入れる
              </button>

              <ToastContainer autoClose={4000} />
            </Fragment>
          ) : (
            <p className="product-body-orderText--soldOut">只今、売り切れ</p>
          )}

          <button
            className="product-body-orderLink"
            onClick={() => setContactForm(true)}
          >
            この商品についてのお問い合わせ
          </button>

          {contactForm && (
            <ContactUs product={product} setContactForm={setContactForm} />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetail;
