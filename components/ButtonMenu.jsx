import Link from "next/link";
import { useEffect, useContext, useRef } from "react";

import { PageContext } from "../context/PageContext";
import { CartContext } from "../context/CartContext";

const ButtonMenu = ({ header = false }) => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(PageContext);

  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.className === `search-button active`) return;

      if (
        inputRef.current &&
        inputRef.current.className !== e.target.className
      ) {
        return setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { cart } = useContext(CartContext);

  return (
    <div className="menu-button">
      <div
        className={`search-bar ${showSearch ? "active" : ""} ${
          !header ? "diff" : ""
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="キーワードを入力"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link href={`/view/search?search_keyword=${search}`}>
          <a className={`search-button ${showSearch ? "active" : ""}`}>
            検索する
          </a>
        </Link>
      </div>

      <div
        className={`button search-button ${showSearch ? "active" : ""} ${
          !header ? "diff" : ""
        }`}
        onClick={() => setShowSearch(true)}
      >
        <img src="/images/icon-search.svg" alt="検索" />
      </div>

      <div className={`button cart-button ${!header ? "diff" : ""}`}>
        <Link href="/view/cart">
          <a>
            <img src="/images/icon-cart.svg" alt="キーワードを入力" />
            {cart.length > 0 && <span className="cart-badge"></span>}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ButtonMenu;
