import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";

import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import Notify from "./Notify";
import Loading from "./Loading";

import { PageContext } from "../context/PageContext";

const Layout = ({ children, pageClass }) => {
  const router = useRouter();

  const [showHeader, setShowHeader] = useState(false);
  const [showPageTop, setShowPageTop] = useState(false);

  const {
    showDropdown,
    setShowDropdown,
    isPageView,
    setIsPageView,
    notify,
    loading,
    setLoading,
    setShowSearch,
  } = useContext(PageContext);

  const controlLayout = useCallback(() => {
    if (window.pageYOffset >= 200) {
      setShowHeader(true);
      setShowPageTop(true);
    } else {
      setShowHeader(false);
      setShowPageTop(false);
    }

    setIsPageView(false);
    setShowDropdown(false);
  }, [setIsPageView, setShowDropdown]);

  // control dropdown header state
  useEffect(() => {
    setShowDropdown(false);
    setShowSearch(false);
  }, [router]);

  // control user's scroll down page
  useEffect(() => {
    window.addEventListener("scroll", controlLayout, { passive: true });

    return () => {
      window.removeEventListener("scroll", controlLayout, { passive: true });
    };
  }, [controlLayout]);

  // control notify state
  useEffect(() => {
    if (notify.show) {
      document.querySelector("body").classList.add("is-locked");
    } else {
      document.querySelector("body").classList.remove("is-locked");
    }
  }, [notify]);

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
    <div className={pageClass}>
      <Header
        showHeader={showHeader}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        isPageView={isPageView}
        setIsPageView={setIsPageView}
      />

      {children}

      <Footer />

      <ScrollToTop showPageTop={showPageTop} />

      {notify.show && <Notify />}

      {loading && <Loading />}
    </div>
  );
};

export default Layout;
