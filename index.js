document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("cityInput");
    const button = document.getElementById("submitButton");
    const output = document.querySelector(".output");
    const apiKey = "";

    button.addEventListener("click", async (event) => {
        event.preventDefault();
        output.innerHTML = "";

        const city = cityInput.value.trim();
        if (city) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                if (!response.ok) {
                    displayError("Please enter a proper city");
                    return;
                }

                const data = await response.json();
                displayWeather(data);
                output.style.display = "block";

            } catch (error) {
                displayError("Error fetching data");
            }
        } else {
            displayError("Enter a city please");
        }
    });

    function displayWeather(data) {
        const { name, main, weather, wind } = data;
        const weatherInfo = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Condition: ${weather[0].description}</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
        `;
        output.innerHTML = weatherInfo;
    }

    function displayError(message) {
        output.innerHTML = `<p class="error">${message}</p>`;
    }
});
