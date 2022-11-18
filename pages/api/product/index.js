import connectDB from "../../../utils/connectDB";
import Product from "../../../models/productModel";
import SubCategory from "../../../models/subCategoryModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ public: true })
      .populate("subCategory", "title slug", SubCategory)
      .sort({ sold: -1, createdAt: -1 })
      .select("-createdAt -updatedAt -__v -sold -available -public")
      .limit(12);

    res.json({
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
