const local = localStorage.getItem('isFirstTime');
console.log(local);
if(local !== null){
    window.location='http://127.0.0.1:5500/Landing/login.html'
}


const showShoea = document.getElementById("show-shoea");
const introduction = document.getElementById("introduction");
const slides= document.querySelectorAll(".slide");
const nextBtn= document.getElementById("next-btn");
const slider= document.getElementById("intro-slides");

fadeInshowShoea();
startIntroduction()

function fadeInshowShoea(){
    let opacity = 0;
    let fadeIn = setInterval(() => {
        showShoea.style.opacity = opacity;
        opacity += 0.01;
        if (opacity >= 1) {
            clearInterval(fadeIn);
            startIntroduction()
          }
      }, 10);   
      
}


function startIntroduction() {
    setTimeout(() => {
      introduction.classList.remove('hidden')
      showShoea.classList.add('hidden')
      introduction.classList.add('animate-fadeOut');
      
    }, 1000);

    introduction.addEventListener("click",(e)=>{
            console.log("hello");
            setTimeout(() => {
                      slider.classList.remove('hidden')
                      introduction.classList.add('hidden')
                      slider.classList.add('animate-comeLeft');
                      
                    }, 1000);}
        )
}
    

// function startSlider() {
   
//     }
//     startSlider()
    





    ////////////image slider////////////
let count = 0;
slides.forEach((slide,index)=>{
    slide.style.left=`${index*100}%`
console.log(index);
   
});

const next=()=>{
    count++
    slideImage()
}

const slideImage=()=>{
    slides.forEach((slide,index)=>{
        slide.style.transform=`translateX(-${count*100}%)`
        
    })
    if(count===2){
        nextBtn.textContent='get start'
        
    }else{
        nextBtn.textContent='Next'
    }
    if(count===3){
        window.location='http://127.0.0.1:5500/Landing/login.html'
    }
}






// function startSplash() {
  
//     setTimeout(() => {
//       showShoea.classList.add('animate-fadeIn');
//       startIntroduction();
//     }, 5000);
  
//   }
  
 

   

