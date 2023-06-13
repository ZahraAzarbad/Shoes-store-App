import { Request } from "./request.js";
import { Page } from "./page.js";
import { Catch } from "./catch.js";
import {Product} from "./product.js";
const page = new Page();
const storage = new Catch();
const request = new Request('http://localhost:3000/');

let userWishlist = [];
let productUser;
(() => {

  start()

})();

function start() {
    let userId = storage.getUser().id;
    console.log(userId);
    request.getById('users', userId).then(result => {
      productUser = result[0];
      getWishlists(productUser.wishlists)
    })
  }
const brandsList= document.getElementById("list");
const allBtn= document.getElementById("all-btn");
const nikeBtn= document.getElementById("nike-btn");
const adidasBtn= document.getElementById("adidas-btn");
const pumaBtn= document.getElementById("puma-btn");
const asicsBtn= document.getElementById("asics-btn");
const reebokBtn= document.getElementById("reebok-btn");
const newbalanceBtn= document.getElementById("newbalance-btn");
const converseBtn= document.getElementById("converse-btn");

const cardContainer= document.getElementById("card-container");
const backBtn= document.getElementById("back-arrow");

function generateCard(product){
    return `       <div
    data-id=${product.id}
    id="main-card" onclick="productClick(this)"
    class="w-40 flex flex-col justify-center items-center"
  >
    <div class="bg-slate-100 w-36 h-36 rounded-2xl relative">
      <img class="p-3" src="${product.images[0]}" />
      <div onclick="handelWishlistLikeBtn(this)" class="absolute top-1 right-1 bg-slate-300 rounded-full px-2 py-1">
        <i id="deactive-like" class="bi bi-heart text-slate-900 text-lg hidden"></i>
        <i id="active-like" class="bi bi-heart-fill text-slate-900 text-lg"></i>
      </div>
      
    </div>
    <div class="flex flex-col justify-center">
      <h4 class="font-bold">${product.title}</h4>
      <div class=" w-full flex justify-between items-center gap-3 ">
        <div id="sold" class="h-5 w-20 flex gap-1 justify-center items-center bg-gray-300 rounded-md p-3 text-black">
    <p id="sold-num">${product.soldNumbers}</p>
    <span>|sold</span>
        </div>
        <div id="rate" class="flex justify-center items-center">
          <i class="bi bi-star-half text-xl"></i>
          <div class="flex gap-1">
            <p>${product.rate}</p>
          </div>
        </div>
      </div>
      <p class="font-semibold">${product.price}</p>
    </div>
  </div> `
}

function insertData(list){
  cardContainer.innerHTML='';
    list.forEach((item)=>{
cardContainer.innerHTML += generateCard(new Product(item))
    })
}

function getProducts(){
    const getPro = fetch(`http://localhost:3000/products`).then((response)=>{
        return response.json()

    }).then((data)=>{
insertData(data)
    })
}
getProducts()

function getProductByFilter(brand){
  const getPro = fetch(`http://localhost:3000/products?q=${brand}`).then((response)=>{
      return response.json()

  }).then((data)=>{
insertData(data)
  }) 
}

backBtn.addEventListener('click',()=>{
    window.location = `http://127.0.0.1:5500/Landing/index.html`
})

window.productClick = (e) => {
    // console.log(e);
    page.go('product',{key:'id',value:e.dataset?.id})
  }

changeBrandsColor()
function changeBrandsColor(){
const listOfBrand = brandsList.children
Array.from(listOfBrand).forEach((brand)=>{
console.log(brand);
brand.addEventListener('click',()=>{
    resetColorBrand()
    brand.classList.add('active-brand')
})
})
}

function resetColorBrand(){
    const listOfBrand = brandsList.children
    Array.from(listOfBrand).forEach((brand)=>{
        brand.classList.remove('active-brand')
        })  
}

allBtn.addEventListener('click',()=>{
    getProducts()
})

nikeBtn.addEventListener('click',()=>{
getProductByFilter('nike');
})
adidasBtn.addEventListener('click',()=>{
getProductByFilter('adidas');
})
pumaBtn.addEventListener('click',()=>{
getProductByFilter('puma');
})
asicsBtn.addEventListener('click',()=>{
getProductByFilter('asics');
})
reebokBtn.addEventListener('click',()=>{
getProductByFilter('reebok');
})
newbalanceBtn.addEventListener('click',()=>{
getProductByFilter('newbalance');
})
converseBtn.addEventListener('click',()=>{
getProductByFilter('converse');
})


function getWishlists(IDList) {
    request.getQueues("products", IDList).then(result => {
      // console.log(result);
      userWishlist = result;
      insertData(result);
    })
  }

  window.handelWishlistLikeBtn = (e) => {
    let cardId = e.closest('.product').dataset?.id;
    productUser.wishlists.forEach((id,index) => {
      if (cardId == id) {
        productUser.wishlists.splice(index, 1);
        updateUser();
      }
    })
  
  }

  function updateUser() {
    const user = { ...productUser };
    request.update('users',user).then(result => {
      insertData(productUser.wishlists)
    })
  }
  

//   function getProducts(){
//     const getPro = fetch(`http://localhost:3000/users?q=${wishlists}`).then((response)=>{
//         return response.json()

//     }).then((data)=>{
// insertData(data)
//     })
// }

// getProducts()


  // function getProductByFilter(wishlists){
  //   const getPro = fetch(`http://localhost:3000/users?q=${wishlists}`).then((response)=>{
  //       return response.json()
  
  //   }).then((data)=>{
  // insertData(data)
  //   }) 
  // }
