import Link from "next/link";
import Slider from "react-slick";
import ButtonMenu from "./ButtonMenu";
import MultipleObserver from "../utils/multipleObserver";

const Carousel = () => {
  // slick-slider
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    accessibility: false,
    draggable: false,
    fade: true,
    speed: 1350,
    pauseOnHover: false,
    slidesToShow: 1,
    dots: false,
    arrows: false,
  };

  // Slider data
  const sliderData = [
    {
      img: "/images/mainimage-sp-3-1.jpg",
      divBackground: "/images/mainimage-3-1.jpg",
    },
    {
      img: "/images/mainimage-sp-1-3.jpg",
      divBackground: "/images/mainimage-1-3.jpg",
    },
    {
      img: "/images/mainimage-sp-2-2.jpg",
      divBackground: "/images/mainimage-2-2.jpg",
    },
  ];

  // Nav data
  const navData = [
    {
      src: "/images/text-hina.svg",
      alt: "ひな人形",
      url: "/view/category/hina",
    },
    {
      src: "/images/text-may.svg",
      alt: "五月人形",
      url: "/view/category/gogatsu",
    },
    {
      src: "/images/text-works.svg",
      alt: "和わーくす",
      url: "/view/category/wa-works",
    },
    {
      src: "/images/text-anima.svg",
      alt: "Anima",
      url: "/view/category/anima",
    },
  ];

  return (
    <div className="carousel">
      <div className="carousel-on">
        <div className="head">
          <Link href="/">
            <a>
              <img
                src="/images/logo.svg"
                alt="ひな人形、五月人形の幸一光"
                className="logo"
              />
            </a>
          </Link>
          {/* Search & Cart button */}
          <ButtonMenu />
        </div>

        <MultipleObserver>
          <img
            src="/images/text-hero-sp.svg"
            alt="こころに寄り添う人形を"
            className="text-sp"
          />
        </MultipleObserver>

        <img
          src="/images/text-hero-pc.svg"
          alt="こころに寄り添う人形を"
          className="text"
        />

        {/* Nav */}
        <nav>
          <ul>
            {navData.map((item, index) => (
              <li key={index}>
                <Link href={item.url}>
                  <a>
                    <MultipleObserver>
                      <img src={item.src} alt={item.alt} className="text" />
                      <img src="/images/arrow.svg" alt="" className="arrow" />
                    </MultipleObserver>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Slider */}
      <div className="carousel-under">
        <Slider {...settings}>
          {sliderData.map((item, index) => (
            <div key={index} className="carousel-item">
              <img src={item.img} alt="" />
              <div
                style={{
                  backgroundImage: `url(${item.divBackground})`,
                }}
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
