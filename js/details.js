/////////////////////// GLOBAL VALUES//////////////
const dataId = new URLSearchParams(location.search).get('id');


/////////////////////// WHEN START//////////////
getData(dataId);

// check saved light/dark mode 
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


/////////////////////// FUNCTIONS//////////////
// get API
async function getData(id){
    const options = {
        method: "GET",
        headers: {
           "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
           "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
     };
     const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
  
     const data = await api.json();
     displayData(data);
     console.log(data);
  
}
// html data display
function displayData(x){
    let cartona =`
        <div class="col-md-4">
            <figure>
            <img src="${x.thumbnail}" class="w-100" alt="details image" />
            </figure>
        </div>
        <div class="col-md-8">
        
            <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb" class="text-light">
                    <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
                    <li class="breadcrumb-item text-info" aria-current="page">${x.title}</li>
                </ol>
            </nav>
        
            <h1>${x.title}</h1>
        
            <h3>About ${x.title}</h3>
            <p>${x.description}</p>
            </div>
        </div>`;     
    document.getElementById('detailsData').innerHTML=cartona;

    const backgroundImage = x.thumbnail.replace("thumbnail", "background");

    document.body.style.cssText = `
    background-image:url('${backgroundImage}') ;
    background-size:cover;
    background-position:center; `;
}