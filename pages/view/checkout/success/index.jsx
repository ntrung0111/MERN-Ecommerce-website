import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

import PDF from "../../../../components/view/PDF";
import Loading from "../../../../components/Loading";
import ErrorPage from "../../../_error";

import { PageContext } from "../../../../context/PageContext";
import { CartContext } from "../../../../context/CartContext";
import { ACTIONS } from "../../../../context/Actions";
import { postDataAPI, getDataAPI } from "../../../../utils/fetchData";
import { formatPrice, getTotal } from "../../../../utils/formatData";

const PageCheckOut = () => {
  const router = useRouter();
  const { paymentId, PayerID, token, orderId } = router.query;

  const { loading, setLoading } = useContext(PageContext);
  const { dispatch } = useContext(CartContext);

  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [total, setTotal] = useState(0);
  const [rendered, setRendered] = useState(false);
  const [isError, setIsError] = useState(false);

  const postPaymentInfo = async () => {
    const customerInfo = JSON.parse(
      localStorage.getItem("__next__customer__koikko")
    );

    const cart = JSON.parse(localStorage.getItem("__next__cart__koikko"));

    const res = await postDataAPI(
      "/checkout/success",
      { cart, customerInfo, paymentId, PayerID },
      null
    );

    return res;
  };

  const getPaymentInfo = async () => {
    const res = await getDataAPI(`/checkout/success?orderId=${orderId}`, null);

    return res;
  };

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        let res;

        if (orderId && orderId.length > 0) {
          res = await getPaymentInfo();
        } else if (paymentId && PayerID && token) {
          res = await postPaymentInfo();
        } else {
          setIsError(true);
        }

        if (res && res.orderInfo && res.orderInfo._id) {
          let orderId = res.orderInfo._id;

          localStorage.removeItem("__next__cart__koikko");
          dispatch({ type: ACTIONS.ADD_CART, payload: [] }); // set cart to empty

          router.push(
            {
              pathname: `/view/checkout/success`,
              query: {
                orderId,
              },
            },
            `/view/checkout/success?orderId=${orderId}`,
            { shallow: true }
          );
        } else {
          setIsError(true);
          localStorage.removeItem("__next__cart__koikko");
          dispatch({ type: ACTIONS.ADD_CART, payload: [] }); // set cart to empty
        }

        setTotal(getTotal(res?.cart || []));
        setCart(res?.cart || []);
        setCustomerInfo(res?.customerInfo || {});
        setOrderInfo(res?.orderInfo || {});
        setRendered(true);
      }
    })();
  }, [router.isReady]);

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

  // PDF
  const componentRef = useRef();

  if (!rendered) return <Loading />;
  if (rendered && isError) return <ErrorPage />;

  return (
    <Fragment>
      <Head>
        <title>??????????????????????????????????????? ?????????????????????????????????</title>
      </Head>

      <div className="check-header">
        <div className="left">
          <span>??????????????????????????????????????? ?????????????????????????????????</span>
        </div>
        <div className="right">
          <span>???????????????</span>
          <img src="/images/icon_top_02.gif" alt="" />
          <Link href="/">
            <a>?????????????????????</a>
          </Link>
          <span> | </span>
          <img src="/images/icon_top_03.gif" alt="" />
          <Link href="/view/cart">
            <a>??????????????????</a>
          </Link>
        </div>
      </div>

      <div className="check-content check-content-success">
        <img className="check-img" src="/images/order_title_image.png" alt="" />

        <div className="check-content-successHeader">????????????????????????</div>

        {cart.map((item) => (
          <table key={item._id} className="table-cart">
            <tbody>
              <tr className="table-title">
                <td>
                  <b>
                    <font>?????????</font>
                  </b>
                </td>
                <td>
                  <b>
                    <font>??????</font>
                  </b>
                </td>
                <td>
                  <b>
                    <font>??????????????????</font>
                  </b>
                </td>
              </tr>

              <tr className="table-content">
                <td>
                  <span>
                    <img src={item.image} alt={item.title} />
                  </span>
                  &nbsp;{item.title}
                </td>
                <td>{item.quantity}</td>
                <td>{formatPrice(item.price * item.quantity)}???</td>
              </tr>

              <tr className="table-content">
                <td colSpan="3">
                  <table className="table-content table-priceNote">
                    <tbody>
                      <tr>
                        <td className="label">???????????????</td>
                        <td className="price">
                          <Link href="#">
                            <a>????????????????????????</a>
                          </Link>
                          <img src="/images/externalLinkIcon.png" alt="" />
                        </td>
                      </tr>

                      <tr>
                        <td className="label">?????????</td>
                        <td className="price">
                          {formatPrice(item.price * item.quantity)}???
                        </td>
                      </tr>

                      <tr>
                        <td className="label">?????????</td>
                        <td className="price">0???</td>
                      </tr>

                      <tr>
                        <td className="label">???????????????</td>
                        <td className="price">???????????????</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        ))}

        <table className="table-summary">
          <tbody>
            <tr>
              <td>
                <div className="price">
                  ???????????????????????? : <b>{formatPrice(total)} ???</b>
                </div>
                <hr />
                <div className="price--final">
                  <b>??????????????????:</b> <span>{formatPrice(total)}???</span>
                  <p className="note">
                    ?????????10%??????????????????: {formatPrice(total)}???
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="check-content-successHeader">?????????????????????</div>

        <table className="table-info">
          <tbody>
            <tr className="table-title">
              <td colSpan="2">
                <b>
                  <font>???????????????</font>
                </b>
              </td>
            </tr>
            <tr className="table-content">
              <td>
                <b>?????????</b>
              </td>

              <td>{customerInfo.name}</td>
            </tr>
            <tr className="table-content">
              <td>
                <b>????????????</b>
              </td>

              <td>{customerInfo.phone}</td>
            </tr>
            <tr className="table-content">
              <td>
                <b>?????????????????????</b>
              </td>

              <td>{customerInfo.email}</td>
            </tr>
            <tr className="table-content">
              <td>
                <b>??????</b>
              </td>

              <td>{customerInfo.address}</td>
            </tr>
            <tr className="table-content">
              <td>
                <b>?????????</b>
              </td>

              <td>
                <img src="/images/paypal-logo.png" alt="" />
              </td>
            </tr>
          </tbody>
        </table>

        <ReactToPrint
          trigger={() => (
            <div className="order-printButton">
              <div className="wrapper">
                <img src="/images/print-button.svg" />
                <p>??????????????????</p>
              </div>
            </div>
          )}
          documentTitle={`${orderInfo._id}_Koikko_Vercel`}
          content={() => {
            return componentRef.current;
          }}
        />

        <div className="confirm-button">
          <Link href="/">
            <a>????????????????????? </a>
          </Link>
        </div>
      </div>

      {loading && <Loading />}

      <div style={{ display: "none" }}>
        <PDF wrapRef={componentRef} orderInfo={orderInfo} />
      </div>
    </Fragment>
  );
};

export default PageCheckOut;
