// import {Product} from "./product.js";
import {Order} from "./order.js";

const cardContainer= document.getElementById("card-container");
const home= document.getElementById("home");


home.addEventListener('click',()=>{
  window.location=`http://127.0.0.1:5500/Landing/index.html`
})


function generateCard(order){
    return `<div
    data.id=${order.id}
    id="main-card"
    class="w-full flex justify-between items-center"
  >
    <div class="bg-slate-100 w-2/5 h-36 rounded-2xl">
      <img class="p-3" src="${order.image}" />
    </div>

    <div class="w-3/5 pl-3 flex flex-col justify-center items-center gap-3">
        <div class="w-full flex justify-between items-center text-xl font-semibold">
            
                <h2>${order.title}</h2>
                <i class="bi bi-trash"></i>


        </div>
        <div class="w-full flex justify-start items-center gap-2">
            <div class="w-5 h-5 rounded-full bg-${order.color}-300"></div>
            <p>${order.color}</p>
            <p>|</p>
            <p>size =</p>
            <p>${order.size}</p>
        </div>
        <div class="w-full flex justify-between items-center">
              <p class="felex justify-center items-center text-xl font-bold">$ <span>${order.totalPrice}</span></p>
            <div class="flex justify-center items-center bg-gray-200 rounded-full mb-3">
                <button class="py-1 px-3 text-xl cursor-pointer"><i class="bi bi-dash"></i></button>
                <p>${order.count}</p>
                <button class="py-1 px-3 text-xl cursor-pointer"><i class="bi bi-plus"></i></button>
              </div>
          </div>
      
    </div>
    
  </div>`
}



function insertData(list){
  cardContainer.innerHTML='';
    list.forEach((item)=>{

if(item.status=='non-active'){
  cardContainer.innerHTML += generateCard(new Order(item))
}
    })
}

function getProducts(){
    
  const getPro = fetch(`http://localhost:3000/orders`).then((response)=>{
      return response.json()

  }).then((data)=>{
insertData(data)
  })
}
getProducts()

