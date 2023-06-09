import {Product} from "./product.js";
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
