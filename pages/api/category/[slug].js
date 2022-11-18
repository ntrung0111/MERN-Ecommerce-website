import connectDB from "../../../utils/connectDB";
import Category from "../../../models/categoryModel";
import SubCategory from "../../../models/subCategoryModel";
import Product from "../../../models/productModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getCategory(req, res);
      break;
  }
};

const checkPage = (page) => {
  if (page <= 0) return 1;

  if (page % 1 === 0) return page;

  return 1;
};

const getCategory = async (req, res) => {
  const { slug, page } = req.query;
  const perPage = 50; // Amount of products display per page
  let currentPage = checkPage(page * 1) || 1; // current page, if not defined then current page is 1

  try {
    const category = await Category.findOne({ slug, public: true }).select(
      "_id title title_en slug image"
    );

    // check if this category is SubCategory or Category
    if (!category) {
      // SubCategory PAGE
      const subCategory = await SubCategory.findOne({
        slug,
        public: true,
      })
        .populate("category", "title slug", Category)
        .select("_id title title_en slug");

      const products = await Product.find({
        subCategory: subCategory._id,
        public: true,
      }) // find products by SubCategory id
        .skip(perPage * currentPage - perPage)
        .limit(perPage)
        .populate("subCategory", "title slug", SubCategory)
        .sort({ available: -1, createdAt: -1 })
        .select("-createdAt -updatedAt -__v -sold -available -public");

      const count = await Product.countDocuments({
        subCategory: subCategory._id,
        public: true,
      }); // Count products to get pages

      // format SubCategory before send to FE
      res.json({
        category: {
          _id: subCategory._id,
          title: subCategory.category.title,
          slug: subCategory.category.slug,
          title_en: subCategory.title_en,
          subCategory: {
            title: subCategory.title,
            slug: subCategory.slug,
          },
        },
        products,
        currentPage,
        pages: Math.ceil(count / perPage),
      });
    } else {
      // Category PAGE
      // const subCategory = await Product.aggregate([
      //   {
      //     $match: {
      //       category: category._id,
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "subcategories",
      //       localField: "subCategory",
      //       foreignField: "_id",
      //       pipeline: [{ $project: { title: 1, slug: 1, createdAt: 1 } }],
      //       as: "subCategory",
      //     },
      //   },
      //   { $unwind: "$subCategory" },
      //   {
      //     $project: {
      //       subCategoryId: "$subCategory._id", // ----> subcategoryId
      //       subCategoryTitle: "$subCategory.title",
      //       subCategorySlug: "$subCategory.slug",
      //       subCategoryCreatedAt: "$subCategory.createdAt",
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: "$subCategoryId", // group by subcategoryId
      //       title: { $first: "$subCategoryTitle" },
      //       slug: { $first: "$subCategorySlug" },
      //       amount: { $sum: 1 },
      //       createdAt: { $first: "$subCategoryCreatedAt" },
      //     },
      //   },
      //   {
      //     $sort: { createdAt: 1 },
      //   },
      // ]);

      const subCategory = await SubCategory.find({
        category: category._id,
        public: true,
      }).select("_id title slug amount");

      const products = await Product.find({
        category: category._id,
        public: true,
      }) // find products by Category id
        .skip(perPage * currentPage - perPage)
        .limit(perPage)
        .populate("subCategory", "title slug", SubCategory)
        .sort({ available: -1, createdAt: -1 })
        .select("-createdAt -updatedAt -__v -sold -available -public");

      const count = await Product.countDocuments({
        category: category._id,
        public: true,
      }); // Count products to get pages

      res.json({
        category,
        subCategory,
        products,
        currentPage,
        pages: Math.ceil(count / perPage),
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
