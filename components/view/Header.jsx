import Link from "next/link";
import ButtonMenu from "../ButtonMenu";

const Header = ({
  showDropdown,
  setShowDropdown,
  isPageView,
  setIsPageView,
}) => {
  return (
    <div className="header-view">
      <div className="header-above">
        <p>
          ひな人形、五月人形をはじめとする、木目込み人形や衣裳着人形を作っている幸一光の公式オンラインショップ
        </p>

        <ul className="nav">
          <li>ご利用ガイド</li>
          <li>お問い合わせ</li>
        </ul>
      </div>

      <div className="header">
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
                  onClick={() => {
                    setShowDropdown(!showDropdown);
                    setIsPageView(!isPageView);
                  }}
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
    </div>
  );
};

export default Header;
