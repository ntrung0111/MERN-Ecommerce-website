import Head from "next/head";
import Link from "next/link";
import { Fragment, useState, useContext } from "react";

import Product from "../../../components/product/Product";
import Breadcrumb from "../../../components/view/Breadcrumb";
import Header from "../../../components/view/Header";
import Pagination from "../../../components/view/Pagination";

import { PageContext } from "../../../context/PageContext";
import { getDataAPI } from "../../../utils/fetchData";
import MultipleObserver from "../../../utils/multipleObserver";

const PageItem = ({
  category,
  subCategory,
  products,
  currentPage,
  pages,
  slug,
}) => {
  const { showDropdown, setShowDropdown, isPageView, setIsPageView } =
    useContext(PageContext);

  const [showSubCategory, setShowSubCategory] = useState(false);

  const crumbs = [
    {
      url: "/",
      title: "ホーム",
    },
    {
      url: category.slug,
      title: category.title,
    },
    {
      url: category.subCategory?.slug,
      title: category.subCategory?.title,
    },
  ];

  return (
    <Fragment>
      <Head>
        <title>
          {`${category.title}
          ${
            category.subCategory !== undefined
              ? `,${category.subCategory.title}`
              : ""
          } |
          ひな人形、五月人形の幸一光 公式オンラインショップ`}
        </title>
      </Head>

      <Header
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        isPageView={isPageView}
        setIsPageView={setIsPageView}
      />

      <Breadcrumb crumbs={crumbs} />

      <main className="category-content">
        <header className="category-header">
          {!subCategory ? (
            <Fragment>
              <img
                className="category-headerImg arrow"
                src="/images/arrow.svg"
                alt=""
              />

              <MultipleObserver>
                <h1 className="category-headerH1">
                  {category.subCategory.title}の商品一覧
                </h1>
              </MultipleObserver>
            </Fragment>
          ) : (
            <Fragment>
              <img
                className={`category-headerImg ${category.slug}`}
                src={category.image}
                alt={category.title}
              />

              <MultipleObserver>
                <h1 className="category-headerH1">
                  {category.title}の商品一覧
                </h1>
              </MultipleObserver>
            </Fragment>
          )}

          <p className="category-headerP">{category.title_en}</p>
        </header>

        <div className="category-result">
          <p className="category-count">
            商品数：
            <span className="category-countResult">{products.length}</span>件
          </p>

          {subCategory && (
            <Fragment>
              <div
                className={`nav-sp ${showSubCategory ? "is-open" : ""}`}
                onClick={() => setShowSubCategory((prev) => !prev)}
              >
                サブカテゴリーで絞り込む
                <div className="dropdown-button"></div>
              </div>

              <nav>
                <ul
                  className={`category-subCategory ${
                    showSubCategory ? "is-open" : ""
                  }`}
                >
                  {subCategory.map((item) => (
                    <li key={item._id} className="category-subCategory-item">
                      <Link href={`/view/category/${item.slug}`}>
                        <a>
                          {item.title}
                          <span className="subCategory-countResult">
                            ({item.amount})
                          </span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Fragment>
          )}
          {products.length > 0 ? (
            <Product products={products} />
          ) : (
            <div className="notFound">
              <img
                src="/images/notfound.png"
                alt="お探しの画像が見つかりませんでした。"
              />

              <Link href="/">
                <a>前のページへ戻る</a>
              </Link>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            pages={pages}
            url={`/view/category/${slug}?`}
          />
        </div>
      </main>
    </Fragment>
  );
};

PageItem.pageClass = "__page-view";

export async function getServerSideProps({ query }) {
  try {
    const res = await getDataAPI(
      `/category/${query.slug}?page=${query.page}`,
      null
    );

    return {
      props: {
        key: query.slug,
        category: res.category,
        subCategory: res.subCategory || null,
        products: res.products,
        currentPage: res.currentPage,
        pages: res.pages,
        slug: query.slug,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default PageItem;
