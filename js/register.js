/////////////////////// GLOBAL VALUES//////////////
const btnRegister = document.getElementById('btnRegister');
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

/////////////////////// EVENTS//////////////

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

///// real time validation call
formData.addEventListener('input',function(e){
    const inputsFeilds =['firstName' , 'lastName' , 'email' , 'password' , 'age'];
    for (let i = 0 ; i < inputsFeilds.length ; i++) {
        if(e.target.id == inputsFeilds[i]){
            validation(i);
        }else{
            continue;
        }
    }
    if (hasClass(inputs[0], "is-valid") && hasClass(inputs[1], "is-valid") && hasClass(inputs[2], "is-valid") && hasClass(inputs[3], "is-valid") && hasClass(inputs[4], "is-valid")) {
        isValid =true;
    } else {
        isValid =false;
    }
});


/////////////////////// FUNCTIONS//////////////
 //////save form data
function setForm (){
    let data = {
        first_name:inputs[0].value,
        last_name:inputs[1].value,
        email:inputs[2].value,
        password:inputs[3].value,
        age:inputs[4].value,
    };

    dataPost(data);
}

/////post data API
async function dataPost(inputData){
    const api = await fetch('https://movies-api.routemisr.com/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
  });
    let response = await api.json();
    if (response.message === "success") {
        document.getElementById("msg").innerHTML = response.message;
    } else {
        document.getElementById("msg").innerHTML = response.errors?.email.message;
    };
}

//// real time validation function
function validation(x){
    const regex =[/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/ , /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/ , /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ , /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ,/^([1-7][0-9]|80)$/];
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

////check feild validation
function hasClass(element, className) {
    return element.classList.contains(className);
}
