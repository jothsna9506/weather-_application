const apiKey = '21043e8725222a4b107700c2472a8ea0';  // Replace with your OpenWeatherMap API key

async function getWeather() {
  const cityInput = document.getElementById('cityInput').value;  // Get the city name from input
  console.log(`City input: ${cityInput}`);  // Debug: Check city input
  
  if (cityInput === '') {
    alert('Please enter a city name');
    return;
  }

  // Construct the API URL with the city name and API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  console.log(`API URL: ${url}`);  // Debug: Check the API URL

  try {
    const response = await fetch(url);  // Make an API call
    console.log(`API Response Status: ${response.status}`);  // Debug: Check status code

    if (!response.ok) {  // If response is not ok (e.g., city not found)
      throw new Error('City not found');
    }
    
    const weatherData = await response.json();  // Parse JSON response
    console.log('Weather Data:', weatherData);  // Debug: Log the weather data

    displayWeather(weatherData);  // Display the weather data on the webpage
  } catch (error) {
    alert(error.message);  // Display error message if city is not found or API fails
    console.error(error);  // Debug: Log the error
  }
}

// Function to display weather data on the page
function displayWeather(data) {
  const cityName = data.name;  // City name
  const temperature = data.main.temp;  // Temperature in Celsius
  const weatherDescription = data.weather[0].description;  // Weather description

  // Display the weather information
  document.getElementById('cityName').textContent = `Weather in ${cityName}`;
  document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
  document.getElementById('weatherDescription').textContent = `Description: ${weatherDescription}`;
}
