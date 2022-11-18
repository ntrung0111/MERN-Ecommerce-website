import Link from "next/link";
import LazyLoad from "react-lazyload";

import { formatPrice } from "../../utils/formatData";

const ProductItem = ({ product }) => {
  return (
    <li className="product-item">
      <Link href={`/view/item/${product.slug}`}>
        <a>
          <div className="image">
            <LazyLoad once={true} offset={200}>
              <img src={product.images[0]} alt={product.title} />
            </LazyLoad>
          </div>

          <div className="category">
            <p>{product.subCategory.title}</p>
          </div>

          <div className="title">
            <p>{product.title}</p>
          </div>

          {product.inStock > 0 ? (
            <div className="price">
              <p>
                ￥{formatPrice(product.price)}
                <span>（税込）</span>
              </p>
            </div>
          ) : (
            <div className="soldOut">
              <p>只今売り切れ</p>
            </div>
          )}
        </a>
      </Link>
    </li>
  );
};

export default ProductItem;
