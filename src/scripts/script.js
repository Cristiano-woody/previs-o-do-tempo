//9936fcd42e0f48392a0428c51e2526a4

const apiKey = "9936fcd42e0f48392a0428c51e2526a4";
const apicountryURL = "https://countryflagsapi.com/png/anguilla";

const cityinput = document.getElementById('inputshearch');
const searchbtn = document.getElementById('button');

const cityelement = document.getElementById('cityname');
const spanDate = document.getElementById('span-date');
const spanWeater = document.getElementById('span-weater');
const description = document.getElementById('description');
const weathericon = document.getElementById('weathericon');
const umidity = document.getElementById('umidity');
const wind = document.getElementById('wind');


const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data)
}

function showWeatherData(city) {
    console.log(city);
    getWeatherData(city);
}


function HandleSubmit(e) {
    const city = cityinput.value;
    showWeatherData(city);
}

