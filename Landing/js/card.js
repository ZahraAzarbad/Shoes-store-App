import { Request } from "./request.js";
import { Page } from "./page.js";
import { Order } from "./order.js";

const page = new Page()
const request = new Request('http://localhost:3000/');
let sumPrice = 0;
let removedCardId = 0;
const navigation = document.querySelectorAll('.navigation span');
const cardsContainer = document.getElementById('cards-container');
const totalprice = document.getElementById('totalprice');
const removeModal = document.getElementById('remove-modal');
const modalBg = document.getElementById('modal-bg');
const cancelBtn = document.getElementById('cancel-btn');
const checkoutBtn = document.getElementById('checkoutBtn');
const removeCardBtn = document.getElementById('remove-card-btn');
const removeCardContainer = document.getElementById('remove-card-container');
const searchbtn = document.getElementById('searchbtn');

searchbtn.addEventListener("click", () => {
  page.go('search',{key:'page',value:'cart'})
})

const cards = [];
handelNavigationEvents()
getCards()

function getCards() {
  cardsContainer.innerHTML = '';
  request.get('orders').then(data => {
    data.forEach(item => {
      
      if (item.status == 'non-active') {
        sumPrice += parseFloat(item.totalPrice);
        cards.push(new Order(item))
        cardsContainer.innerHTML += generateCard(new Order(item));
      }
    })
    totalprice.textContent = sumPrice.toFixed(2);
  })
}


function generateCard(card) {
  
  return `<div data-id="${card.id}" class="card flex gap-2">
  <div class="bg-gray-100 rounded-2xl p-3 ">
    <img class="w-full h-full object-contain" src="${card.image}">
  </div>
  <div class="flex-1 flex flex-col gap-1 justify-between pb-3">
    <div class="flex justify-between items-center text-lg">
      <p class="text-dark-txtfont-semibold text-ellipsis line-clamp-1 ">${card.title}</p>
      <span onclick="handelRemoveCard(this)" class="cursor-pointer"><i class="bi bi-trash3"></i></span>
    </div>
    <div class="flex gap-2 text-sm text-gray-500 items-center">
      <span class="bg-${card.color}-300 w-4 h-4 md:w-6 md:h-6 rounded-full"></span>
      <p>${card.color}</p>
      <span class="h-5 w-[1px] bg-gray-300"></span>
      <p>Size = <span>${card.size}</span></p>
    </div>
    <div class="flex"></div>
    <div class="flex items-center justify-between text-dark-txt">
      <p class="text-lg md:text-xl font-semibold">$<span id="product-order-price">${card.totalPrice}</span></p>
      <div class="bg-gray-200 flex items-center gap-3 rounded-full px-3 py-1 text-sm md:text-base product-count-wrapper">
        <span onclick="handelDec(this)" class="text-slate-900"><i class="bi bi-dash"></i></span>
        <span id="countTxt" >${card.count}</span>
        <span onclick="handelInc(this)" class="text-slate-800"><i class="bi bi-plus"></i></span>
      </div>
    </div>
  </div>
</div>`
}

function generateRemoveCard(card) {
  return `<div data-id="${card.id}" class="card h-[150px]">
  <div class="bg-gray-100 rounded-2xl p-3 ">
    <img class="w-full h-full object-contain" src="${card.image}">
  </div>
  <div class="flex-1 flex flex-col gap-1 justify-between pb-3">
    <div class="flex justify-between items-center text-lg">
      <p class="text-dark-txtfont-semibold text-ellipsis line-clamp-1 ">${card.title}</p>  
    </div>
    <div class="flex gap-2 text-sm text-gray-500 items-center">
      <span class="bg-${card.color}-300 w-4 h-4 md:w-6 md:h-6 rounded-full"></span>
      <p>${card.color}</p>
      <span class="h-5 w-[1px] bg-gray-300"></span>
      <p>Size = <span>${card.size}</span></p>
    </div>
    <div class="flex"></div>
    <div class="flex items-center justify-between text-dark-txt">
      <p class="text-lg md:text-xl font-semibold">$<span>${card.totalPrice}</span></p>
      <div class="bg-gray-200 flex items-center gap-3 rounded-full px-3 py-1 text-sm md:text-base">
        <span  class="text-slate-900"><i class="bi bi-dash"></i></span>
        <span id="countTxt" >${card.count}</span>
        <span  class="text-slate-800"><i class="bi bi-plus"></i></span>
      </div>
    </div>
  </div>
</div>`
}

removeCardBtn.addEventListener("click" ,()=> {
  console.log(removedCardId);
  request.delete('orders', removedCardId).then(result => {
    console.log(result);
    getCards();
    removeModal.classList.add('hidden');
  })
})


modalBg.addEventListener("click", () => {
  removeModal.classList.add('hidden');
})
cancelBtn.addEventListener("click", () => {
  removeModal.classList.add('hidden');
});
checkoutBtn.addEventListener('click', () => {
  page.go('checkout')
})

window.handelRemoveCard = (e) => {

  removeModal.classList.remove('hidden');
  let card = e.closest(".card");
  let id = card.dataset?.id;
  removedCardId = id;
  removeCardContainer.innerHTML = generateRemoveCard(findCard(id))
}

// window.handelCardClick = (e) => {
//   let card = e.closest(".card");
//   let id =findProductId(card.dataset?.id);
//   page.go("product", { key: "id", value: id });

// }


window.handelDec = (e) => {
  let cardItem = e.closest('.card');
  let cardId = cardItem.dataset?.id;
  let price = cardItem.querySelector("#product-order-price")
  let txtElm = e.closest('.product-count-wrapper').children[1];
  let card = findCard(cardId);
  
  card.count--;
  if (card.count >= 1) {
    card.totalPrice = (card.count * card.price).toFixed(2);
    price.textContent = (card.totalPrice);
    txtElm.textContent = card.count;
    handelSumPrices();
  } else {
    card.count = 1;
  }

  
}
window.handelInc = (e) => {
  let cardItem = e.closest('.card');
  let cardId = cardItem.dataset?.id;
  let price = cardItem.querySelector("#product-order-price")
  let txtElm = e.closest('.product-count-wrapper').children[1];
  let card = findCard(cardId);
  
  card.count++;
  card.totalPrice = (card.count * card.price).toFixed(2)
  price.textContent = (card.totalPrice);
  txtElm.textContent = card.count;
  handelSumPrices();
}

function handelSumPrices() {
  sumPrice = 0;
  cards.forEach(card => {
    sumPrice += parseFloat(card.totalPrice)
  });
  totalprice.textContent = sumPrice.toFixed(2);
}

function findCard(orderId) {
  let card =0
  cards.forEach(order => {
    if (order.id == orderId) {
      card = order;
      return;
    }
  })

  return card;
}

function resetNav() {

  navigation.forEach(item => {

    const icons = item.querySelectorAll('i');
    icons.forEach(icon => {
      if (icon.classList.contains('active-mode')) {
        icon.classList.remove('hidden');
      } else {
        icon.classList.add('hidden');
      }
 
    })

  });
}

function handelNavigationEvents() {
  navigation.forEach(item => {
    item.addEventListener('click', () => {
      resetNav()
      const icons = item.querySelectorAll('i');
      const txt = item.querySelector('p').textContent.toLowerCase()
      changePageWithNavigation(txt)
      icons.forEach(icon => {
        icon.classList.toggle('hidden');
      })

    })
  });
}

function changePageWithNavigation(txt) {
  switch (txt) {
    case 'home':
      page.go('index');
      break;
      case 'card':
        page.go('cart');
      break;
      case 'orders':
        page.go('orders');
        break;
  }
}