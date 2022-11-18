import MultipleObserver from "../../utils/multipleObserver";

const ProductTitle = ({ image, title, text, alt = "" }) => {
  return (
    <div className="product-title">
      <img className="image" src={image} alt={alt} />
      <MultipleObserver>
        <p className="title">{title}</p>
      </MultipleObserver>
      <p className="text">{text}</p>
    </div>
  );
};

export default ProductTitle;
