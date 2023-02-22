//9936fcd42e0f48392a0428c51e2526a4

//variaveis de configuracao
const apiKey = "9936fcd42e0f48392a0428c51e2526a4";
const apicountryURL = "https://countryflagsapi.com/png/";
const date = new Date();
const days = ["Dom", "Seg", "Ter", "Quar", "Quin", "Sex", "Sab"];
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];


//variaveis de manipulacao

const cityinput = document.getElementById('inputShearch');
const searchbtn = document.getElementById('button');
const error = document.getElementById('divError');

const containerWeater = document.getElementById('containerWeater');
const cityName = document.getElementById('cityName');
const country = document.getElementById('country');
const spanDate = document.getElementById('date');
const Weater = document.getElementById('weater');
const description = document.getElementById('description');
const descriptionIcon = document.getElementById('descriptionIcon');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

//manipulacao do DOM
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityName.innerHTML = data.name;
    spanDate.innerHTML = `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}`;

    Weater.innerHTML = `${parseInt(data.main.temp)} º C`;
    description.innerHTML = data.weather[0].description;

    humidity.innerHTML = `${parseInt(data.main.humidity)}%`;
    wind.innerHTML = `${data.wind.speed}km/h`

    descriptionIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    country.setAttribute("src", apicountryURL + data.sys.country);
    deactivatesuggestion();
    activDataWeater();
}

const setError = () => {
    error.style.display = 'flex';
}
const removeError = () => {
    error.style.display = 'none';
}

const activDataWeater = () => {
    containerWeater.style.visibility = 'visible';
    containerWeater.style.opacity = '100%';
    containerWeater.style.zIndex = '1000';
}

const deactivatesuggestion = () =>{
    const suggestion = document.getElementById('suggestion');
    suggestion.style.visibility = 'hidden';
    suggestion.style.opacity = '0%';
    suggestion.style.zIndex = '-1000';
}

//eventos
const HandleSubmit = (e) => {
    const city = cityinput.value;
    removeError();
    showWeatherData(city);
}

cityinput.addEventListener("keyup", (e) => {
    if (e) {
        wind.innerHTML = e.key;
        const city = cityinput.value;
        removeError();
        showWeatherData(city);
    }
})

const suggestionLocales = (locale) =>{
    removeError();
    showWeatherData(locale);
}

//req para a API
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL);

    if (res.status !== 200) {
        return setError();
    }

    const data = await res.json();
    return data;
}