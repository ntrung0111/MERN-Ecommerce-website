import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="top">
        <a href="#" className="group-guide">
          <div>
            <p className="title">ご利用ガイド</p>
            <p className="text">配送・送料・お支払いなど</p>
          </div>

          <img
            className="image"
            src="/images/thumb-anima.png"
            alt="ご利用ガイド"
          />
        </a>

        <a href="#" className="group-mail">
          <p className="title">メールでお問い合わせ</p>
          <p className="text">24時間受付</p>
        </a>
      </div>

      <div className="mid">
        <ul className="container">
          <li className="container-item">
            <ul className="category-inner">
              <li className="category-inner-item hina">
                <Link href="/view/category/hina">
                  <a className="title">
                    <img
                      src="/images/thumb-hina.png"
                      alt="ひな人形"
                      className="image-hina"
                    />
                    <p>ひな人形</p>
                  </a>
                </Link>
                <ul className="category-child hina">
                  <li className="category-child-item">
                    <Link href="/view/category/shinno">
                      <a>親王飾り</a>
                    </Link>
                  </li>
                  <li className="category-child-item">
                    <Link href="/view/category/5kazari">
                      <a>5人飾り</a>
                    </Link>
                  </li>
                  <li className="category-child-item">
                    <Link href="/view/category/10kazari">
                      <a>10人飾り</a>
                    </Link>
                  </li>
                  <li className="category-child-item">
                    <Link href="/view/category/15kazari">
                      <a>15人飾り</a>
                    </Link>
                  </li>
                  <li className="category-child-item">
                    <Link href="/view/category/tachibina">
                      <a>立雛</a>
                    </Link>
                  </li>
                  <li className="category-child-item">
                    <Link href="/view/category/hina-ishogi">
                      <a>衣裳着ケース</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="category-inner-item may">
                <Link href="/view/category/gogatsu">
                  <a className="title">
                    <img
                      src="/images/thumb-may.png"
                      alt="五月人形"
                      className="image-may"
                    />
                    <p>五月人形</p>
                  </a>
                </Link>
                <ul className="category-child may">
                  <li className="category-child-item">
                    <Link href="/view/category/yoroigi">
                      <a>鎧着人形</a>
                    </Link>
                  </li>
                  <li className="category-child-item">
                    <Link href="/view/category/gogatsu-ishogi">
                      <a>衣裳着ケース</a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="container-item">
            <ul className="category-inner">
              <li className="category-inner-item works02">
                <Link href="/view/category/wa-works">
                  <a className="title">
                    <img
                      src="/images/thumb-works.png"
                      alt="和わーくす"
                      className="image-works"
                    />

                    <img
                      src="/images/thumb-works02.png"
                      alt="和わーくす"
                      className="image-works02"
                    />
                    <p>和わーくす</p>
                  </a>
                </Link>
              </li>
              <li className="category-inner-item anima">
                <Link href="/view/category/anima">
                  <a className="title">
                    <img
                      src="/images/thumb-anima.png"
                      alt="Anima"
                      className="image-anima"
                    />
                    <p>Anima</p>
                  </a>
                </Link>
              </li>
            </ul>
          </li>
          <li className="container-item banner">
            <ul>
              <li className="greet">
                <a href="#">幸一光の想い</a>
                <a href="#">幸一光からのご挨拶</a>
              </li>
              <li className="tech">
                <p className="title">継承される技術</p>
                <a href="#">江戸木目込人形</a>
                <a href="#">江戸節句人形</a>
              </li>
            </ul>
          </li>
        </ul>

        <ul className="sub-container">
          <li>
            <a href="#">会社概要</a>
          </li>
          <li>
            <a href="#">取扱店舗一覧</a>
          </li>
          <li>
            <a href="#">よくあるご質問</a>
          </li>
          <li>
            <a href="#">ショールームのご案内</a>
          </li>
        </ul>
      </div>

      <div className="bottom">
        <div className="group-contact">
          <div className="left">
            <a href="#">
              <img src="/images/logo.svg" alt="ひな人形、五月人形の幸一光" />
            </a>
            <address>
              <p>東京都足立区栗原2-4-6</p>
              <p>TEL:03-3884-3884</p>
              <p className="time">9:00～17:00（平日）</p>
            </address>
          </div>

          <div className="right">
            <img src="/images/icon-insta-pc.svg" alt="FOLLOW US" />
          </div>
        </div>
        <div className="group-copyright">
          <div className="left">
            <a href="#"> プライバシーポリシー</a>
            <a href="#">特定商取引法</a>
          </div>

          <div className="right">
            <small>2022 koikko co., ltd. All rights reserved.</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
