import { apikey } from "./constant.js";
let button = document.getElementById("searchbutton");
button.addEventListener("click", buscar);
document.addEventListener("keypress", (event) => {if(event.key == "Enter"){buscar()}});
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
let inputtext = document.getElementsByTagName("input");
console.log(inputtext[0].value);
let url; 
console.log(url);
let geodata;
let weatherdata;
let urltiempo;

async function buscar() {
  url = `http://api.openweathermap.org/geo/1.0/direct?q=${inputtext[0].value.toString()},ES&limit=2&appid=${apikey}`;
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      geodata = data;
      if (geodata.length == 0) {
        throw 41;
      }
      urltiempo = `https://api.openweathermap.org/data/2.5/weather?lat=${geodata[0].lat}&lon=${geodata[0].lon}&appid=${apikey}`;
      fetch(urltiempo)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          weatherdata = data;
          if(weatherdata.length == 0){
            throw 42;
          }else{loaddata();}
          
        })
        .catch((error) => {
          console.log("hola que tal estais")
          console.log(error);
          document.getElementsByTagName("img")[0].src =
            weather.get("images/404.png");
            document.getElementsByTagName("img")[0].style.marginBlock = "20px";
          document.getElementsByClassName("footer")[0].style.display = "none";
          document.getElementsByTagName("p")[0].style.display = "none";
          document.getElementById("subtemp").style.display = "none";
          document
            .getElementsByClassName("container")[0]
            .classList.add("active");
          delay(1000);
          document.getElementsByClassName("main")[0].style.scale = "1";
        });
    })
    .catch((error) => {
      console.log(error);
      document.getElementsByTagName("img")[0].src = "images/404.png";
      document.getElementsByTagName("img")[0].style.marginBlock = "20px";
      document.getElementsByClassName("footer")[0].style.display = "none";
      document.getElementsByTagName("p")[0].style.display = "none";
      document.getElementById("subtemp").style.display = "none";
      document.getElementsByClassName("container")[0].classList.add("active");
      delay(1000);
      document.getElementsByClassName("main")[0].style.scale = "1";
    });
}

async function loaddata() {
  document.getElementsByTagName("img")[0].style.marginBlock = "";
  console.log(geodata);
  console.log(weatherdata);
  document.getElementsByTagName("p")[0].innerHTML = `${Math.round(
    weatherdata.main.temp - 273
  )}<sup>°c</sup>`;
  let weather = new Map();
  weather.set("Clouds", "images/cloud.png");
  weather.set("Rain", "images/rain.png");
  weather.set("Drizzle", "images/rain.png");
  weather.set("Clear", "images/clear.png");
  let description = new Map();
  description.set("few clouds", "algunas nuves");
  description.set("scattered clouds", "Nubes dispersas");
  description.set("broken clouds", "Nubes dispersas");
  description.set("light intensity drizzle", "Lluvia ligera");
  description.set("clear sky", "Despejado");
  document.getElementsByTagName("img")[0].src = weather.get(
    weatherdata.weather[0].main
  );
  document.getElementById("subtemp").textContent = description.get(
    weatherdata.weather[0].description
  );
  document.getElementsByClassName("supitems")[0].innerHTML = `${Math.round(
    weatherdata.main.temp_max - 273
  )}<sup>°c</sup>`;
  document.getElementsByClassName("supitems")[1].innerHTML = `${Math.round(
    weatherdata.main.temp_min - 273
  )}<sup>°c</sup>`;
  document.getElementsByClassName("supitems")[2].innerHTML = `${Math.round(
    weatherdata.main.humidity
  )}%`;
  document.getElementsByClassName("supitems")[3].innerHTML = `${Math.round(
    weatherdata.wind.speed
  )} km/h`;
  document.getElementsByClassName("container")[0].classList.add("active");

  await delay(950);

  document.getElementById("subtemp").style.display = "block";
  document.getElementsByTagName("p")[0].style.display = "block";
  document.getElementsByClassName("main")[0].style.display = "flex";
  document.getElementsByClassName("footer")[0].style.display = "grid";
  document.getElementsByClassName("main")[0].style.scale = "1";
  document.getElementsByClassName("footer")[0].style.scale = "1";
  geodata = "";
  weatherdata = "";
  console.log(weatherdata);
}

