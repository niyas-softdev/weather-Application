// Function to set default background image on page load
window.addEventListener("load", function () {
  changeBackgroundImage("default");
});

document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value;
  const apiKey = "8eac03ac5cd1b6edb44ecc6e89a36a6e"; // Your API key

  // Ensure the city input is not empty
  if (city.trim() === "") {
    alert("Please enter a city name.");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      // Update weather information
      document.getElementById("cityName").textContent = data.name;
      document.getElementById(
        "temperature"
      ).textContent = `Temperature: ${data.main.temp} °C`;
      document.getElementById(
        "condition"
      ).textContent = `Condition: ${data.weather[0].description}`;

      // Change background image based on weather condition
      const weatherCondition = data.weather[0].main.toLowerCase();
      changeBackgroundImage(weatherCondition);
    })
    .catch((error) => {
      alert(error.message); // Display the error to the user
      console.log(error);
    });
});

function changeBackgroundImage(condition) {
  const container = document.querySelector(".container");

  if (condition.includes("cloud")) {
    container.style.backgroundImage =
      "url('https://img.freepik.com/free-photo/grassy-field-with-leafless-trees-distance-cloudy-sky-background_181624-4535.jpg')";
  } else if (condition.includes("clear")) {
    container.style.backgroundImage =
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY0p7-i5hfPnUZ-ob8_c_4FKTsxQB8yjDFdQ&s')";
  } else if (condition.includes("rain")) {
    container.style.backgroundImage =
      "url('https://static.vecteezy.com/system/resources/previews/033/645/252/non_2x/drizzle-rainy-day-in-autumn-background-and-wallpaper-generative-ai-photo.jpg')";
  } else if (condition.includes("snow")) {
    container.style.backgroundImage =
      "url('https://img.pikbest.com/wp/202344/snowy-snow-winter-wonderland-a-refreshing-texture-and-scene-of-fresh_9924322.jpg!bw700')";
  } else {
    container.style.backgroundImage =
      "url('https://t3.ftcdn.net/jpg/05/79/86/10/360_F_579861052_KjeAAbyaXOBY6JjxMEPBVJypp2KSb59v.jpg')"; // Default image for any other condition or initial page load
  }
}
