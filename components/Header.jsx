import Link from "next/link";
import { useRouter } from "next/router";

import { useContext, useEffect, useState } from "react";
import ButtonMenu from "./ButtonMenu";

import { PageContext } from "../context/PageContext";
import { CartContext } from "../context/CartContext";

const Header = ({ showHeader, showDropdown, setShowDropdown }) => {
  const [isToggle, setIsToggle] = useState(false);

  const { search, setSearch } = useContext(PageContext);

  const router = useRouter();

  useEffect(() => {
    if (isToggle) {
      setIsToggle(false);
    }
  }, [router]);

  const { cart } = useContext(CartContext);

  return (
    <div className="header-top">
      <div className={`header-sp ${isToggle ? "show-sp" : ""}`}>
        <Link href={"/"}>
          <a>
            <img
              src="/images/logo.svg"
              alt="ひな人形、五月人形の幸一光"
              className="logo"
            />
          </a>
        </Link>

        <div className="menu-button-sp">
          <div className="cart-button">
            <Link href="/view/cart">
              <a>
                <img src="/images/icon-cart.svg" alt="キーワードを入力" />
                {cart.length > 0 && <span className="cart-badge"></span>}
              </a>
            </Link>
          </div>

          <div
            className="toggle-button"
            onClick={() => setIsToggle((prev) => !prev)}
          >
            <div className={`hamburger ${isToggle ? "animate" : ""}`}></div>
          </div>
        </div>
      </div>

      {/* Drop down sp */}
      <div className={`dropdown-sp ${isToggle ? "show-sp" : ""}`}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="キーワードを入力"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link href={`/view/search?search_keyword=${search}`}>
            <a>
              <div className="search-button" />
            </a>
          </Link>
        </div>

        <div className="nav-sp">
          <div className="group">
            <ul className="container">
              <li>
                <Link href="/view/category/hina">
                  <a>
                    <img
                      src="/images/thumb-hina.png"
                      alt="ひな人形"
                      className="img-hina"
                    />
                    <p>ひな人形</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/view/category/gogatsu">
                  <a>
                    <img
                      src="/images/thumb-may.png"
                      alt="五月人形"
                      className="img-may"
                    />
                    <p>五月人形</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/view/category/wa-works">
                  <a>
                    <img
                      src="/images/thumb-works.png"
                      alt="和わーくす"
                      className="img-works"
                    />
                    <p>和わーくす</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/view/category/anima">
                  <a>
                    <img
                      src="/images/thumb-anima.png"
                      alt="Anima"
                      className="img-anima"
                    />
                    <p>Anima</p>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="group">
            <p className="group-title">幸一光のものづくり</p>
            <ul className="container">
              <li>
                <a href="#">幸一光の想い</a>
              </li>
              <li>
                <a href="#">幸一光からのご挨拶</a>
              </li>
              <li>
                <a href="#">江戸木目込人形について</a>
              </li>
              <li>
                <a href="#">江戸節句人形について</a>
              </li>
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
        </div>

        <div className="banner-sp">
          <a href="#">
            <div className="info-sp">
              <h2>ご利用ガイド</h2>
              <p>配送・送料・お支払いなど</p>
            </div>
            <img src="/images/thumb-anima.png" alt="Anima" />
          </a>
          <a href="#">
            <div className="info-sp">
              <p>メールでお問い合わせ</p>
              <p>24時間受付</p>
            </div>
          </a>
        </div>
      </div>

      <div className={`header ${showHeader ? "active" : ""}`}>
        <nav className="nav">
          <div className="header-left">
            <Link href={"/"}>
              <a>
                <img
                  src="/images/logo.svg"
                  alt="ひな人形、五月人形の幸一光"
                  className="logo"
                />
              </a>
            </Link>

            <ul>
              <li>
                <p
                  className={`dropdown-button ${showDropdown ? "active" : ""}`}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  幸一光のものづくり
                </p>
              </li>
              <li>
                <Link href="/view/category/hina">
                  <a>ひな人形</a>
                </Link>
              </li>
              <li>
                <Link href="/view/category/gogatsu">
                  <a>五月人形</a>
                </Link>
              </li>
              <li>
                <Link href="/view/category/wa-works">
                  <a>和わーくす</a>
                </Link>
              </li>
              <li>
                <Link href="/view/category/anima">
                  <a>Anima</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="header-right">
            <ButtonMenu header={true} />
          </div>
        </nav>
      </div>

      {/* Drop down */}
      <div
        className={`dropdown ${showHeader ? "is-scoll" : ""} ${
          showDropdown ? "active" : ""
        } `}
      >
        {/* Link list with image */}
        <ul className="link">
          <li>
            <img src="/images/menu-img01.jpg" alt="幸一光の想い" />
            <p>幸一光の想い</p>
          </li>
          <li>
            <img src="/images/menu-img02.jpg" alt="幸一光からのご挨拶" />
            <p>幸一光からのご挨拶</p>
          </li>
          <li>
            <p className="group-title">継承される技術</p>
            <div className="group">
              <div>
                <img src="/images/menu-img03.jpg" alt="江戸木目込人形" />
                <p>江戸木目込人形</p>
              </div>

              <div>
                <img src="/images/menu-img04.jpg" alt="江戸節句人形" />
                <p>江戸節句人形</p>
              </div>
            </div>
          </li>
        </ul>

        {/* Link list */}
        <ul className="link-list">
          <li>会社概要</li>
          <li>取扱店舗一覧</li>
          <li>よくあるご質問</li>
          <li>ショールームのご案内</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
