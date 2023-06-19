// import {Product} from "./product.js";
// import { Request } from "./request.js";
// import { Order } from "./order.js";
// import { Catch } from "./catch.js";

// const storage = new Catch();
// const userId = storage.getUser().id;



// const request = new Request('http://localhost:3000/');
// request.get("orders").then((results)=>{
// // console.log(results);
// results.forEach((item) => {
//     if(item.status==="active"&& item.userId===userId){
// console.log(item);
//     }
    
// });
// })




import { Request } from "./request.js";
import { Page } from "./page.js";
import { Product } from "./product.js";
import { Order } from "./order.js";

const page = new Page();
const request = new Request('http://localhost:3000/');
const ordersCard = [];
const navigation = document.querySelectorAll('.navigation span');
const line = document.getElementById('line');
const activeState = document.getElementById('active-state');
const compliteState = document.getElementById('complite-state');
const cardsWapper = document.getElementById('orders-cards-wrapper');
const emptyStatePart = document.getElementById('empty-state-part');
const searchbtn = document.getElementById('searchbtn');
const homeBtn = document.getElementById('home-btn');
const cardBtn = document.getElementById('card-btn');


homeBtn.addEventListener("click",()=>{
  window.location=`http://127.0.0.1:5500/Landing/index.html`
})
cardBtn.addEventListener("click",()=>{
  window.location=`http://127.0.0.1:5500/Landing/card.html`
})
searchbtn.addEventListener("click", () => {
  page.go('search',{key:'page',value:'order'})
})


handelNavigationEvents()
initOrderState()
getOrders("active")






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

// function changePageWithNavigation(txt) {
//   switch (txt) {
//     case 'home':
//       page.go('index');
//       break;
//       case 'card':
//         page.go('card');
//       break;
//       case 'orders':
//         page.go('orders');
//         break;
//   }
// }

function initOrderState() {
  
  activeState.addEventListener("click", () => {

    activeState.classList.add('active-order-state')
    compliteState.classList.remove('active-order-state')
    line.style.transform = `translateX(0)`;
    getOrders("active")

  })

  compliteState.addEventListener("click", () => {

    activeState.classList.remove('active-order-state')
    compliteState.classList.add('active-order-state')
    line.style.transform = `translateX(100%)`;
    getOrders("complete")

  })
}

function insertTo(cards, state) {
  emptyStatePart.classList.add('hidden')
  cardsWapper.classList.remove('hidden')
  cardsWapper.innerHTML = '';
  let isEmpty = true;
  cards.forEach(card => {
   
    if (card.status == state) {
      isEmpty = false;
      cardsWapper.innerHTML += generateOrdersCard(new Order(card))
    }
  });

  if (isEmpty) {
    emptyStatePart.classList.remove('hidden')
    cardsWapper.classList.add('hidden')
  }
}


function generateOrdersCard(card) {
  return `<div data-id="${card.id}" class="card h-[130px] md:h-fit flex gap-2 p-2 md:p-4">
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
      <span class="h-5 w-[1px] bg-gray-500"></span>
      <p>Qty = <span>${card.count}</span></p>
    </div>

    <div class="bg-gray-100 w-fit px-3 py-1 text-sm text-slate-600 rounded-lg">${card.statusTxt()}</div>
    <div class="flex items-center justify-between text-dark-txt">
      <p class="text-lg md:text-xl font-semibold">$<span>${card.totalPrice}</span></p>
      <div class="bg-black text-white flex items-center rounded-full px-3 py-1">
        
        <p class="text-sm">${card.cardBtnTxt()}</p>
        
      </div>
    </div>
  </div>
</div>`
}


function getOrders(state) {
  request.get('orders').then(result => {
    
    insertTo(result,state)
    
  }).catch(error => {
    emptyStatePart.classList.remove('hidden')
    cardsWapper.classList.add('hidden')
  })
}