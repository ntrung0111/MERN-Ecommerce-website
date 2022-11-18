import Head from "next/head";
import Link from "next/link";
import { Fragment, useContext } from "react";

import Product from "../../../components/product/Product";
import Breadcrumb from "../../../components/view/Breadcrumb";
import Header from "../../../components/view/Header";
import Pagination from "../../../components/view/Pagination";

import { PageContext } from "../../../context/PageContext";
import { getDataAPI } from "../../../utils/fetchData";
import MultipleObserver from "../../../utils/multipleObserver";

const PageSearch = ({
  search_keyword,
  sort,
  products,
  count,
  currentPage,
  pages,
}) => {
  const { showDropdown, setShowDropdown, isPageView, setIsPageView } =
    useContext(PageContext);

  const crumbs = [
    {
      url: "/",
      title: "ホーム",
    },
    {
      url: "#",
      title: `「${search_keyword}」での検索結果`,
    },
  ];

  return (
    <Fragment>
      <Head>
        <title>
          {`${search_keyword}での検索結果 | ひな人形、五月人形の幸一光
          公式オンラインショップ | 商品一覧`}
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
          <img
            className="category-headerImg arrow"
            src="/images/arrow.svg"
            alt=""
          />

          <MultipleObserver>
            <h1 className="category-headerH1">
              「{search_keyword}」での検索結果
            </h1>
          </MultipleObserver>

          <p className="category-headerP">Search Results</p>
        </header>

        <div className="category-result">
          {products.length > 0 ? (
            <Fragment>
              <p className="category-count">
                商品数：
                <span className="category-countResult">{count}</span>
                件中
                <span className="category-countResult"> {products.length}</span>
                件
              </p>

              <dl className="category-sort">
                <dt className="category-sortHead">並び替え：</dt>
                <dd>
                  <Link
                    href={`/view/search?${
                      search_keyword && `search_keyword=${search_keyword}&`
                    }sort=price`}
                  >
                    <a>価格の低い順</a>
                  </Link>
                </dd>
                <dd>
                  <Link
                    href={`/view/search?${
                      search_keyword && `search_keyword=${search_keyword}&`
                    }sort=price_high`}
                  >
                    <a>価格の高い順</a>
                  </Link>
                </dd>
                <dd>
                  <Link
                    href={`/view/search?${
                      search_keyword && `search_keyword=${search_keyword}&`
                    }sort=recommend`}
                  >
                    <a>おすすめ順</a>
                  </Link>
                </dd>
                <dd>
                  <Link
                    href={`/view/search?${
                      search_keyword && `search_keyword=${search_keyword}&`
                    }sort=order`}
                  >
                    <a>新着順</a>
                  </Link>
                </dd>
              </dl>

              <Product products={products} />
            </Fragment>
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
            url={`/view/search?search_keyword=${search_keyword}${
              sort !== "undefined" ? `&sort=${sort}` : ""
            }&`}
          />
        </div>
      </main>
    </Fragment>
  );
};

PageSearch.pageClass = "__page-view";

export async function getServerSideProps({ query }) {
  try {
    const res = await getDataAPI(
      `/search?search_keyword=${
        !query.search_keyword ? "" : query.search_keyword
      }&sort=${query.sort}&page=${query.page}`,
      null
    );

    return {
      props: {
        search_keyword: res.search_keyword,
        sort: res.sort,
        products: res.products,
        count: res.count,
        currentPage: res.currentPage,
        pages: res.pages,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default PageSearch;
