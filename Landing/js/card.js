// import {Product} from "./product.js";
import { Request } from "./request.js";
import { Page } from "./page.js";
import {Order} from "./order.js";

const cardContainer= document.getElementById("card-container");
const home= document.getElementById("home");
const totalprice = document.getElementById('totalprice');
const removeModal = document.getElementById('remove-modal');
const modalBg = document.getElementById('modal-bg');
const removeCardContainer = document.getElementById('remove-card-container');
const removeCardBtn = document.getElementById('remove-card-btn');
const cancelBtn = document.getElementById('cancel-btn');
const footer = document.getElementById('footer');

const request = new Request('http://localhost:3000/');

home.addEventListener('click',()=>{
  window.location=`http://127.0.0.1:5500/Landing/index.html`
})
let sumPrice = 0;
let removedCardId = 0;
const cards = [];

// function generateCard(card){
//     return `<div
//     data.id=${card.id}
//     id="main-card"
//     class="card w-full flex justify-between items-center"
//   >
//     <div class="bg-slate-100 w-2/5 h-36 rounded-2xl">
//       <img class="p-3" src="${card.image}" />
//     </div>

//     <div class="w-3/5 pl-3 flex flex-col justify-center items-center gap-3">
//         <div class="w-full flex justify-between items-center text-xl font-semibold">
            
//                 <h2>${card.title}</h2>
//                 <i class="bi bi-trash"></i>


//         </div>
//         <div class="w-full flex justify-start items-center gap-2">
//             <div class="w-5 h-5 rounded-full bg-${card.color}-300"></div>
//             <p>${card.color}</p>
//             <p>|</p>
//             <p>size =</p>
//             <p>${card.size}</p>
//         </div>
//         <div class="w-full flex justify-between items-center">
//               <p class="felex justify-center items-center text-xl font-bold">$ <span id="product-order-price">${card.totalPrice}</span></p>
//             <div class="product-count-wrapper flex justify-center items-center bg-gray-200 rounded-full mb-3">
//                 <button onclick="minus(this)" class="py-1 px-3 text-xl cursor-pointer"><i class="bi bi-dash"></i></button> 
//                 <span>${card.count}</span>
                
//                 <button onclick="plusBtn(this)" class="py-1 px-3 text-xl cursor-pointer"><i class="bi bi-plus"></i></button>
//               </div>
//           </div>
      
//     </div>
    
//   </div>`
// }
getCards()

function getCards() {
  cardContainer.innerHTML = '';
  const getPro = fetch(`http://localhost:3000/orders`).then((response)=>{
          return response.json()
      }).then(data => {
    data.forEach(item => {
      if (item.status == 'non-active') {
        sumPrice += parseFloat(item.totalprice);
        cards.push(new Order(item))
        cardContainer.innerHTML += generateCard(new Order(item));
      }
    })
    totalprice.textContent = sumPrice.toFixed(2);
  })
}

function generateCard(card) {
  
  return `<div data-id="${card.id}" class="card w-full flex justify-between items-center gap-2">
  <div class="bg-gray-100 w-2/5 h-36 rounded-2xl p-3 ">
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
        <span onclick="minus(this)" class="text-slate-900"><i class="bi bi-dash"></i></span>
        <span id="countTxt" >${card.count}</span>
        <span onclick="plusBtn(this)" class="text-slate-800"><i class="bi bi-plus"></i></span>
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

// insertData()

// function insertData(){
//   cardContainer.innerHTML='';
//   request.get('orders').then(list=>{

//     list.forEach((item)=>{

//       if(item.status=='non-active'){
//         sumPrice += parseFloat(item.price);
//         cards.push(new Order(item))
//         cardContainer.innerHTML += generateCard(new Order(item))
//       }
//           })
           
//   })

// }

// function getProducts(){
    
//   const getPro = fetch(`http://localhost:3000/orders`).then((response)=>{
//       return response.json()

//   }).then((data)=>{
// insertData(data)
//   })
   
// }
// getProducts()

// let count = order.count

// window.minus=()=>{
// if(count>0){
//   count--
// }
// }





window.minus = (e) => {
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
window.plusBtn = (e) => {
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



removeCardBtn.addEventListener("click" ,()=> {
  console.log(removedCardId);
  request.delete('orders', removedCardId).then(result => {
    console.log(result);
    getCards();
    removeModal.classList.add('hidden');
    footer.classList.remove('hidden');
  })
})


modalBg.addEventListener("click", () => {
  removeModal.classList.add('hidden');
  footer.classList.remove('hidden');

})

cancelBtn.addEventListener("click", () => {
  removeModal.classList.add('hidden');
  footer.classList.remove('hidden');

});

window.handelRemoveCard = (e) => {
  
  footer.classList.add('hidden');

  removeModal.classList.remove('hidden');
  let card = e.closest(".card");
  let id = card.dataset?.id;
  removedCardId = id;

  removeCardContainer.innerHTML = generateRemoveCard(findCard(id))
}


function handelSumPrices() {
  sumPrice = 0;
  cards.forEach(card => {
    sumPrice += parseFloat(card.totalPrice)
  });
  totalprice.textContent = sumPrice.toFixed(2);
}

function findCard(orderId) {
  let card = 0;
  cards.forEach(order => {
    if (order.id == orderId) {
      card = order;
      return;
    }
  })

  return card;
}



