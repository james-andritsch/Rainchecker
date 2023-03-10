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
        let forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?id=" + locationID + "&appid=" + apiKey;
        axios.get(forecastQuery)
        .then(function(response){
            console.log(response);
            const fData = document.querySelectorAll(".forecast");
            for (i=0; i<forecastData.length; i++) {
                fData[i].innerHTML = "";
                const fIndex = i*8 + 4;
                const fDate = new Date(response.data.list[fIndex].dt * 1000);
                const fDay = fDate.getDate();
                const fMonth = fDate.getMonth() + 1;
                const fYear = fDate.getFullYear();
                const fDateElement = document.createElement("p");
                fDateElement.setAttribute("class","mt-3 mb-0");
                fDateElement.innerHTML = fMonth + "/" + fDay + "/" + fYear;
                fData[i].append(fDateElement);
                // 5 day forecast
                const fWeatherElement = document.createElement("img");
                fWeatherElement.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[fIndex].weather[0].icon + "@2x.png");
                fWeatherElement.setAttribute("alst",response.data.list[fIndex].weather[0].description);
                fData[i].append(fWeatherElement);
                const fTempElement = document.createElement("p");
                fTempElement.innerHTML = "Temp: " + k2f(response.data.list[fIndex].main.temp) + " &#176F";
                fData[i].append(fTempElement);
                const fHumidityElement = document.createElement("p");
                fHumidityElement.innerHTML = "Humidity: " + response.data.list[fIndex].main.humidity + "%";
                fData[i].append(fHumidityElement);
            }
        })
    });
    
};
mainPage()