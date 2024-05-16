const main = document.getElementById("main");
const loading = document.querySelector(".loading");
const theme = document.getElementById("theme");
const root = document.querySelector(":root");
const moon = document.getElementById("moon");
const searchIcon = document.getElementById("search-icon");
const mode_text = document.querySelector(".mode-text");
countries=[];
async function runProcess(){

    try{
           const response= await fetch("https://restcountries.com/v2/all")
           const data = await response.json();
           countries=data;
           loading.innerHTML="";
           countries.forEach(country => {

            //creates the main container
            const countryContainer = document.createElement('div');
            countryContainer.classList.add('country');

            //Create flag container and flag img
            const flagContainer = document.createElement('div');
            flagContainer.classList.add('flag-container');
            
            const flagImg = document.createElement('img');
            flagImg.classList.add('flag');
            flagImg.src = country.flag;
            flagContainer.appendChild(flagImg);

            //Create country details container

            const countryDetails = document.createElement('div');
            countryDetails.classList.add('country-details');
            const countryName = document.createElement('h2');
            countryName.classList.add('country-name');
            countryName.textContent =country.name;

            const population = document.createElement('span');
            population.innerHTML = `<strong>Population: </strong>${country.population}<br>`;

            const region = document.createElement('span');
            region.innerHTML = `<strong>Region: </strong>${country.region}<br>`;
            
            const capital = document.createElement('span');
            capital.innerHTML = `<strong>Capital: </strong>${country.capital}<br>`;

            //Append child elements to country container

            countryDetails.appendChild(countryName)
            countryDetails.appendChild(population)
            countryDetails.appendChild(region)
            countryDetails.appendChild(capital)

            //append flag container and country details  to country container

            countryContainer.appendChild(flagContainer);
            countryContainer.appendChild(countryDetails);

            main.appendChild(countryContainer)
           });

           
    }
    catch(error){
        console.log(error)
    }

}

runProcess();
let mode = localStorage.getItem("mode");

theme.addEventListener("click",()=>{
    if(mode==="dark"){
        localStorage.setItem("mode","light");
    }
    else{
        localStorage.setItem("mode","dark");
    }
    mode=localStorage.getItem("mode");
    changeTheme();

})
function changeTheme(){
    if (mode === "dark"){
        root.style.setProperty("--bg","#202c37");
        root.style.setProperty("--text","#ffffff");
        root.style.setProperty("--lbg","#2b3945");
        moon.src="icons/moon-regular.svg";
        searchIcon.src="icons/search-regular.svg";
        mode_text.textContent="Light Mode";

    }
    else{
        root.style.setProperty("--bg","#fafafa");
        root.style.setProperty("--text","#111517");
        root.style.setProperty("--lbg","#ffffff");
        moon.src="icons/moon-solid.svg";
        searchIcon.src="icons/search-solid.svg";
        mode_text.textContent="Dark Mode";
    }

}
changeTheme();