function generateCaptcha(){

const chars="ABCDEFGHJKLMNPQRSTUVWXYZ123456789";

let captcha="";

for(let i=0;i<5;i++){

captcha+=chars[Math.floor(Math.random()*chars.length)];

}

document.getElementById("captchaText").innerText=captcha;

window.generatedCaptcha=captcha;

}

generateCaptcha();

document.getElementById("quoteForm").addEventListener("submit",function(e){

e.preventDefault();

const input=document.getElementById("captchaInput").value;

if(input!==window.generatedCaptcha){

alert("Captcha incorrect");

generateCaptcha();

return;

}

alert("Quote request submitted successfully!");

});