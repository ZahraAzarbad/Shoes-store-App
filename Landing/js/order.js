export class Order{
  id = 0;
  userID = 0;
  productID = 0;
  image=''
  color = '';
  size = 0;
  status = "";
  count = 0;
  title = '';
  price = 0;
  totalPrice = 0;
  paymentMethod = '';
  shippingAddress = '';

  constructor(order) {
    this.id = order.id;
    this.userID = order.userId;
    this.productID =order.productId;
    this.color = order.color;
    this.size = order.size;
    this.image = order.image;
    this.status = order.status;
    this.count = order.count;
    this.title = order.title;
    this.totalPrice = order.totalPrice;
    this.price = order.price;
    this.paymentMethod = order.paymentMethod;
    this.shippingAddress = order.shippingAddress;
  }


  statusTxt() {
    if (this.status == 'active') {
      return "In Delivery"
    } else if (this.status == "complete") {
      return "Complete"
    } else {
      return "off"
    }
  }

  cardBtnTxt() {
    if (this.status == 'active') {
      return "Track Order"
    } else if (this.status == "complete") {
      return "Buy Again"
    }
  }

}