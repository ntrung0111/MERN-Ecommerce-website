import mongoose from "mongoose";
import paypal from "paypal-rest-sdk";
import Order from "../../../../models/orderModel";
import Product from "../../../../models/productModel";
import connectDB from "../../../../utils/connectDB";
import { getTotal } from "../../../../utils/formatData";

connectDB();

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const index = async (req, res) => {
  switch (req.method) {
    case "POST":
      await postSuccessPayment(req, res);
      break;
    case "GET":
      await getSuccessPaymentInfo(req, res);
      break;
  }
};

const postSuccessPayment = async (req, res) => {
  try {
    const { cart, customerInfo, PayerID, paymentId } = req.body;

    if (!cart || cart.length === 0 || !customerInfo || !PayerID || !paymentId)
      return res.json({ err: true });

    const execute_payment_json = {
      payer_id: PayerID,
      transactions: [
        {
          amount: {
            currency: "JPY",
            total: getTotal(cart).toString(),
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async function (err, payment) {
        if (err) {
          return res.json({ err: true });
        } else {
          const order = await Order.findOne({ paymentId });
          // check if order already created, if not then create order
          if (!order) {
            // if user config localStorage then set data to empty, will check order by paypal
            const newOrder = new Order({
              paymentId: payment.transactions[0].related_resources[0].sale.id,
              name: customerInfo.name || " ",
              phone: customerInfo.phone || " ",
              email: customerInfo.email || " ",
              address: customerInfo.address || " ",
              orderList: cart || [],
              amount: getTotal(cart),
              paymentInfo: payment,
            });

            await newOrder.save(async (err, order) => {
              // update product quantity, sold, available by payment of paypal instead localStorage cart
              await Promise.all(
                payment.transactions[0].item_list.items.map(async (item) => {
                  await updateProduct(item);
                })
              );

              return res.json({
                success: true,
                cart,
                customerInfo,
                orderInfo: order,
              });
            });
          }

          if (order) {
            return res.json({
              success: true,
              cart,
              customerInfo,
              orderInfo: order,
            });
          }
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getSuccessPaymentInfo = async (req, res) => {
  try {
    const { orderId } = req.query;

    if (!mongoose.isValidObjectId(orderId)) {
      return res.json({
        err: true,
        cart: [],
        customerInfo: {},
      });
    }

    const order = await Order.findOne({ _id: orderId });

    if (order) {
      return res.json({
        success: true,
        cart: order.orderList,
        customerInfo: {
          name: order.name,
          phone: order.phone,
          email: order.email,
          address: order.address,
        },
        orderInfo: order,
      });
    } else {
      return res.json({
        err: true,
        cart: [],
        customerInfo: {},
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateProduct = async (item) => {
  const currentProduct = await Product.findOne({ title: item.name });

  await Product.findOneAndUpdate(
    { title: item.name },
    {
      inStock: currentProduct.inStock - item.quantity,
      sold: currentProduct.sold + item.quantity,
      available: currentProduct.inStock - item.quantity <= 0 ? false : true,
    }
  );
};

export default index;
