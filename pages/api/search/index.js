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

const checkPage = (page) => {
  if (page <= 0) return 1;

  if (page % 1 === 0) return page * 1;

  return 1;
};

const getProducts = async (req, res) => {
  try {
    const { search_keyword, sort, page } = req.query;

    const perPage = 50; // amount of products display per page

    let currentPage = checkPage(page), // current page
      sort_query = { available: -1, createdAt: -1 }; // default sort by inStock, the big inStock left, the better

    if (sort) {
      switch (sort) {
        case "price":
          sort_query = { available: -1, price: 1 };
          break;
        case "price_high":
          sort_query = { available: -1, price: -1 };
          break;
        case "recommend":
          sort_query = { available: -1, sold: -1 };
          break;
        case "order":
          sort_query = { available: -1, createdAt: -1 };
          break;
      }
    }

    let search_query = [
      {
        $match: {
          public: true,
        },
      },
      { $sort: sort_query },
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategory",
          foreignField: "_id",
          pipeline: [{ $project: { title: 1, slug: 1 } }],
          as: "subCategory",
        },
      },
      { $skip: perPage * currentPage - perPage },
      { $limit: perPage },
      { $unwind: "$subCategory" },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          sold: 0,
          available: 0,
          public: 0,
        },
      },
    ];

    let count_query = [{ $count: "count" }];

    // check if search keyword has value, then add search keyword to query
    if (search_keyword && search_keyword.trim().length !== 0) {
      const seach_index = {
        $search: {
          index: "search_product",
          text: {
            query: search_keyword,
            path: {
              wildcard: "*",
            },
          },
        },
      };

      search_query.unshift(seach_index); // add seach keyword to search query
      count_query.unshift(seach_index); // add seach keyword to count query
    }

    const products = await Product.aggregate(search_query);
    const count = await Product.aggregate(count_query);

    res.json({
      search_keyword,
      sort,
      products,
      count: count[0] ? count[0].count : 0,
      currentPage,
      pages: Math.ceil((count[0] ? count[0].count : 0) / perPage),
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
