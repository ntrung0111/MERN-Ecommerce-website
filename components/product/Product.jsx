import ProductItem from "./ProductItem";

const Product = ({ products }) => {
  return (
    <ul className="product">
      {products.map((item) => (
        <ProductItem key={item._id} product={item} />
      ))}
    </ul>
  );
};

export default Product;
