//For the sake of this project, I'm leaving the API key in the code. Please understand that I don't agree with it.

const API_KEY: string = '98fa83c685b411e856370b4f78f371e9';
const locationHTML: any = document.getElementById('location');
const tempHTML: any = document.getElementById('temp');

//Function responsible for getting weather info
const getLocation = async(lat: number, lon: number, cityName: string) => {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            .then(res => res.json())
            .then(data => {
                tempHTML.innerText = data.main.temp;
                locationHTML.innerText = `${cityName}`
            })
            .catch(err => {
                console.log(err);
            })
}
//Function responsible for getting lon/lat
const getLocationStats = async(location: string) => {
    if (location){
        await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            console.log(data);
            let locationName = data[0].name
            getLocation(lat, lon, locationName)
            return;
        })
        .catch(err => {
            console.log(err);
        })
    }
    else {
        alert("please enter a valid location")
    }
    
}

getLocationStats("Utsunomiya")