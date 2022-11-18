import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { formatPrice } from "../../utils/formatData";
import CartItem from "./CartItem";

const Cart = ({ dispatch, cart, total }) => {
  const router = useRouter();

  return (
    <Fragment>
      <div className="cart-detail">
        <ol className="cart-detailHeader">
          <li className="cart-detailHeader-item cart-detailHeader-item--lg">
            商品
          </li>
          <li className="cart-detailHeader-item cart-detailHeader-item--md">
            数量
          </li>
          <li className="cart-detailHeader-item cart-detailHeader-item--md">
            単価
            <span className="cart-detailHeader-itemNote">（税込）</span>
          </li>
          <li className="cart-detailHeader-item cart-detailHeader-item--sm"></li>
        </ol>

        <ol className="cart-detailList">
          {cart.map((item) => (
            <CartItem
              key={item._id}
              cart={cart}
              item={item}
              dispatch={dispatch}
            />
          ))}
        </ol>
      </div>

      <div className="cart-total">
        <div className="cart-totalInner">
          <p className="cart-totalTitle">合計金額：</p>
          <p className="cart-totalValue">￥{formatPrice(total)}</p>
          <p className="cart-totalNote">（税込）</p>
        </div>
      </div>

      <p className="cart-message">￥50,000(税抜)以上で国内送料無料</p>

      <div className="cart-link">
        {cart.length === 0 ? (
          <a className="cart-linkAnchor" onClick={() => router.back()}>
            前のページに戻る
          </a>
        ) : (
          <Link href="/">
            <a className="cart-linkAnchor">他の商品も見る</a>
          </Link>
        )}
      </div>
      <Link href="/view/checkout">
        <button className="cart-button">お支払いへ進む</button>
      </Link>
    </Fragment>
  );
};

export default Cart;
