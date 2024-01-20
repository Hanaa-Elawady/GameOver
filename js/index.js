/////////////////////// GLOBAL//////////////
const btnLogin = document.getElementById('btnLogin');
const inputs = document.getElementsByTagName('input');
const formData = document.querySelector("form");
let isValid = false;

/////////////////////// WHEN START//////////////

//// check saved light/dark mode 
if (localStorage.getItem("theme") != null) {
    const themeData = localStorage.getItem("theme");
 
    if (themeData === "light") {
       mode.classList.replace("fa-sun", "fa-moon");
    } else {
       mode.classList.replace("fa-moon", "fa-sun");
    }
 
    document.querySelector("html").setAttribute("data-theme", themeData);
 }

//////////////  EVENT ////////////

//// register form action when submit
formData.addEventListener('submit',function(e){
    e.preventDefault();
    console.log(isValid)
    if (isValid) {
        setForm();
    }else{
        for(let i =0 ; i<inputs.length ; i++ ){
            if(hasClass(inputs[i], "is-valid")){
                continue;
            }else{
            inputs[i].classList.add("is-invalid");
            }
        }
    }
});

///// real time validation call
formData.addEventListener('input',function(e){
    const inputsFeilds =[ 'email' , 'password'];
    for (let i = 0 ; i < inputsFeilds.length ; i++) {
        if(e.target.id == inputsFeilds[i]){
            validation(i);
        }else{
            continue;
        }
    }
    if (hasClass(inputs[0], "is-valid") && hasClass(inputs[1], "is-valid")) {
        isValid =true;
    } else {
        isValid =false;
    }
});

// change light/dark mode
mode.addEventListener("click", function () {
   if (mode.classList.contains("fa-sun")) {
      document.querySelector("html").setAttribute("data-theme", "light");
      mode.classList.replace("fa-sun", "fa-moon");

      localStorage.setItem("theme", "light");
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); //change icon -->sun
      document.querySelector("html").setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
   }
});

//////////////  FUNCTIONS ////////////
 //////form 
function setForm (){
    let data = {
        email:inputs[0].value,
        password:inputs[1].value,
    };

    dataPost(data);
}

/////post data API
async function dataPost(inputData){
    const api = await fetch('https://movies-api.routemisr.com/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
  });

    let response = await api.json();
    if (response.message === "success") {
        localStorage.setItem("loggInData", response.token);
        location.href='./home.html';
    } else {
        document.getElementById("msg").innerHTML = response.message;
    };
}

//// real time validation function
function validation(x){
    const regex =[/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ , /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/];
    if (regex[x].test(inputs[x].value)) {
        // el tmam
        inputs[x].classList.add("is-valid");
        inputs[x].classList.remove("is-invalid");
     } else {
        //el mesh tmam
        inputs[x].classList.add("is-invalid");
        inputs[x].classList.remove("is-valid");
     }
}

////check validation
function hasClass(element, className) {
    return element.classList.contains(className);
}