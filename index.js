
      function latestDate(now) {
        let time = now.getHours();
        if (time < 10) {
          time = `0${time}`;
        }
        let minutes = now.getMinutes();
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let day = days[now.getDay()];
        return `${day}, ${time}:${minutes}`;
      }
      let now = new Date();
      function showWeather(result) {
        console.log(result.data);
        document.querySelector("#city").innerHTML = result.data.name;
        document.querySelector("#now-temp").innerHTML = Math.round(
          result.data.main.temp
        );
        document.querySelector("#description").innerHTML =
          result.data.weather[0].main;
        document.querySelector("#humidity").innerHTML =
          result.data.main.humidity;
        document.querySelector("#wind").innerHTML = Math.round(
          result.data.wind.speed
        );
      }
      function searchCity(city) {
        let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        axios.get(apiUrl).then(showWeather);
      }
      function updateSubmit(event) {
        event.preventDefault();
        let city = document.querySelector("#search-input").value;

        searchCity(city);
      }
      function updateLocation(position) {
        let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(showWeather);
      }
      function getCurrentLocation(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(updateLocation);
      }
      let date = document.querySelector("#real-date");
      date.innerHTML = latestDate(now);

      let cityName = document.querySelector("#search-form");
      cityName.addEventListener("submit", updateSubmit);

      let currentLocationButton = document.querySelector("#current-location");
      currentLocationButton.addEventListener("click", getCurrentLocation);
      searchCity("Lagos");