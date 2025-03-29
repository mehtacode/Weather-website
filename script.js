const API_key = "af0348ed3ad216d028627277b50db13f";

function fetchData(URL, callback) {
    fetch(`${URL}&appid=${API_key}`)
        .then(res => res.json())
        .then(data => callback(data));
}

function getWeather() {
    const city = document.getElementById('search').value;
    if (!city) return;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    fetchData(URL, updateWeather);
}

function updateWeather(data) {
    if (data.cod !== 200) {
        document.getElementById('weather').innerHTML = `<p class='text-red-300 font-medium'>${data.message}</p>`;
        return;
    }
    document.getElementById('weather').innerHTML = `
        <h2 class="text-2xl font-semibold">${data.name}, ${data.sys.country}</h2>
        <p class="text-lg capitalize">${data.weather[0].description}</p>
        <p class="text-5xl font-bold">${data.main.temp}°C</p>
        <div class="flex justify-around mt-4">
            <div>
                <p class="text-lg font-semibold">Humidity</p>
                <p class="text-xl">${data.main.humidity}%</p>
            </div>
            <div>
                <p class="text-lg font-semibold">Wind</p>
                <p class="text-xl">${data.wind.speed} m/s</p>
            </div>
        </div>
    `;
}