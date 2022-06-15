//This is a proof of concept. Just practicing consuming an API.
//For the sake of this project, I'm leaving the API key in the code. Please understand that I don't agree with it.
//Read more here: https://www.theodinproject.com/lessons/node-path-javascript-weather-app#api-keys-secrets-and-security

//HTML Element and API key declairations
const API_KEY: string = '98fa83c685b411e856370b4f78f371e9';
const locationHTML: HTMLElement = document.getElementById('location')!;
const tempHTML: HTMLElement = document.getElementById('temp')!;
const searchBar = document.getElementById('searchBar') as HTMLInputElement;
const submitButton: HTMLElement = document.getElementById('submitButton')!;

//Function responsible for getting weather info and setting 
const getLocationWeather = async(lat: number, lon: number, cityName?: string) => {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            .then(res => res.json())
            .then(data => {
                let temp: number = parseInt(data.main.temp);
                tempHTML.innerText = `${temp}°C`;
                locationHTML.innerText = `${cityName}`
            })
            .catch(() => { 
                alert("An error occured, please try again later");
            })
}

//Function responsible for getting lon/lat
const getLocation = async(location: string) => {
    if (location){
        await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            const locationName = data[0].name
            //Searching for location
            getLocationWeather(lat, lon, locationName)
        })
        .catch(() => {
            alert("Unable to find location");
        })
    }
    else {
        alert("please enter a valid location")
    }
    
}

//Prepopulating data
getLocation("Tokyo, Japan");

//Search function
submitButton.addEventListener("click", () => {    
     getLocation(searchBar.value);
     searchBar.value = "";  
})