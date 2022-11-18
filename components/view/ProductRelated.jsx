import Product from "../product/Product";

const ProductRelated = ({ title, products }) => {
  return (
    <aside className="product-related">
      <h2 className="product-relatedTitle">{title}</h2>

      <Product products={products} />
    </aside>
  );
};

export default ProductRelated;
