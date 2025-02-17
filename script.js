function getWeather() {
    const city = document.getElementById("city").value.trim();
    const apiKey = "4e589bbd2b8645c5973115928251602";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.current){
                const weatherDesc = data.current.condition.text;

                document.getElementById("weather-info").innerHTML = `
                <h3 style = "color:white;">${data.location.name}, ${data.location.country} co</h3>
                <p style = "color:white;">Temperature: <strong>${data.current.temp_c}°C</strong></p>
                <p style = "color:white;">Weather: <strong>${weatherDesc}</strong></p>
                <p style = "color:white;">Humidity: <strong>${data.current.humidity}%</strong></p>
                <p style = "color:white;">Wind Speed: <strong>${data.current.wind_kph}kph</strong></p>
                `
            } else{
                document.getElementById("weather-info").innerHTML = `<p style="color: red;">City not found!</p>`
            }
        })
        .catch(error => console.log("Error fetching data:", error));
}
