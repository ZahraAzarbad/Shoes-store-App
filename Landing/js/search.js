import { Url } from "./url.js";
import { Request } from "./request.js";
import { Page } from "./page.js";
import { Product } from "./product.js";
import { Order } from "./order.js";
import { Catch } from "./catch.js";

const url = new Url();
const page = new Page();
const request = new Request('http://localhost:3000/');
const storage = new Catch();

const searchInput = document.getElementById('searchInput');
const searchWrapper = document.getElementById('searchWrapper');
const resultWrapper = document.getElementById('resultWrapper');
const searchResultTitle = document.getElementById('searchResultTitle');
const searchdetail = document.getElementById('searchdetail');

let pageFrom = '';
let currentUserId = 0;
(() => {
  pageFrom = url.params('page');
  currentUserId = storage.getUser().id;
  console.log(currentUserId);
  console.log(pageFrom);
  getHistoryResults()

})();

searchdetail.addEventListener("click", () => {
  if (searchdetail.textContent == "clear all") {
   
    removeAllHistory()
    getHistoryResults()
  }
})


searchInput.addEventListener('focusin', () => {
  searchWrapper.classList.add('border')
});
searchInput.addEventListener('focusout', () => {
  searchWrapper.classList.remove('border')
});

let timeoutId=0
searchInput.addEventListener("keydown", () => {
  

   clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      sendRequest()
    }, 1000);

});


function sendRequest() {
  if (searchInput.value == '') {
    getHistoryResults();
  } else if (pageFrom == "order" || pageFrom =="cart") {
    getOrders(searchInput.value);
  } else {
    getProducts(searchInput.value);
  }
}


window.handelRemoveHistoryItem = (e) => {
  const itemIndex = e.closest('.item-wrapper').dataset.index;
  removeSpecialHistory(itemIndex);
  getHistoryResults()
}
window.historytitleclicked = (e) => {
  searchInput.value = e.textContent;
  sendRequest()
}
window.handelProductClick = (e) => {
  page.go('shoesownpage',{key:'id',value:e.dataset.id})
}


function generateHistoryCard(index,title) {
  return `<div data-index="${index}" class="flex justify-between items-center hover:bg-gray-100 py-3 px-2 item-wrapper">
    <p onclick="historytitleclicked(this)" class="line-clamp-1 text-ellipsis text-gray-500">${title}</p>
    <span class="text-gray-500 text-xl cursor-pointer border border-gray-700 rounded-xl px-1" onclick="handelRemoveHistoryItem(this)" ><i class="bi bi-x"></i></span>
  </div>`
}

function generateEmptystateCard() {
  return ` <section id="empty-state-part" class=" flex flex-1 flex-col items-center justify-center gap-2 mt-20">
  <div class="w-[200px] h-[200px]  overflow-hidden -translate-y-10 ">
    <img class="w-full h-full object-cover" src="../../src/img/empty.png" >
  </div>

  <p class="text-dark-txt text-xl font-bold -mt-10">Not Found</p>
  <p class="text-gray-500 text-center">Sorry the keyword you entered cannot be found, plaese check again or search with another keyword.</p>
</section>`
}


function generateWishlistCard(product) {
  return `<div data-id="${product.id}" onclick="handelProductClick(this)" class="product h-fit w-full">
  <div class="bg-gray-100 rounded-md flex items-center justify-center">
    <div class="w-[120px] h-[120px] md:w-[170px] md:h-[170px]  overflow-hidden">
      <img class="w-full h-full object-cover" src="${product.images[0]}">
    </div>
  </div>
  <p class="text-ellipsis font-semibold line-clamp-1 text-dark-txt">${product.title}</p>
  <div class="flex gap-2 items-center">

    <i class="bi bi-star-half"></i>
    <p id="product-rate">${product.rate}</p>
    <span class="text-sm bg-gray-100 flex items-center gap-2 py-1 rounded-sm px-2 text-slate-700"><p id="product-sold">${product.soldNumbers}</p> sold</span>
    
  </div>
  <p class="text-sm text-dark-txt md:text-base">$${product.price}</p>

  <span onclick="window.event.cancelBubble = true,handelWishlistLikeBtn(this)" class="absolute top-2 pt-1 cursor-pointer right-2 w-8 h-8 rounded-full bg-slate-900 text-white text-lg flex items-center justify-center"><i class="bi bi-heart-fill"></i></span>
</div>`
}

function generateOrdersCard(card) {
  return `<div data-id="${card.id}" class="flex gap-2 card h-[130px] md:h-fit p-2 md:p-4">
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
    </div>
  </div>
</div>`
}

function generateNonActiveCard(card) {
  return `<div data-id="${card.id}" class="card" onclick="handelClickNonActiveCard(this)">
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

function generateHomeProduct(product) {

  return `<div data-id="${product.id}" onclick="handelProductClick(this)"     class="product">
      <div class="bg-gray-100 rounded-md flex items-center justify-center">
        <div class="w-[120px] h-[120px] md:w-[170px] md:h-[170px]  overflow-hidden">
          <img class="w-full h-full object-cover" src="${product.images[0]}">
        </div>
      </div>
      <p class="text-ellipsis font-semibold line-clamp-1 text-dark-txt">
      ${product.title}</p>

      <p class="text-sm text-dark-txt md:text-base">$ ${product.price}</p>

    </div>`
}



function getProducts(filter) {
  request.getByFilter("products", filter).then(result => {
    console.log(result);
    if (result.length > 0) {
      insertData(result)
      setHistoryRecent(filter);
       
    } else {
      resultWrapper.innerHTML = generateEmptystateCard()
      
    }
    searchResultTitle.textContent = `Result for "${filter}"`;
    searchdetail.textContent =`${result.length} found`
  })
}
function getOrders(filter) {
  request.getByFilter("orders", filter).then(result => {
    
    if (result.length > 0) {
      console.log(result);
      insertData(result);
      setHistoryRecent(filter)
    } else {
      resultWrapper.innerHTML = generateEmptystateCard()
    }
    searchResultTitle.textContent = `Result for "${filter}"`;
    searchdetail.textContent =`${result.length} found`
  })
}

function insertData(list) {
  resultWrapper.innerHTML = '';
  if (pageFrom == "order" || pageFrom == "cart") {
    resultWrapper.classList.remove("grid-cols-main-mobile-responsive")
    resultWrapper.classList.remove("sm:grid-cols-responsive");
    // resultWrapper.classList.add("grid-cols-responsive");
  } else {
    resultWrapper.classList.add("grid-cols-main-mobile-responsive")
    resultWrapper.classList.add("sm:grid-cols-responsive");
    resultWrapper.classList.remove("grid-cols-responsive");
  }

  if (pageFrom == "wishlist") {
    list.forEach(item => {
      resultWrapper.innerHTML += generateWishlistCard(new Product(item))
    });
  }else if (pageFrom == "home") {
    list.forEach(item => {
      resultWrapper.innerHTML += generateHomeProduct(new Product(item))
    });
  } else {
    list.forEach(item => {
     
      if (item.userId == currentUserId) {
        if (pageFrom == "order" && item.status !="non-active") {
          console.log(item);
          resultWrapper.innerHTML += generateOrdersCard(new Order(item))
        } else if(pageFrom == "cart" && item.status =="none-active"){
          console.log(item);
          resultWrapper.innerHTML += generateOrdersCard(new Order(item))
        }
      }
      
      
    });
  
  }





}



function getHistoryResults() {
  resultWrapper.classList.remove("grid-cols-main-mobile-responsive")
  resultWrapper.classList.remove("sm:grid-cols-responsive");
  resultWrapper.innerHTML = '';
  searchResultTitle.textContent = `Recent`;
  searchdetail.textContent =`clear all`
  let history = storage.geHistory();
  console.log(history);
  if (history.length > 0) {
    history.forEach((txt, index) => {
      resultWrapper.innerHTML += generateHistoryCard(index,txt)
    })
  }
}

function setHistoryRecent(txt) {
  let history = storage.geHistory();
  history.push(txt);
  let filterHistory = new Set(history);
  storage.setHistory([...filterHistory]);
}

function removeAllHistory() {
  storage.setHistory([]);
}

function removeSpecialHistory(index) {
  let history = storage.geHistory();
  if (history.length > 0) {
    history.forEach((txt, idx) => {
      if (index == idx) {
        history.splice(idx, 1);
        let filterHistory = new Set(history);
        storage.setHistory([...filterHistory]);
      }
    });

  }
}