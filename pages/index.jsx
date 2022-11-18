import Head from "next/head";
import { Fragment } from "react";

import Carousel from "../components/Carousel";
import News from "../components/News";
import Banner from "../components/Banner";
import ProductTitle from "../components/product/ProductTitle";
import Product from "../components/product/Product";

import { getDataAPI } from "../utils/fetchData";

const Home = ({ products }) => {
  return (
    <Fragment>
      <Head>
        <title>ひな人形、五月人形の幸一光 公式オンラインショップ</title>
      </Head>

      <Carousel />

      <main className="home">
        <News />

        <Banner />

        <section className="home-product">
          <ProductTitle
            image={"/images/arrow.svg"}
            title={"商品のご案内"}
            text={"Products"}
          />

          <Product products={products} />
        </section>
      </main>
    </Fragment>
  );
};

export async function getServerSideProps() {
  try {
    const res = await getDataAPI(`/product`, null);

    return {
      props: {
        products: res.products,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Home;
