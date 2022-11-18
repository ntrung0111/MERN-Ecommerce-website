import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect } from "react";

import Loading from "../components/Loading";

import { PageContext } from "../context/PageContext";

const Custom404 = () => {
  const router = useRouter();

  const { loading, setLoading } = useContext(PageContext);

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

  return (
    <Fragment>
      <Head>
        <title>申し訳ございません。| 現在、このページは存在しません。</title>
      </Head>

      <div className="error-wrap">
        <div className="error-content">
          <i className="material-icons error-icon">not_interested</i>
          <p className="error-message">
            申し訳ございません。
            <br />
            現在、このページは存在しません。
          </p>
          <Link href="/">
            <a className="button">ショップのトップページへ</a>
          </Link>
        </div>
      </div>

      {loading && <Loading />}
    </Fragment>
  );
};

export default Custom404;
