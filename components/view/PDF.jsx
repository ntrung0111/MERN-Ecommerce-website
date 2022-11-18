import { normalDateTime, formatPrice, getTotal } from "../../utils/formatData";

const PDF = ({ wrapRef, orderInfo }) => {
  return (
    <div className="pdf-content" ref={wrapRef}>
      <div className="pdf-title">
        <p>{normalDateTime(new Date())}</p>
        <p>Koikko Vercel | ご購入いただきありがとうございます</p>
      </div>

      <div className="pdf-logo">
        <img src="/images/logo.svg" alt="ひな人形、五月人形の幸一光" />
      </div>

      <div className="pdf-greet">
        <h1>ご購入いただきありがとうございます</h1>
        <div className="pdf-greetDescription">
          <p>私たちの製品があなたの期待に応えられることを願っています。</p>
          <p>ご不明な点がございましたら、お問い合わせください。</p>
          <p>Koikko Vercelでの次の購入でまたお会いできることを願っています</p>
        </div>
      </div>

      <div className="pdf-purchaseCart">
        <h2>Order [{orderInfo._id}]</h2>

        <div className="purchaseCart-header">ご注文内容の確認</div>

        {orderInfo.orderList.map((item) => (
          <table key={item._id} className="purchaseCart-cart">
            <tbody>
              <tr className="purchaseCart-title">
                <td>
                  <b>
                    <font>商品名</font>
                  </b>
                </td>
                <td>
                  <b>
                    <font>数量</font>
                  </b>
                </td>
                <td>
                  <b>
                    <font>小計（税込）</font>
                  </b>
                </td>
              </tr>

              <tr className="purchaseCart-content">
                <td>
                  <span>
                    <img src={item.image} alt={item.title} />
                  </span>
                  &nbsp;{item.title}
                </td>
                <td>{item.quantity}</td>
                <td>{formatPrice(item.price)}円</td>
              </tr>

              <tr className="purchaseCart-price">
                <td colSpan="2">合計</td>
                <td>
                  <p>
                    {formatPrice(item.price * item.quantity)}
                    <span>円</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        ))}

        <table className="purchaseCart-summary">
          <tbody>
            <tr>
              <td>
                <div className="price">
                  商品合計（税込） :
                  <b> {formatPrice(getTotal(orderInfo.orderList))} 円</b>
                </div>
                <hr />
                <div className="price--final">
                  <b>お支払い合計: </b>
                  <span>{formatPrice(getTotal(orderInfo.orderList))}円</span>
                  <p className="note">
                    消費税10%対象（税込）:{" "}
                    {formatPrice(getTotal(orderInfo.orderList))}円
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="purchaseCart-header">ご注文内容確認</div>

        <table className="purchaseCart-customer">
          <tbody>
            <tr className="purchaseCart-title">
              <td>
                <b>
                  <font>お名前</font>
                </b>
              </td>
              <td>
                <b>
                  <font>電話番号</font>
                </b>
              </td>
              <td>
                <b>
                  <font>メールアドレス</font>
                </b>
              </td>
              <td>
                <b>
                  <font>住所</font>
                </b>
              </td>
              <td>
                <b>
                  <font>支払い</font>
                </b>
              </td>
            </tr>

            <tr className="purchaseCart-content">
              <td>{orderInfo.name}</td>
              <td>{orderInfo.phone}</td>
              <td>{orderInfo.email}</td>
              <td>{orderInfo.address}</td>
              <td>
                <img src="/images/paypal-logo.png" alt="" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="pdf-url">
        {process.env.BASE_URL}/view/checkout/success/?orderId={orderInfo._id}
      </p>
    </div>
  );
};

export default PDF;
