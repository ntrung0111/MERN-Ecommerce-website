import Link from "next/link";
import { animateScroll as scroll } from "react-scroll";

const ScrollToTop = ({ showPageTop }) => {
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      delay: 0,
      smooth: true,
    });
  };

  return (
    <div className={`page-top ${showPageTop ? "active" : ""}`}>
      <Link href="#top">
        <a onClick={scrollToTop}></a>
      </Link>
    </div>
  );
};

export default ScrollToTop;
