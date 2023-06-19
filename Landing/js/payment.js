import { Request } from "./request.js";
import { Page } from "./page.js";
import { Catch } from "./catch.js";
import { Order } from "./order.js";

const page = new Page();
const storage = new Catch()

const request = new Request("http://localhost:3000/")

const paymentMethodWrapper = document.getElementById('paymentMethodWrapper');
const ConfirmBtn = document.getElementById('ConfirmBtn');
const backbtn = document.getElementById('backbtn');



backbtn.addEventListener('click', () => {
  page.go('checkout');
})

ConfirmBtn.addEventListener("click", () => {
  const selectedItem = findSelectedItem();
  console.log(selectedItem);
  // updateOrders();
  page.go('pin')
});




function findSelectedItem() {
  let item;
  let radio;
 
  Array.from(paymentMethodWrapper.children).forEach(elm => {
    // if(elm)
    // item = elm.closest('.choosshipping')
    radio = elm.lastElementChild;
    if (radio.checked) {
      item = elm;
    }
    
  });

  return item
}

