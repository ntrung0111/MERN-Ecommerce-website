export const formatPrice = (price) => {
  return price.toLocaleString().replace(".", ",");
};

export const getTotal = (cart) => {
  const total = cart.reduce((prev, item) => {
    return prev + item.price * item.quantity;
  }, 0);

  return total;
};

export const formatPaypalItems = (data) => {
  var items = [];
  var index = 1;

  for (var _id in data) {
    items.push({
      name: data[_id].title,
      sku: index.toString(),
      price: data[_id].price.toString(),
      currency: "JPY",
      quantity: data[_id].quantity,
    });

    index++;
  }

  return items;
};

export const normalDateTime = (datetime) => {
  const hours = datetime.getHours();
  const minutes = datetime.getMinutes();
  const AMPM = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const strTime = hours + ":" + minutes + " " + AMPM;

  return (
    ("0" + datetime.getUTCDate()).slice(-2) +
    "/" +
    ("0" + (datetime.getUTCMonth() + 1)).slice(-2) +
    "/" +
    datetime.getUTCFullYear() +
    ", " +
    strTime
  );
};
