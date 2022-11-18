import mongoose from "mongoose";
import paypal from "paypal-rest-sdk";
import Product from "../../../models/productModel";
import connectDB from "../../../utils/connectDB";
import { formatPaypalItems, getTotal } from "../../../utils/formatData";

connectDB();

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const checkProduct = async (products) => {
  let newCart = [];

  for (let i = 0; i < products.length; i++) {
    if (mongoose.isValidObjectId(products[i]._id)) {
      // check if _id is correct format mongodb
      let check = await Product.findOne({ _id: products[i]._id, public: true }); // find product in database

      if (!check) return { status: false }; // if product is not found then return false;

      // check if all information is valid
      if (
        check.inStock <= 0 ||
        products[i].quantity > check.inStock ||
        products[i].image !== check.images[0] ||
        products[i].price !== check.price ||
        products[i].slug !== check.slug ||
        products[i].title !== check.title
      ) {
        return { status: false };
      } else {
        // if all valid, push new item to cart
        newCart.push({
          image: check.images[0],
          inStock: check.inStock,
          price: check.price,
          slug: check.slug,
          title: check.title,
          _id: check._id,
          quantity: products[i].quantity,
        });
      }
    } else {
      // if _id is incorrect then return false
      return { status: false };
    }
  }

  // return true and newest cart data
  return {
    status: true,
    cart: newCart,
  };
};

const index = async (req, res) => {
  switch (req.method) {
    case "POST":
      await makePayment(req, res);
      break;
  }
};

const makePayment = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.json({ err: true });

    const check = await checkProduct(data.cart); // check if item in cart valid
    if (check.status === false) return res.json({ err: true, code: 404 }); // if not then set cart in client to empty array

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.BASE_URL}/view/checkout/success`,
        cancel_url: `${process.env.BASE_URL}/view/checkout`,
      },
      transactions: [
        {
          item_list: {
            items: formatPaypalItems(check.cart),
          },
          amount: {
            currency: "JPY",
            total: getTotal(check.cart).toString(),
          },
          description: "支払情報 | 五月人形の幸一光 公式オンラインショップ",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (err, payment) {
      if (err) {
        return res.status(500).json({ err: true });
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            return res.json({ success: true, url: payment.links[i].href }); // send paypal payment url to client redirect
          }
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
