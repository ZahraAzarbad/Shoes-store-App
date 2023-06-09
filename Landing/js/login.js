// const local = localStorage.setItem('isFirstTime','true');

const emailBox = document.getElementById('email-box');
const emailInput = document.getElementById('email-input');
const passwordBox = document.getElementById('password-box');
const passwordInput = document.getElementById('password-input');
const signInBtn = document.getElementById('signin-btn');
const emailIcon = document.getElementById('email-icon');
const passwordIcon = document.getElementById('password-icon');
const eyeIcon=document.getElementById("eye-icon")
const openEyeIcon=document.getElementById("open-eye-icon")
const showPassword=document.getElementById("show-password")

const emailInvalidMessage = document.getElementById('email-invalid-message');
const passwordNotCorrectMessage = document.getElementById('password-notcorrect-message');
//////////request to json//////////

function userpermission(){
    const request = fetch(' http://localhost:3000/users').then((response)=>{
        return response.json()
    }).then((users)=>{
        const myMember=users.filter((user)=>{
            return emailInput.value==user.email && passwordInput.value==user.email
        })
        console.log(myMember);
        if(myMember.length !== 0 ){
            // window.location='page url'
            localStorage.setItem('user',JSON.stringify(myMember))
            emailInvalidMessage.classList.add('hidden')
        }else{
            emailInvalidMessage.classList.remove('hidden')
        }
        }

       
        
    )}

/////////////Sign In Button////////
signInBtn.addEventListener('click',()=>{
    if(!signInBtn.classList.contains("btn-color")){
     
    if(emailInvalid() && passwordCorrection() ){
        userpermission()
     }
     
     
    }
   })

//////////Email////////////

emailInput.addEventListener('focus',()=>{
    emailBox.classList.add('border')
})
emailInput.addEventListener('focusout',()=>{
    emailBox.classList.remove('border')
})
emailInput.addEventListener('keydown',()=>{
   checkEmailInput();
})

 
function checkEmailInput(){
    if(emailInput.value!==""){
emailIcon.classList.add('text-slate-800');
emailIcon.classList.remove('text-slate-400');
signInBtn.classList.add('bg-slate-900');
signInBtn.classList.remove('btn-color');


    }else{
        emailIcon.classList.add('text-slate-400');
        emailIcon.classList.remove('text-slate-800'); 
        signInBtn.classList.add('btn-color');
signInBtn.classList.remove('bg-slate-900');
    }
}

function emailInvalid(){
    if(emailInput.value==""||!emailInput.value.includes('@')){
        emailInvalidMessage.classList.remove('hidden')
        return false
    }
    emailInvalidMessage.classList.add('hidden')
    return true


}




///////////////////Password/////////////////

/////////change borders color when clicks on input
passwordInput.addEventListener('focus',()=>{
    passwordBox.classList.add('border')
})
passwordInput.addEventListener('focusout',()=>{
    passwordBox.classList.remove('border')
})
passwordInput.addEventListener('keydown',()=>{
    changeColorPasswordInput()
 })


function changeColorPasswordInput(){
    if(passwordInput.value!==""){
passwordIcon.classList.add('text-slate-800');
passwordIcon.classList.remove('text-slate-400');
eyeIcon.classList.add('text-slate-800');
eyeIcon.classList.remove('text-slate-400');
openEyeIcon.classList.add('text-slate-800');
openEyeIcon.classList.remove('text-slate-400');
signInBtn.classList.add('bg-slate-900');
signInBtn.classList.remove('btn-color');


    }else{
        passwordIcon.classList.add('text-slate-400');
        passwordIcon.classList.remove('text-slate-800'); 
        openEyeIcon.classList.add('text-slate-400');
        openEyeIcon.classList.remove('text-slate-800'); 
        eyeIcon.classList.add('text-slate-400');
        eyeIcon.classList.remove('text-slate-800'); 
        signInBtn.classList.add('btn-color');
signInBtn.classList.remove('bg-slate-900');
    }
}

function passwordCorrection(){
    if(passwordInput.value==""){
        passwordNotCorrectMessage.classList.remove('hidden')
        return false
    }
    passwordNotCorrectMessage.classList.add('hidden')
    return true

}

showPassword.addEventListener('click',()=>{
if(passwordInput.type===`text`){
passwordInput.type=`password`;
openEyeIcon.classList.add('hidden');
eyeIcon.classList.remove('hidden');

}else{
    passwordInput.type=`text`;
    openEyeIcon.classList.remove('hidden');
    eyeIcon.classList.add('hidden');  
}
})

