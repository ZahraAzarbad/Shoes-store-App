import { Request } from "./request.js";
import { Page } from "./page.js";
import { Url } from "./url.js";
import { Catch } from "./catch.js";
import { Order } from "./order.js";

const page = new Page();
const url = new Url();
const storage = new Catch();
const request = new Request("http://localhost:3000/");

const shippingAddress = document.getElementById("select-shippingAddress");
const shippingMethodWrapper = document.getElementById(
  "shipping-method-wrapper"
);

const orderListwrapper = document.getElementById("orderListwrapper");
const amountPrice = document.getElementById("AmountPrice");
const shippingPriceElm = document.getElementById("shippingPrice");
const promoOffPrice = document.getElementById("promoOffPrice");
const shippingTotalPrice = document.getElementById("shippingTotalPrice");
const backbtn = document.getElementById("backbtn");
const addressName = document.getElementById("addressName");
const currentAddress = document.getElementById("currentAddress");
const addPromoBtn = document.getElementById("addPromoBtn");
const promoCardsWrapper = document.getElementById("promoCardsWrapper");
const promoInput = document.getElementById("promoInput");
const modalpromoInput = document.getElementById("modalpromoInput");
const addPromoModal = document.getElementById("addPromoModal");
const modalBg = document.getElementById("modal-bg");
const cancelBtn = document.getElementById("cancel-btn");
const addPromoModalBtn = document.getElementById("addPromoModalBtn");
const paymentBtn = document.getElementById("paymentBtn");
const goShipping = document.getElementById("go-shipping");

const cards = [];
let promo = 0;
let sumPrice = 0;
let userId = 0;

(() => {
  getShippingMethod();
  userId = storage.getUser().id;
  // let urlAddress = url.params("address");
  backbtn.addEventListener('click',()=>{
    window.location=`http://127.0.0.1:5500/Landing/card.html`
})

  goShipping.addEventListener("click", () => {
    // page.go("card");
    window.location=`http://127.0.0.1:5500/Landing/address.html`
  });

  let userCurrentAddress = storage.get('address');
  console.log(userCurrentAddress);
  if (userCurrentAddress != undefined && userCurrentAddress.name !=undefined) {
    
    addressName.textContent = `${uppercaseFirstChr(userCurrentAddress.name)}`
    currentAddress.textContent = `${userCurrentAddress.address}`;
  } else {
    addressName.textContent = `Choose a Address`
    currentAddress.textContent = '';
  }


  // let userAddress = urlAddress ?? "home";
  // getUserAddress().then((addresses) => {
  //   addressName.textContent = `${
  //     addresses[userAddress]
  //       ? uppercaseFirstChr(userAddress)
  //       : "Choose a Address"
  //   }`;
  //   currentAddress.textContent = `${addresses[userAddress] ?? ""}`;
  // });


})();

getCards();

shippingAddress.addEventListener("click", () => {
  page.go("address");
});

paymentBtn.addEventListener("click", () => {
  storage.set("shipping", "");
  storage.set("address", "");
  console.log(cards);

  updateCart(cards);
  window.location=`http://127.0.0.1:5500/Landing/payment.html`
});

modalBg.addEventListener("click", () => {
  addPromoModal.classList.add("hidden");
});
cancelBtn.addEventListener("click", () => {
  addPromoModal.classList.add("hidden");
});

window.chooseshippingMethod = () => {
  page.go("chooseShipping");
};



window.handelShippingMethodEdit = (e) => {
  console.log(e);
  page.go("chooseShipping");
};

window.removePromoBtn = (e) => {
  const elm = e.closest(".promo-card");
  const code = elm.dataset?.promo;
  promo -= code;
  if (promo == 0) {
    promoOffPrice.textContent = ``;
    promoInput.classList.remove("hidden");
  } else {
    promoOffPrice.textContent = calcPromoPrice(promo);
  }
  totalPriceHandell();
  elm.remove();
};

addPromoModalBtn.addEventListener("click", () => {
  if (modalpromoInput.value != "") {
    promoCardsWrapper.innerHTML += createPromoCard(modalpromoInput.value);
    promo += parseInt(modalpromoInput.value);
    promoOffPrice.textContent = calcPromoPrice(promo);
    console.log(promo);
    addPromoModal.classList.add("hidden");
    promoInput.value = "";
    totalPriceHandell();
  }
});

addPromoBtn.addEventListener("click", () => {
  if (!promoInput.classList.contains("hidden")) {
    if (promoInput.value != "") {
      promoCardsWrapper.innerHTML = createPromoCard(promoInput.value);
      promoInput.classList.add("hidden");
      promo += parseInt(promoInput.value);
      promoOffPrice.textContent = calcPromoPrice(promo);
      promoInput.value = "";
      totalPriceHandell();
    }
  } else {
    addPromoModal.classList.remove("hidden");
  }
});

function totalPriceHandell() {
  let amount = amountPrice.textContent.split("$")[1];
  amount = parseFloat(amount) ?? 0;
  let offPrice =
    promoOffPrice.textContent == "" ? 0 : parseFloat(promoOffPrice.textContent);
  let shippingPrice =
    shippingPriceElm.textContent == "-"
      ? 0
      : shippingPriceElm.textContent.split("$")[1];
  shippingPrice = parseFloat(shippingPrice);

  shippingTotalPrice.textContent = `$${(
    amount +
    shippingPrice -
    offPrice
  ).toFixed(2)}`;
}

function calcPromoPrice(promo) {
  let price = amountPrice.textContent.split("$")[1];
  price = (price * (promo / 100)).toFixed(2);

  return price;
}

function getCards() {
  orderListwrapper.innerHTML = "";
  request.get("orders").then((data) => {
    data.forEach((item) => {
      if (item.status == "non-active") {
        sumPrice += parseFloat(item.totalPrice);
        
        let newOrder = new Order(item);
        console.log(newOrder);
        cards.push(newOrder);
        orderListwrapper.innerHTML += generateCard(new Order(item));
      }
    });
    if (sumPrice == 0) {
      amountPrice.textContent = `-`;
    } else {
      amountPrice.textContent = `$${sumPrice.toFixed(2)}`;
    }
    totalPriceHandell();
  });
}

function generateCard(card) {
  return ` <div data-id="${card.id}" class="card h-[130px] md:h-fit p-2 md:p-4">
  <div class="bg-gray-100 rounded-2xl p-2 ">
    <img class="w-full h-full object-contain" src="${card.image}">
  </div>
  <div class="flex-1 flex flex-col gap-1 justify-between">
    <div class="flex justify-between items-center text-lg">
      <p class="text-dark-txtfont-semibold text-ellipsis line-clamp-1 ">${card.title}</p>
     
    </div>
    <div class="flex gap-2 text-sm text-gray-500 items-center">
      <span class="bg-${card.color}-300 w-4 h-4 md:w-6 md:h-6 rounded-full"></span>
      <p>${card.color}</p>
      <span class="h-5 w-[1px] bg-gray-500"></span>
      <p>Size = <span>${card.size}</span></p>
    
    </div>

    
    <div class="flex items-center justify-between text-dark-txt">
      <p class="text-lg md:text-xl font-semibold">$${card.totalPrice}</span></p>
      <div class="bg-gray-100  text-slate-700 flex items-center rounded-full font-semibold px-3 py-1">
        
        <p>${card.count}</p>
        
      </div>
    </div>
  </div>
</div>`;
}

// async function getUserAddress() {
//   let addresses = {};
//   const userId = storage.getUser().id;
//   const user = await request.getById("users", userId);
//   addresses = user[0].addresses;

//   return addresses;
// }
async function updateCart(list) {

  for (const order of list) {
    let orderObj = { ...order };
    console.log(orderObj);
    await request.update("orders", orderObj);
  }
  
  page.go('payment');
  
}

function uppercaseFirstChr(str) {
  let list = [...str];
  const upper = str.charAt(0).toUpperCase();
  list.splice(0, 1);
  list.unshift(upper);
  return list.join("");
}

function createShippingMethodCard(shipping) {
  return ` <div class="bg-white rounded-2xl py-3 px-5 flex gap-3 items-center">
  <div class="p-2 bg-gray-300 w-fit rounded-full">
    <span
      class="bg-black text-lg text-white rounded-full w-9 h-9 flex items-center justify-center"
    >
    ${shipping.icon}
    </span>
  </div>
  <div class="flex-1 flex flex-col gap-1">
    <p class="font-bold text-dark-txt text-lg">${shipping.name}</p>
    <p class="text-sm text-gray-500 line-clamp-1 text-ellipsis">
      ${shipping.msg}
    </p>
  </div>
  <p class="text-dark-txt font-semibold">$${shipping.price}</p>

  <span onclick="handelShippingMethodEdit(this)" class="text-slate-900 text-xl">
    <i class="bi bi-pen-fill"></i>
  </span>
</div>`;
}

function createEmptyShipping() {
  return `<div  onclick="chooseshippingMethod(this)" class="flex gap-3 items-center bg-white rounded-xl py-6 px-4">
  <span class="text-xl text-slate-900"><i class="bi bi-truck-front-fill"></i></span>
  <p class="flex-1  text-slate-800 font-semibold">Choose Shipping Type</p>
  <span class="text-2xl text-slate-900" ><i class="bi bi-chevron-compact-right"></i></span>
</div>`;
}

function getShippingMethod() {
  const shipping = storage.get("shipping");
  shippingMethodWrapper.innerHTML = "";
  console.log(shipping);
  if (shipping == undefined || shipping.length ==0) {
    shippingMethodWrapper.innerHTML = createEmptyShipping();
    shippingPriceElm.textContent = `-`;
  } else {
    shippingMethodWrapper.innerHTML = createShippingMethodCard(shipping);
    shippingPriceElm.textContent = `$${shipping.price}`;
  }
  totalPriceHandell();
}

function createPromoCard(offValue) {
  return `<div data-promo="${offValue}" class="promo-card flex max-w-fit gap-3  px-4 py-2 rounded-full items-center bg-black text-white">
  <p class="text-sm">Discount ${offValue}% off</p>
  <span onclick="removePromoBtn(this)" class="text-lg mt-1 cursor-pointer"><i class="bi bi-x"></i></span>
  </div>`;
}

// promoOffPrice.textContent =`-`
