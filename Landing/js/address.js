import { Request } from "../services/request.js";
import { Page } from "../utilities/page.js";
import { Url } from "../utilities/url.js";
import { Catch } from "../utilities/catch.js";
import { Order } from "../model/order.js";

const page = new Page();
const url = new Url();
const storage = new Catch();
const request = new Request("http://localhost:3000/")

const addresses = document.getElementById('addresses-wrapper');
const addNewAddressBtn = document.getElementById('addNewAddressBtn');
const apply = document.getElementById("applyBtn");
const backbtn = document.getElementById("backbtn");
const modalAddNewAddressBtn = document.getElementById("modalAddNewAddressBtn");
const cancelBtn = document.getElementById("cancel-btn");
const addressModal = document.getElementById("addressModal");
const modalBg = document.getElementById("modal-bg");
const modaladdressInput = document.getElementById("addressInput");
const modaladdressNameInput = document.getElementById("addressNameInput");

let userId = 0;
let currentUser;
(() => {
  currentUser = storage.getUser();
  userId = currentUser.id;
  getUserAddress(userId);
})()

cancelBtn.addEventListener("click", () => {
  addressModal.classList.add('hidden')
})
modalBg.addEventListener("click", () => {
  addressModal.classList.add('hidden')
});
backbtn.addEventListener("click", () => {
  page.go("checkout");
});

addNewAddressBtn.addEventListener("click", () => {
  addressModal.classList.remove('hidden');
});

apply.addEventListener("click", () => {
  const selectedItem = findSelectedItem();
  let name = selectedItem.querySelector('.address-name').textContent;
  let address = selectedItem.querySelector('.current-address').textContent;
  name = `${name}`.toLowerCase();
  storage.set("address",{name ,address})
  page.go("checkout");

})
modalAddNewAddressBtn.addEventListener("click", () => {
  if (modaladdressInput.value != '' && modaladdressNameInput.value != '') {
    currentUser.addresses[modaladdressNameInput.value] = modaladdressInput.value;
    updateUser(currentUser)
  }
})

function generateCard(name,address) {
  return `<div class="bg-white rounded-2xl py-3 px-5 flex gap-3 items-center">
  <div class="p-2 bg-gray-300 w-fit rounded-full">
    <span
      class="bg-black text-lg text-white rounded-full w-9 h-9 flex items-center justify-center"
    >
      <i class="bi bi-geo-alt-fill mt-1"></i>
    </span>
  </div>
  <div class="flex-1 flex flex-col gap-1">
    <div class="flex items-center gap-2">
      <p class="font-bold text-dark-txt text-lg address-name">${uppercaseFirstChr(name)}</p>
      ${name=='home'?`<span
      class="text-sm bg-gray-200 rounded-md text-gray-600 px-2 py-[2px]">Defualt</span>`:''}
      
    </div>
    <p class="text-sm text-gray-500 line-clamp-1 text-ellipsis current-address">${address}</p>
  </div>

  <input
    class="w-5 h-5 accent-black shipping-address"
    ${name=='home'?'checked':''}
    name="shipping-radio"
    type="radio"
  />
</div>`
}

function insertAddress(addressObj) {
  addresses.innerHTML=''
  for (const [name,address] of Object.entries(addressObj)) {
    addresses.innerHTML += generateCard(name, address);
  }
}

function updateUser(user) {
  // console.log(user);
  request.update("users", user).then(result => {
    console.log(result);
    insertAddress(user.addresses);
  })
}

function getUserAddress(id) {
  let userAddresses ={}
  request.getById("users", id).then(user => {
    userAddresses = user[0].addresses
    console.log(userAddresses);
    insertAddress(userAddresses)
  })
}






function uppercaseFirstChr(str) {
  let list = [...str];
  const upper = str.charAt(0).toUpperCase();
  list.splice(0, 1);
  list.unshift(upper);
  return list.join("");
}



function findSelectedItem() {
  let item;
  let radio;
 
  Array.from(addresses.children).forEach(elm => {
    // if(elm)
    // item = elm.closest('.choosshipping')
    radio = elm.lastElementChild;
    if (radio.checked) {
      item = elm;
    }
    
  });

  return item
}