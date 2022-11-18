import Link from "next/link";
import { useState, useContext } from "react";

import { ACTIONS } from "../../context/Actions";
import { PageContext } from "../../context/PageContext";
import { formatPrice } from "../../utils/formatData";

const CartItem = ({ cart, item, dispatch }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const { setNotify } = useContext(PageContext);

  const handleChangeInput = (value) => {
    const newQuantity = Number(value); // format value to number

    if (newQuantity < 1) return setQuantity(value); // if value is below 1, return

    if (item.inStock <= 0)
      return setNotify({ show: true, text: "在庫が不足しています。" }); // check if item out of stock then notify user

    let newItem; // declare new item to modify quantity

    // loop through items in cart to modify quantity
    cart.forEach((cart_item) => {
      // check id of item to modify quantity
      if (cart_item._id === item._id) {
        // modify quantity, if value greater than stock then return stock else return value
        cart_item.quantity =
          newQuantity > item.inStock ? item.inStock : newQuantity;

        newItem = cart_item;
      }
    });

    // set state for input fields, if value greater than stock then return stock else return value
    setQuantity(newQuantity > item.inStock ? item.inStock : newQuantity);

    return dispatch({ type: ACTIONS.UPDATE_CART, payload: newItem });
  };

  const handleDeleteOrder = () => {
    return dispatch({ type: ACTIONS.DELETE_CART, payload: item._id });
  };

  return (
    <li className="cart-detailList-item">
      <div className="cart-detailList-itemInfo">
        <Link href={`/view/item/${item.slug}`}>
          <a className="cart-itemInfo-anchor">
            <img
              src={`${item.image}`}
              alt={item.title}
              className="cart-itemInfo-img"
            />
            <div className="cart-itemInfo-name">
              <p>{item.title}</p>
            </div>
          </a>
        </Link>
      </div>

      <div className="cart-detailList-itemOrder">
        <div className="cart-itemOrder-quantity">
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleChangeInput(e.target.value)}
          />
        </div>

        <p className="cart-itemOrder-price">￥{formatPrice(item.price)}</p>
      </div>

      <button onClick={handleDeleteOrder}>削除</button>
    </li>
  );
};

export default CartItem;
