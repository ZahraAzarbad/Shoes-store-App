export class Product{

  id = 0;
  images = [];
  tinyImage = '';
  title = '';
  description = '';
  price = '';
  sizes = [];
  colors = [];
  soldNumbers = 0;
  rate = 0;
  viewers = 0;
  brand = '';

  constructor(product) {
    this.id = product.id;
    this.images = product.images;
    this.tinyImage = product.tinyImage;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.sizes = product.sizes;
    this.colors = product.colors;
    this.soldNumbers = product.soldNumbers;
    this.rate = product.rate;
    this.viewers = product.viewers;
    this.brand = product.brand;
  }


}