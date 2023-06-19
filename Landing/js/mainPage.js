import {Product} from "./product.js";



const nikeLogo= document.getElementById("nike-logo");
const adidasLogo= document.getElementById("adidas-logo");
const pumaLogo= document.getElementById("puma-logo");
const asicsLogo= document.getElementById("asics-logo");
const reebokLogo= document.getElementById("reebok-logo");
const newBalanceLogo= document.getElementById("newbalance-logo");
const converseLogo= document.getElementById("converse-logo");
const cardContainer= document.getElementById("card-container");
const seeAllBtn= document.getElementById("see-all-btn");
const brandsList= document.getElementById("list");
const cardBtn= document.getElementById("card-btn");
const card= document.getElementById("card");
const wishlist= document.getElementById("wishlist");
const search= document.getElementById("search");
const ordersBtn= document.getElementById("orders-btn");



///////////////////////////////////////////
const allBtn= document.getElementById("all-btn");
const nikeBtn= document.getElementById("nike-btn");
const adidasBtn= document.getElementById("adidas-btn");
const pumaBtn= document.getElementById("puma-btn");
const asicsBtn= document.getElementById("asics-btn");
const reebokBtn= document.getElementById("reebok-btn");
const newbalanceBtn= document.getElementById("newbalance-btn");
const converseBtn= document.getElementById("converse-btn");

//////////////////////////////////////////////////////////

function generateCard(product){
    return ` <div
    data-id=${product.id}
    onclick="productPage(this)"
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









seeAllBtn.addEventListener('click',()=>{
    window.location =`http://127.0.0.1:5500/Landing/mostpopular.html`
   
})
// getProductByFilter();

nikeLogo.addEventListener('click',()=>{
    window.location =`http://127.0.0.1:5500/Landing/brandpage.html?brand=Nike`
   
})

adidasLogo.addEventListener('click',()=>{
    window.location =`http://127.0.0.1:5500/Landing/brandpage.html?brand=Adidas`
   
})
pumaLogo.addEventListener('click',()=>{
    window.location =`http://127.0.0.1:5500/Landing/brandpage.html?brand=Puma`
   
})
asicsLogo.addEventListener('click',()=>{
    window.location =`http://127.0.0.1:5500/Landing/brandpage.html?brand=Asics`
   
})
reebokLogo.addEventListener('click',()=>{
    window.location =`http://127.0.0.1:5500/Landing/brandpage.html?brand=Reebok`
   
})
newBalanceLogo.addEventListener('click',()=>{
    window.location =`http://127.0.0.1:5500/Landing/brandpage.html?brand=NewBalance`
   
})
converseLogo.addEventListener('click',()=>{
    window.location =`http://127.0.0.1:5500/Landing/brandpage.html?brand=Converse`
   
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

window.productPage = (e)=>{
const id = e.dataset.id
window.location = `http://127.0.0.1:5500/Landing/shoesownpage.html?id=${id}`
}

cardBtn.addEventListener('click',()=>{
    window.location=`http://127.0.0.1:5500/Landing/card.html`
})

card.addEventListener('click',()=>{
    window.location=`http://127.0.0.1:5500/Landing/card.html`
})

wishlist.addEventListener('click',()=>{
    window.location=`http://127.0.0.1:5500/Landing/wishlist.html`
})
search.addEventListener('click',()=>{
    window.location=`http://127.0.0.1:5500/Landing/search.html`
})
ordersBtn.addEventListener('click',()=>{
    window.location=`http://127.0.0.1:5500/Landing/orders.html`
})


