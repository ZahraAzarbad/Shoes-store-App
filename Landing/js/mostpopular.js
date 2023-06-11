import {Product} from "./product.js";

const cardContainer= document.getElementById("card-container");
const backBtn= document.getElementById("back-arrow");

function generateCard(product){
    return ` <div
    data-id=${product.id}
    id="main-card"
    class="w-40 flex flex-col justify-center items-center"
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

backBtn.addEventListener('click',()=>{
    window.location = `http://127.0.0.1:5500/Landing/index.html`
})
