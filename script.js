const BASE_URL = "http://localhost:5000";  // Change this when deploying

function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetch(`${BASE_URL}/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.current) {
                const weatherDesc = data.current.condition.text.toLowerCase();
                const weatherContainer = document.getElementById("weather-container");

                const weatherImages = {
                    "sunny": "assets/sunny.webp",
                    "partly cloudy": "assets/partly_cloudy.jpg",
                    "overcast": "assets/overcast.jpg",
                    "mist": "assets/mist.jpeg",
                    "blizzard": "assets/blizzard.avif",
                    "clear": "assets/clear.webp",
                    "cloudy": "assets/cloudy.jpg",
                    "thunder": "assets/thunder.jpg",
                    "thundery outbreaks in nearby": "assets/thunderyoutbreak.jpeg",
                    "patchy light snow with thunder": "assets/snowwiththunder.jpg",
                    "snow": "assets/snow.avif",
                    "moderate snow": "assets/moderatesnow.jpg",
                    "heavy snow": "assets/heavysnow.jpeg",
                    "blowing snow": "assets/blowingsnow.avif",
                    "light snow": "assets/snow.avif",
                    "snow with thunder": "assets/snowwiththunder.jpg",
                    "patchy light snow": "assets/patchylightsnow.jpg",
                    "patchy moderate snow": "assets/moderatesnow.jpg",
                    "patchy heavy snow": "assets/heavysnow.jpeg",
                    "fog": "assets/fog.jpg",
                    "freezing fog": "assets/freezingfog.avif",
                    "rain": "assets/rainny.jpeg",
                    "torrential rain shower": "assets/torrentialrain.jpeg",
                    "patchy rain nearby": "assets/patchyrainnearby.jpg",
                    "patchy light rain": "assets/rainny.jpeg",
                    "moderate rain": "assets/moderaterain.jpg",
                    "moderate rain at times": "assets/moderaterain.jpg",
                    "heavy rain": "assets/heavyrain.jpg",
                    "heavy rain shower": "assets/heavyrainshower.jpeg",
                    "heavy rain at times": "assets/heavyrain.jpg",
                    "light rain shower": "assets/lightrainshower.jpeg",
                    "light freezing rain": "assets/freezingrain.avif",
                    "moderate freezing rain": "assets/freezingrain.avif",
                    "heavy freezing rain": "assets/freezingrain.avif",
                    "rain with thunder": "assets/rainwiththunder.jpg",
                    "light drizzle": "assets/drizzle.avif",
                    "freezing drizzle": "assets/freezingdrizzle.jpeg",
                    "patchy freezing drizzle": "assets/patchyfreezingdrizzle.jpeg",
                    "heavy freezing drizzle": "assets/freezingdrizzle.jpeg",
                    "heavy sleet": "assets/heavysleet.jpg",
                    "light sleet": "assets/lightsleet.jpg",
                    "ice pellets": "assets/icepellets.avif",
                    "heavy shower of ice pellets": "assets/hshoweroficepellet.jpg"
                };

                let bgImage = "assets/bg.png";
                for (let key in weatherImages) {
                    if (weatherDesc.includes(key)) {
                        bgImage = weatherImages[key];
                        break;
                    }
                }

                weatherContainer.style.background = `url('${bgImage}') no-repeat center center/cover`;

                document.getElementById("weather-info").innerHTML = `
                <h3 style="color:white;">${data.location.name}, ${data.location.region}, ${data.location.country}</h3>
                <p style="color:white;">Temperature: <strong>${data.current.temp_c}°C</strong></p>
                <p style="color:white;">Weather: <strong>${weatherDesc}</strong></p>
                <p style="color:white;">Humidity: <strong>${data.current.humidity}%</strong></p>
                <p style="color:white;">Wind Speed: <strong>${data.current.wind_kph} kph</strong></p>
                <p style="color:white;">Cloud: <strong>${data.current.cloud}</strong></p>
                `;
            } else {
                document.getElementById("weather-info").innerHTML = `<p style="color: red;">City not found!</p>`;
            }
        })
        .catch(error => console.log("Error fetching data:", error));
}
