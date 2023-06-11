import {Product} from "./product.js";

const slides= document.querySelectorAll(".slide");
const nextBtn= document.getElementById("next-btn");
const preBtn= document.getElementById("pre-btn");
const nikeLogo= document.getElementById("nike-logo");
const adidasLogo= document.getElementById("adidas-logo");
const pumaLogo= document.getElementById("puma-logo");
const asicsLogo= document.getElementById("asics-logo");
const reebokLogo= document.getElementById("reebok-logo");
const newBalanceLogo= document.getElementById("newbalance-logo");
const converseLogo= document.getElementById("converse-logo");
const cardContainer= document.getElementById("card-container");
const seeAllBtn= document.getElementById("see-all-btn");



///////////////////////////////////////////
const allBtn= document.getElementById("all-btn");
const nikeBtn= document.getElementById("nike-btn");
const chooseBrand= document.querySelectorAll(".choose-brand");






let count = 0;
slides.forEach((slide,index)=>{
    slide.style.left=`${index*100}%`
console.log(index);
   
});

const next=()=>{
    count++
    console.log("hi");
    slideImage()
}

const pre=()=>{
    // count--
    // slideImage()
}

const slideImage=()=>{
    slides.forEach((slide,index)=>{
        slide.style.transform=`translateX(-${count*100}%)`
        
    })
    if(count===3){
        nextBtn.classList.add=('hidden')
        
    }
    if(count===0){
        preBtn.classList.add=('hidden')  
    }
}

// nextBtn.addEventListener('click',()=>{
//     console.log("hi");
// })
// preBtn.addEventListener('click',()=>{
//     console.log("back");
//     count--
//     slideImage()
// })


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
        // cardContainer.innerHTML='';
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
// getProducts()


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



allBtn.addEventListener('click',()=>{
    getProducts()
    allBtn.style.backgroundColor="gray-700",
    allBtn.style.border="gray-700",
    allBtn.style.color="white",
    chooseBrand.style.backgroundColor='#fff',
    chooseBrand.style.border='gray-700',
    chooseBrand.style.color='gray-700'
})
const myStyles = `
    background-color: white;
    border: 2px solid black;
    color: black;
`;
nikeBtn.addEventListener('click',()=>{
    console.log("nike");
    // nikeBtn.style.backgroundColor='gray'
    // nikeBtn.style.border='#eee'
    // nikeBtn.style.color='#fff'
    // chooseBrand.style.cssText= myStyles;
    // chooseBrand.classList.add('border-gray-700')
    // chooseBrand.style.color='#eee'
getProductByFilter('nike');

})


