import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/_globals.scss";

import { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../components/Layout";

import { AppContextProvider } from "../context/AppContextProvider";
import { pageview } from "../utils/ga";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (router.pathname === "/_error")
    return (
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    );

  if (
    router.pathname === "/view/checkout" ||
    router.pathname === "/view/checkout/success"
  )
    return (
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    );

  return (
    <AppContextProvider>
      <Layout pageClass={Component.pageClass}>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
};

export default MyApp;
