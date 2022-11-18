import connectDB from "../../../utils/connectDB";
import Product from "../../../models/productModel";
import Category from "../../../models/categoryModel";
import SubCategory from "../../../models/subCategoryModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { slug } = req.query;

    const product = await Product.findOne({ slug, public: true })
      .populate("category", "title image slug", Category)
      .populate("subCategory", "title slug", SubCategory)
      .select("-createdAt -updatedAt -__v -sold -available -public");

    const productsRelated = await Product.find({
      slug: { $nin: product.slug },
      related: product.related,
      public: true,
    })
      .populate("subCategory", "title slug", SubCategory)
      .sort({ available: -1, createdAt: -1 })
      .select("-createdAt -updatedAt -__v -sold -available -public");

    res.json({
      product,
      productsRelated,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
