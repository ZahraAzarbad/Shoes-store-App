
import { Catch } from "../utilities/catch.js";
import { Page } from "../utilities/page.js";
const storage = new Catch();
const page = new Page();
const shippingList = document.querySelectorAll('.choosshipping');
const apply = document.getElementById("applyBtn");
const backbtn = document.getElementById("backbtn");

backbtn.addEventListener("click", () => {
  page.go("checkout");
});

apply.addEventListener("click", () => {
  const selectedItem = findSelectedItem();
  let iconElm = selectedItem.querySelector('i');
  let shippingName = selectedItem.querySelector('.title');
  let shippingMsg = selectedItem.querySelector('.way');
  let shippingPrice = selectedItem.querySelector('.shippingPrice');
  console.log(iconElm);
  const shipping = {
    icon: `${iconElm.outerHTML}`,
    name: shippingName.textContent,
    msg: shippingMsg.textContent.trim(),
    price: shippingPrice.textContent,
  }

  storage.set("shipping",shipping)
  page.go("checkout");

})


function findSelectedItem() {
  let item;
  let radio;
 
  shippingList.forEach(elm => {
    // if(elm)
    // item = elm.closest('.choosshipping')
    radio = elm.lastElementChild;
    if (radio.checked) {
      item = elm;
    }
    
  });

  return item
}