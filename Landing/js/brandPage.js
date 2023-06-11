import {Product} from "./product.js";
const productPageCardContainer = document.getElementById('product-page-card-container')
const brandName = document.getElementById('brand-name')
const backBtn= document.getElementById("back-arrow");

const url = new URLSearchParams(window.location.search);
let entries = url.entries();
const query = Object.fromEntries(entries)['brand'];
console.log(query);
brandName.textContent=query
getProductByFilter(query);

function generateCard(product){
    return ` <div
    data-id=${product.id}
    id="main-card"
    class="w-40 flex flex-col justify-center items-center cursor-pointer"
  >
    <div class="bg-slate-100 w-36 h-36 rounded-2xl">
      <img class="p-3" src="${product.images[0]}" />
    </div>
    <div class="flex flex-col justify-center">
      <h4 class="font-bold">${product.title}</h4>
      <p class="font-semibold">${product.price}</p>
    </div>
  </div>`
}

function insertData(list){
    productPageCardContainer.innerHTML='';
    list.forEach((item)=>{
productPageCardContainer.innerHTML += generateCard(new Product(item))
    })
}

function getProducts(){
    const getPro = fetch(`http://localhost:3000/products`).then((response)=>{
        return response.json()

    }).then((data)=>{
insertData(data)
    })
}
// getProducts()


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




