import { Fragment, useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";

import { PageContext } from "../../context/PageContext";
import { postDataAPI } from "../../utils/fetchData";

const ContactUs = ({ product, setContactForm }) => {
  const { setLoading } = useContext(PageContext);
  const [verified, setVerified] = useState(false);

  const recaptchaRef = useRef(null);

  // FORM DATA
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitContact = async (data) => {
    const { product_id, name, email, message } = data;

    const token = recaptchaRef.current?.getValue(); // get recaptcha token for qualifying
    recaptchaRef.current?.reset(); // reset token

    setLoading(true);

    if (!product_id || !name || !email || !message) {
      setLoading(false);
      setContactForm(false);

      return;
    }

    const res = await postDataAPI("/contact", { ...data, token }, null);

    if (res.success) {
      setLoading(false);
      setContactForm(false);
      toast.info(
        "お問い合わせありがとうございます。3営業日以内に返信いたします。",
        { autoClose: false }
      );
    }
  };

  return (
    <Fragment>
      <div className="contactForm-overlay"></div>
      <div className="contactForm-container">
        <button
          className="contactForm-closeButton"
          onClick={() => setContactForm(false)}
        ></button>
        <h1 className="pageTitle">お問い合わせ</h1>
        <p>
          以下のフォームの項目を入力し、よろしければ「この内容で問い合わせる」ボタンをクリックしてください。
          <br />
          <br />
          　＊＊お願い＊＊
          <br />
          <br />
          最近、お問合せを頂いてもお客様の受信フィルターが原因でメールでのお返事が出来ないという状況が頻発しております。
          <br />
          <br />
          お手数ではございますが、受信設定のご確認と、もし問い合わせをしても当店から3営業日以内に返事が届かない方は電話番号
          03-XXXX-XXXX までご連絡をお願い申し上げます。
          <br />
          <br />
          ■ メール受信設定
          <br />
          迷惑メールに分類されてしまい、ご連絡に対するお返事のメールが届かない場合がございます。
          <br />
          入力いただいたメールアドレスでメールが受信できるようあらかじめ　koikko@vercel.app　のドメインを受信設定してください。
          <br />
          <br />
          主な携帯キャリアの受信設定
          <br />
          ・ドコモ　https://koikko.vercel.app/
          <br />
          ・au　https://koikko.vercel.app/
          <br />
          ・ソフトバンク　https://koikko.vercel.app/
          <br />
          <br />
          上記以外のメールサービスをお使いのお客様はそれぞれの設定をご確認ください。
          <br />
        </p>
        <div className="product-detail">
          <img src={product.images[0]} alt="" />
          <p>{product.title}</p>
        </div>
        <form onSubmit={handleSubmit(handleSubmitContact)}>
          <table className="table-info">
            <tbody>
              <tr className="table-content">
                <th>
                  <em className="required">必須</em>
                  <b>お名前</b>
                </th>
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
                    maxLength="20"
                  />
                </td>
              </tr>
              <tr className="table-content">
                <th>
                  <em className="required">必須</em>
                  <b>メールアドレス</b>
                </th>
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
                  />
                </td>
              </tr>
              <tr className="table-content">
                <th>
                  <em className="required">必須</em>
                  <b>お問い合わせ内容</b>
                </th>
                <td>
                  {errors.message && (
                    <p className="error">
                      {errors.message.type === "maxLength"
                        ? "メッセージの最大長は 2000 文字です"
                        : "メッセージを入力してください。"}
                    </p>
                  )}
                  <textarea
                    {...register("message", {
                      required: true,
                      maxLength: 2000,
                    })}
                    maxLength="2000"
                  />
                  <p className="note">※全角2000文字まで</p>
                </td>
              </tr>
            </tbody>
          </table>
          <input
            type="hidden"
            {...register("product_id", {
              required: true,
            })}
            value={product._id}
          />
          <div className="recaptcha">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.RECAPTCHA_SITE_KEY}
              onChange={() => setVerified(true)}
              onExpired={() => {
                recaptchaRef.current?.reset();
                setVerified(false);
              }}
            />
          </div>
          <button disabled={verified ? false : true}>
            この内容で問い合わせる
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ContactUs;
