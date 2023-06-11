
export class User {

    id = 0;
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    addresses = {};
    ordersID = [];
    wishlists = [];
  
  
    constructor(user) {
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.password = user.password;
      this.addresses = user.addresses;
      this.ordersID = user.ordersID;
    }
  
  
  }