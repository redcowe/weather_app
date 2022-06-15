"use strict";
//This is a proof of concept. Just practicing consuming an API.
//For the sake of this project, I'm leaving the API key in the code. Please understand that I don't agree with it.
//Read more here: https://www.theodinproject.com/lessons/node-path-javascript-weather-app#api-keys-secrets-and-security
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//HTML Element and API key declairations
const API_KEY = '98fa83c685b411e856370b4f78f371e9';
const locationHTML = document.getElementById('location');
const tempHTML = document.getElementById('temp');
const searchBar = document.getElementById('searchBar');
const submitButton = document.getElementById('submitButton');
//Function responsible for getting weather info and setting 
const getLocationWeather = (lat, lon, cityName) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
        let temp = parseInt(data.main.temp);
        tempHTML.innerText = `${temp}°C`;
        locationHTML.innerText = `${cityName}`;
    })
        .catch(() => {
        alert("An error occured, please try again later");
    });
});
//Function responsible for getting lon/lat
const getLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
    if (location) {
        yield fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            const locationName = data[0].name;
            //Searching for location
            getLocationWeather(lat, lon, locationName);
        })
            .catch(() => {
            alert("Unable to find location");
        });
    }
    else {
        alert("please enter a valid location");
    }
});
//Prepopulating data
getLocation("Tokyo, Japan");
//Search function
submitButton.addEventListener("click", () => {
    getLocation(searchBar.value);
    searchBar.value = "";
});
