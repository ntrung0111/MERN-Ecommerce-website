import axios from "axios";
import connectDB from "../../../utils/connectDB";
import Contact from "../../../models/contactModel";
import Product from "../../../models/productModel";

connectDB();

const index = async (req, res) => {
  switch (req.method) {
    case "POST":
      await postContact(req, res);
      break;
  }
};

const postContact = async (req, res) => {
  try {
    const { name, email, message, product_id, token } = req.body;

    if (!name || !email || !message || !product_id || !token)
      return res.json({ success: false }); // if validate fail than return false

    // check recaptcha token
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=6LcxxRcjAAAAAJPjO5CKGXtYM-9IKJtD9Hc4nD3t&response=${token}`
    );

    if (recaptchaResponse.data.success) {
      const product = await Product.findOne({ _id: product_id }); // check if product exists
      if (!product) return res.json({ success: false }); // if product is not found than return false

      const newContact = new Contact({
        name,
        email,
        message,
        product: product._id,
      });

      await newContact.save(); // save the new contact

      return res.json({ success: true }); // return true to client
    }

    return res.json({ success: false }); // if validate fail than return false
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default index;
