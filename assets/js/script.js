function mainPage() {
    const citySearch = document.getElementById(citySearch);
    const citySearchBtn = document.getElementById(citySearchBtn);
    const clearHistoryBtn = document.getElementById(clearHistoryBtn);
    const history = document.getElementById(history);
    const cityName = document.getElementById(cityName);
    const currentWeather = document.getElementById(currentWeather);
    const temperature = document.getElementById(temperature);
    const wind = document.getElementById(wind);
    const humidity = document.getElementById(humidity);

    let searchHistory = JSON.parse(localstorage.getitem("citySearchBtn")) || [];
    
    var apiKey = '33f6cad16858e755388f2b3c7bab082f';
    // grabbing api info to front page
    function getWeatherData(nameOfCity) {
        let URL = "https://api.openweathermap.org/data/2.5/weather?q="+nameOfCity+"&appid="+apiKey;
        axios.get(queryURL)
        .then(function(response){
            console.log(response);
            const todaysDate = new Date(response.data.dt*1000);
            console.log(todaysDate);
            const day = todaysDate.getDate();
            const month = todaysDate.getMonth() + 1;
            const year = todaysDate.getFullYear();
            cityName.innerHTML = response.data.name + "(" + month + "/" + day + "/" + year +")";

            // ads weather symbols
            let weatherSymbol = response.data.weather[0].icon;
            currentWeather.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherSymbol + "@2x.png");
            currentWeather.setAttribute("alt",response.data.weather[0].description);
            temperature.innerHTML = "Temperature: " +k2f(response.data.main.temp) + "&#176F";
            humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            wind.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;


        });

        let locationID = response.data.id;
        
    }
    
};
mainPage()