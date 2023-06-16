import {Product} from "./product.js";
import { Request } from "./request.js";
import { Order } from "./order.js";
import { Catch } from "./catch.js";
import { Page } from "./page.js";

// const url = new Url();
const page = new Page();
const request = new Request('http://localhost:3000/');
const storage = new Catch()



let productObj = [];







const url = new URLSearchParams(window.location.search);
let entries = url.entries();
const productId = Object.fromEntries(entries)['id'];


const slides= document.querySelectorAll(".slide");
const slidesWrapper =document.getElementById('slides-wrapper')
const slider = document.getElementById('product-slider');
const pagination = document.querySelector('.pagination');
// const nextBtn= document.querySelectorAll(".next-btn");
// const preBtn= document.getElementById("pre-btn");
const viewMore= document.getElementById("view-more");
const more= document.getElementById("more");
const less= document.getElementById("less");
const shoesName= document.getElementById("shoes-name");
const soldNum= document.getElementById("sold-num");
const review= document.getElementById("review");
const quantity= document.getElementById("quantity");
const size= document.getElementById("size");
const color= document.getElementById("color");
const addToCard= document.getElementById("add-to-card");
const backBtn= document.getElementById("back-btn");

// let slidePosition = 0;
let currentUser;
// let sliderWidth = slider.getClientRects()[0].width
// touchHandel()
// mouseHandel()


backBtn.addEventListener('click',()=>{
    window.location=`http://127.0.0.1:5500/Landing/index.html`
})


function insertproduct(product){
  shoesName.textContent=product.title;
  soldNum.textContent=product.soldNumbers;
  review.textContent=product.viewers;
  quantity.textContent=1;
  insertColor(product.colors);
  insertSize(product.sizes);
  // generateSliderImage(product.images);
}
///////////////////////////////////////////////////////


// function touchHandel() {
//   let xUp, xDown;
  
//   slider.addEventListener('touchstart', function (e) {

//     let touch = e?.touches[0] || e?.changedTouches[0];
//     xUp = touch.pageX;
    

//   });

//   slider.addEventListener('touchend', (e) => {

//     let touch = e?.touches[0] || e?.changedTouches[0];
//     xDown = touch.pageX;
   
//     let result = xDown - xUp;
    
    
//     if (result < sliderWidth / 2) {
//       slidePosition++;
//       slideImage()
//     } else {
//       slidePosition--;
//       slideImage()
//     }

//   });
// }

// function mouseHandel() {
//   let xUp, xDown;
//   slider.addEventListener('mousedown', function (e) {
//     xDown = e.offsetX;

//   });
//   slider.addEventListener('mouseup', (e) => {
//     xUp = e.offsetX;

//     let result = xDown - xUp;
//     console.log(result,sliderWidth);
    
//     if (result > sliderWidth/2) {
//       slidePosition++;
//       slideImage()
//     } else {
//       slidePosition--;
//       slideImage()
//     }

//   });
// }

// function slideImage() {
//   let slides=document.querySelectorAll('.product-slide')
//   if (slidePosition >= slides.length) {
//     slidePosition = slides.length - 1;
//     return
//   };
//   if (slidePosition <0) {
//     slidePosition = 0;
//     return
//   };
//   handelPagination(slidePosition);
//   slides.forEach((slide) => {
    
//     slide.style.transform = `translateX(-${(slidePosition) * 100}%) translateY(-50%)`;
//   });
// }

// function initPagiantion(count) {
//   for (let i = 0; i < count;i++) {
//    pagination.innerHTML +=`<span></span>`
//   }
// }

// function handelPagination(index) {
//   let spans = pagination.querySelectorAll('span');
//   spans.forEach(span => {
//     span.classList.remove('active-page');
//   })

//   spans.forEach((span,idx) => {
//     if (idx == index) {
//       span.classList.add('active-page');
//     }
//   })
// }

// function generateSliderImage(images) {
//   initPagiantion(images.length);
//   slidesWrapper.innerHTML =''
//   images.forEach(image => {
//     slidesWrapper.innerHTML += imgMaker(image)
//   });

//   let items = slidesWrapper.children;

//   Array.from(items).forEach((slide, index) => {
//     slide.style.left = `${(index) * 100}%`
//   });

//   handelPagination(slidePosition);
// }

// function imgMaker(address) {
//   return `          <div class="product-slide">
//   <div  class="w-[250px] h-[250px]">
//     <img draggable="false"  class="w-full h-full " src="${address}">
//   </div>
// </div>`
// }



///////////////////////////////////////////////////////

let price= document.getElementById("total-price");
const onePrice = price.textContent;
let totalPrice =0;

 calculatePrice()
function calculatePrice() {
    
    totalPrice=price.textContent;
    console.log(onePrice);

let minus= document.getElementById("minus");
let plus= document.getElementById("plus");
    
    plus.addEventListener("click", () => {

        quantity.textContent = +quantity.textContent + 1

        totalPrice = (+quantity.textContent) * onePrice;
        price.textContent = (+quantity.textContent) * onePrice;

        
    })


    minus.addEventListener("click", () => {

        quantity.textContent = +quantity.textContent - 1

        totalPrice = (+quantity.textContent) * onePrice;
        price.textContent = (+quantity.textContent) * onePrice;

    })
}
////////////////////////////////////////////////////////

let count = 0;
slides.forEach((slide,index)=>{
    slide.style.left=`${index*100}%`
console.log(index);
   
});

window.next=()=>{
    count++
    console.log("hi");
    slideImage()
}

window.pre=()=>{
    count--
    slideImage()  
}

const slideImage=()=>{
    slides.forEach((slide,index)=>{
        slide.style.transform=`translateX(-${count*100}%)`
        
    })
}
////////////////////////////////////////////////////////

function getProducts(){
    
    const getPro = fetch(`http://localhost:3000/products/${productId}`).then((response)=>{
        return response.json()

    }).then((data)=>{
insertproduct(data)
    })
}
getProducts()




////////////////////////////////////////////////
let colorChoose=0;
function generatecolors(color){
return`
<div
data-color=${color}
onclick="chooseColor(this)"
 class="ckeck-tick flex justify-center items-center p-3 w-9 h-9 bg-${color}-500 rounded-full">
<i class="bi bi-check2 text-gray-700  text-3xl hidden"></i>
</div>`
}

function insertColor(list){
    color.innerHTML='';
    list.forEach((item)=>{
color.innerHTML += generatecolors(item)
    })
}
function resetColors() {
    let colorsElm = color.children;
    
    Array.from(colorsElm).forEach(span => {
      span.firstElementChild.classList.add('hidden')
    })
  }
window.chooseColor=(e)=>{
    console.log('hi');
   colorChoose =e.closest("div").dataset?.color;
const icon =e.closest("div").firstElementChild;
resetColors()
   icon.classList.remove('hidden')
}

///////////////////////////////////////////////
function generatesizes(size){
    return`<div
    onclick="chooseSize(this)"
    data-size=${size}
     class=" flex justify-center items-center p-3 w-9 h-9 border-2 border-gray-600 rounded-full text-gray-700">
    <p>${size}</p>
  </div>`
}

let sizeChoose=0;

function insertSize(list){
    size.innerHTML='';
    list.forEach((item)=>{
size.innerHTML += generatesizes(item)
    })
}

function resetSizes() {
    const sizes = size.children
    Array.from(sizes).forEach(circle => {
      circle.classList.remove('active-brand')
    });
  }
window.chooseSize = (e) => {
    sizeChoose = e.textContent;
    resetSizes()
    e.classList.add('active-brand');
   
  }

//////////////////////////////////////////


viewMore.addEventListener('click',()=>{
more.classList.remove('hidden');
less.classList.add('hidden')
})

const user = localStorage.getItem("user")[0];

addToCard.addEventListener('click',()=>{

    const obj= {
        "id": "",
        "productId":productId,
        "userId":user.id,
        "color":colorChoose,
        //روی هر کدوم که کلیک کرد بریزم توی یه متغیر و اینجا اسم متغیر رو بذارم
        "image": "../../src/img/Rectangle7.png",
        "size": sizeChoose,
        "status": "non-active",
        "count": quantity.textContent,
        "title":shoesName.textContent,
        "paymentMethod": "paypal",
        "price":"",
        "totalPrice":totalPrice,
        "shippingAddress":""
      }

      console.log(obj.totalPrice);

      request.post('orders', obj).then(result => {
        // console.log(result);
        // page.go('cart')
        buyBtn.innerHTML = "added to cart"
        setTimeout(() => {
          buyBtn.innerHTML = `<i class="bi bi-bag-check-fill"></i>
          <p>Add to cart</p>`
        }, 2000);
    
      }).catch(error => {
        console.log(error);
      })
})
////////////////////////////////////////////////

const like = document.getElementById("like");
const deactiveLike = document.getElementById("deactive-like");
const activeLike = document.getElementById("active-like");

getProductByID(productId);

like.addEventListener("click", () => {
    if (deactiveLike.classList.contains('hidden')) {
        deactiveLike.classList.remove("hidden")
        activeLike.classList.add("hidden")
      currentUser.wishlists.forEach((id,index) => {
        if (productId == id) {
          currentUser.wishlists.splice(index, 1);
          updateUser();
        }
      })
    } else {
        deactiveLike.classList.add("hidden")
        activeLike.classList.remove("hidden")
      currentUser.wishlists.push(productId);
      updateUser();
    }
  })

function updateUser() {
    const user = { ...currentUser };
    request.update('users',user).then(result => {
      console.log("update user");
    })
  }

  function getProductByID(id) {
    request.getById('products', id).then(result => {
      console.log(result[0]);
      productObj = new Product(result[0])
      insertproduct(productObj);
     
    });


  
    let userId = storage.getUser().id;
    console.log(userId);
    request.getById('users', userId).then(result => {
      currentUser = result[0];
      currentUser.wishlists.forEach(productId => {
        if (productId == productObj.id) {
          activeLike.classList.remove('hidden')
          deactiveLike.classList.add("hidden")
          return
        }
      })
    })
    
  
  }

