import { Request } from "../services/request.js";
import { Page } from "../utilities/page.js";
import { Url } from "../utilities/url.js";
import { Catch } from "../utilities/catch.js";
import { Order } from "../model/order.js";

const page = new Page();
const url = new Url();
const storage = new Catch();
const request = new Request("http://localhost:3000/")
const payBtn = document.getElementById('payBtn');
const pinModal = document.getElementById('pinModal');
const viewOrder = document.getElementById('viewOrder');
const backbtn = document.getElementById('backbtn');
const pincodeInput = document.getElementById('pincodeInput');

let userId = 0;
(() => {
  userId = storage.getUser().id;
})();

backbtn.addEventListener('click', () => {
  page.go('payment');
})

payBtn.addEventListener("click", () => {

  if (pincodeInput.value != "") {
    pinModal.classList.remove('hidden');
    
  }
  
});


viewOrder.addEventListener("click", () => {
  updateOrders()
  
});



async function updateOrders() {
  const list = await getNonActiveCarts();
  list.forEach(order => {
    order.status ='active'
    
  })

  for (const cart of list) {
    let result = await updateProduct(cart)
    console.log(cart);
  };

  page.go('order');
 

}


async function getNonActiveCarts() {
  let list = [];
  let result = await request.getByFilter('orders', userId);
  console.log(result);
  result.forEach(item => {
  console.log(new Order(item));
    if (item.status == 'non-active') {
      list.push(new Order(item))
    }
    
  });

  console.log(list);
  return list
  

}


async function updateProduct(order) {
  console.log(order);
 return await request.update('orders', order);
}