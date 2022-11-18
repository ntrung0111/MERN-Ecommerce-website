import Head from "next/head";
import { Fragment, useContext, useEffect, useState } from "react";

import Breadcrumb from "../../../components/view/Breadcrumb";
import Header from "../../../components/view/Header";
import Slider from "../../../components/view/Slider";
import ProductDetail from "../../../components/view/ProductDetail";
import ProductRelated from "../../../components/view/ProductRelated";

import { PageContext } from "../../../context/PageContext";
import { getDataAPI } from "../../../utils/fetchData";

const PageItem = ({ product, productsRelated }) => {
  const { showDropdown, setShowDropdown, isPageView, setIsPageView } =
    useContext(PageContext);

  const crumbs = [
    {
      url: "/",
      title: "ホーム",
    },
    {
      url: product.category.slug,
      title: product.category.title,
    },
    {
      url: product.subCategory.slug,
      title: product.subCategory.title,
    },
    {
      url: "#",
      title: product.title,
    },
  ];

  const [productsVisited, setProductsVisited] = useState([]);

  useEffect(() => {
    const __next__history__koikko = JSON.parse(
      localStorage.getItem("__next__history__koikko")
    );

    let products = [];
    const no_of_product = 4; // number of products to be shown in the visited products section

    if (!__next__history__koikko) {
      products = []; // if there is no data in localStorage, then set products to empty array
    } else {
      products = __next__history__koikko; // else get data from localStorage, then set products
    }

    let i = products.length;
    while (i--) {
      const item = products[i];

      if (item._id == product._id) {
        products.splice(i, 1); // if product already exists in the array, then remove it
        break;
      }
    }

    if (products.length > no_of_product) {
      products.splice(0, 1); // if there is max products in the array, then remove the first product
    }

    products.push({
      _id: product._id,
      slug: product.slug,
      subCategory: product.subCategory,
      title: product.title,
      images: product.images,
      price: product.price,
      inStock: product.inStock,
    });

    localStorage.setItem("__next__history__koikko", JSON.stringify(products)); // set products to localStorage

    // remove product having same id of current product page from the array
    let newProducts = products.filter((item) => item._id !== product._id);

    setProductsVisited(newProducts.reverse());
  }, []);

  return (
    <Fragment>
      <Head>
        <title>
          {`${product.title} | ${product.subCategory.title} | ひな人形、五月人形の幸一光 公式オンラインショップ`}
        </title>
      </Head>

      <Header
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        isPageView={isPageView}
        setIsPageView={setIsPageView}
      />

      <Breadcrumb crumbs={crumbs} />

      <main className="product-content">
        <Slider product={product} />

        <ProductDetail product={product} />

        <Breadcrumb crumbs={crumbs} />
      </main>

      {productsRelated.length > 0 && (
        <ProductRelated title="この商品の関連商品" products={productsRelated} />
      )}

      {productsVisited.length > 0 && (
        <ProductRelated
          title="最近チェックした商品"
          products={productsVisited}
        />
      )}
    </Fragment>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const res = await getDataAPI(`/product/${query.slug}`, null);

    if (!res.product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        key: query.slug,
        product: res.product,
        productsRelated: res.productsRelated,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

PageItem.pageClass = "__page-view";

export default PageItem;
