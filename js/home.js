/////////GLOBAL ///////////
const apiLinks = document.querySelectorAll(' .menu .nav-link')
const loader = document.querySelector('.loading'); 
const mode = document.getElementById("mode");
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////// start//////////////
getGames('mmorpg');

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
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////// Events ////////////////
// API calls 
for (let i = 0; i < apiLinks.length; i++) {
    apiLinks[i].addEventListener('click',function(){
        document.querySelector('.menu .active').classList.remove('active');
        const category =apiLinks[i].getAttribute('data-category');
        apiLinks[i].classList.add('active');
        getGames(category);
    }) 
}

// logOut
document.querySelector(".logout-btn").addEventListener("click", function () {
   localStorage.removeItem("loggInData");
   location.href = "./index.html";
});

//// change light/dark mode
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////Functions //////////////
// get APi
async function getGames(category){
    loader.classList.remove('d-none');

    const options = {
       method: "GET",
       headers: {
          "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
       },
    };
 
    const apiResponse = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);

    const data = await apiResponse.json();
    displayData(data);
    loader.classList.add('d-none')
}

// html data display
function displayData(x){
    let cartona =``;

    for (let i = 0; i < x.length; i++) {
        let vedioApiSource = x[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm");
        cartona +=`
        <div class="col">
        <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${x[i].id})" class="card h-100 bg-transparent" role="button" >
          <div class="card-body">
 
             <figure class="position-relative">
                <img class="card-img-top object-fit-cover h-100" src="${x[i].thumbnail}" />
 
              <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
               <source src="${vedioApiSource}">
               </video>
 
             </figure>
 
             <figcaption>
 
                <div class="hstack justify-content-between">
                   <h3 class="h6 small">${x[i].title}</h3>
                   <span class="badge text-bg-primary p-2">Free</span>
                </div>
 
                <p class=" small text-center opacity-75 textColor">
                   ${x[i].short_description}
                </p>
 
             </figcaption>
          </div>
 
          <footer class="card-footer small hstack justify-content-between">
 
             <span class="badge badge-color">${x[i].genre}</span>
             <span class="badge badge-color">${x[i].platform}</span>
 
          </footer>
         </div>
        </div>`;     
    }
    document.getElementById('gameData').innerHTML=cartona;
}
 
// start vedios when hover
function startVideo(event) {
    const videoEl = event.target.querySelector("video"); // card ---> video
    videoEl.classList.remove("d-none");
    videoEl.muted = true;
    videoEl.play();
 }
//  stop vedio 
 function stopVideo(event) {
    const videoEl = event.target.querySelector("video");
    videoEl.classList.add("d-none");
    videoEl.muted = true;
    videoEl.pause();
 }

// go to details page   
 function showDetails(id) {
    location.href = `./details.html?id=${id}`;
 }