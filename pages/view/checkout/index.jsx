import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Loading from "../../../components/Loading";
import ErrorPage from "../../_error";

import { PageContext } from "../../../context/PageContext";
import { CartContext } from "../../../context/CartContext";
import { ACTIONS } from "../../../context/Actions";
import { formatPrice, getTotal } from "../../../utils/formatData";
import { postDataAPI } from "../../../utils/fetchData";

const PageCheckOut = () => {
  const router = useRouter();

  const { loading, setLoading } = useContext(PageContext);
  const { cart, dispatch } = useContext(CartContext);

  const [total, setTotal] = useState(0);
  const [rendered, setRendered] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setRendered(true);
    setTotal(getTotal(cart));
  }, [cart]);

  // FORM DATA
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let newData = { ...data, cart };

    setLoading(true);

    const res = await postDataAPI("/checkout", { data: newData }, null);
    if (res.success) {
      localStorage.setItem("__next__customer__koikko", JSON.stringify(data)); // set newest item in cart to localStorage

      router.push(res.url, undefined, { shallow: true }); // go to paypal payment
    } else {
      if (res.code) {
        localStorage.setItem("__next__cart__koikko", JSON.stringify([])); // user has already config cart data invalid
        dispatch({ type: ACTIONS.ADD_CART, payload: [] }); // set cart to empty
      }

      setLoading(false);
      setIsError(true);
    }
  };

  // control loading state
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  if (!rendered) return <Loading />;
  if ((rendered && cart.length === 0) || isError) return <ErrorPage />;

  return (
    <Fragment>
      <Head>
        <title>ひな人形、五月人形の幸一光 公式オンラインショップ</title>
      </Head>

      <div className="check-header">
        <div className="left">
          <span>ひな人形、五月人形の幸一光 公式オンラインショップ</span>
        </div>
        <div className="right">
          <span>ようこそ！</span>
          <img src="/images/icon_top_02.gif" alt="" />
          <Link href="/">
            <a>トップページへ</a>
          </Link>
          <span> | </span>
          <img src="/images/icon_top_03.gif" alt="" />
          <Link href="/view/cart">
            <a>買い物かごへ</a>
          </Link>
        </div>
      </div>

      <div className="check-content">
        <img className="check-img" src="/images/order_title_image.png" alt="" />

        <table className="table-cart">
          <tbody>
            <tr className="table-title">
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

            {cart.map((item) => (
              <tr key={item._id} className="table-content">
                <td>
                  <span>
                    <img src={item.image} alt={item.title} />
                  </span>
                  &nbsp;{item.title}
                </td>
                <td>{item.quantity}</td>
                <td>{formatPrice(item.price * item.quantity)}円</td>
              </tr>
            ))}

            <tr className="table-price">
              <td colSpan="3">
                <span className="label">商品合計（税込）：</span>
                <span className="price">{formatPrice(total)}円</span>
              </td>
            </tr>

            <tr className="table-price--summary">
              <td colSpan="2">合計</td>
              <td>
                <p>
                  {formatPrice(total)}
                  <span>円</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="table-info">
            <tbody>
              <tr className="table-title">
                <td colSpan="2">
                  <b>
                    <font>注文者情報の入力</font>
                  </b>
                </td>
              </tr>
              <tr className="table-content">
                <td>
                  <em className="required">必須</em>
                  <b>お名前</b>
                </td>

                <td>
                  {errors.name && (
                    <p className="error">
                      {errors.name.type === "maxLength"
                        ? "名前の最大長は 20 文字です"
                        : "お名前を入力してください。"}
                    </p>
                  )}

                  <input
                    {...register("name", {
                      required: true,
                      maxLength: 20,
                    })}
                    type="text"
                    placeholder="(例) 山田太郎"
                    className="name"
                    maxLength="20"
                  />
                </td>
              </tr>
              <tr className="table-content">
                <td>
                  <em className="required">必須</em>
                  <b>電話番号</b>
                </td>

                <td>
                  {errors.phone && (
                    <p className="error">
                      電話番号は半角数字で入力してください。
                    </p>
                  )}
                  <input
                    {...register("phone", {
                      required: true,
                      maxLength: 20,
                      pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                    })}
                    type="tel"
                    placeholder="必ず正しい番号を入力してください"
                    className="phone"
                    maxLength="20"
                  />
                </td>
              </tr>
              <tr className="table-content">
                <td>
                  <em className="required">必須</em>
                  <b>メールアドレス</b>
                </td>

                <td>
                  {errors.email && (
                    <p className="error">
                      {errors.email.type === "pattern"
                        ? "メールアドレスが正確ではありません。もう一度ご入力ください。"
                        : "あなたのメールアドレスを入力してください。"}
                    </p>
                  )}
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    type="text"
                    placeholder="info@example.com"
                    className="email"
                  />
                </td>
              </tr>
              <tr className="table-content">
                <td>
                  <em className="required">必須</em>
                  <b>住所</b>
                </td>

                <td>
                  {errors.address && (
                    <p className="error">それ以降の住所を入力してください。</p>
                  )}
                  <input
                    {...register("address", {
                      required: true,
                    })}
                    type="text"
                    placeholder="それ以降の住所"
                    className="address"
                  />
                  <p className="note">
                    ※入力されている住所が勤務先の場合は「会社名・部署名」なども入力してください。
                  </p>
                </td>
              </tr>
              <tr className="table-content">
                <td>
                  <em className="required">必須</em>
                  <b>支払い</b>
                </td>

                <td>
                  {errors.payment && (
                    <p className="error">お支払い方法を選択してください。</p>
                  )}
                  <input
                    {...register("payment", {
                      required: true,
                    })}
                    value="paypal"
                    type="radio"
                    className="payment"
                    checked
                  />
                  <img src="/images/paypal-logo.png" alt="" />

                  <p className="note">
                    <img src="/images/payment-icon.svg" alt="" />
                    ※“ご注文完了”をクリック後、安全に決済するために、PayPalにリダイレクトされます。
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="confirm-button">
            <input type="submit" value="次へ" />
          </div>
        </form>
      </div>

      {loading && <Loading />}
    </Fragment>
  );
};

export default PageCheckOut;
