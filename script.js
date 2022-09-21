async function fetchWeather(city) {
  const test = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=541da328e8394c4795b3e30a29601350&lang=sv&days=6&city=${city}`
  );
  const result = await test.json();
  return result;
}

async function fetchWeatherCurrent(city) {
  const test = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=541da328e8394c4795b3e30a29601350&lang=sv&days=6&city=${city}`
  );
  const result = await test.json();
  return result;
}

function search() {
  fetchWeather(document.querySelector(".search-engine").value).then((data) => {
    weather.displayWeather(data);
    weather.daily(data);
  });
}

function searchCurrent() {
  fetchWeatherCurrent(document.querySelector(".search-engine").value).then(
    (data) => {
      weather.displayWeather(data);
      weather.daily(data);
    }
  );
}
let weather = {
  displayWeather: function (data) {
    let result = data.data[0];
    document.querySelector(".stad").innerText = "Väder i " + data.city_name;
    document.querySelector(
      ".icon"
    ).src = `https://www.weatherbit.io/static/img/icons/${result.weather.icon}.png`;
    document.querySelector(".beskrivning").innerText =
      result.weather.description;
    document.querySelector(".temp").innerText = result.temp + "°C";
    document.querySelector(
      ".tidzon"
    ).innerText = `Vindriktning: ${result.wind_cdir_full}`;
    document.querySelector(
      ".vind"
    ).innerText = `Vindstyrka: ${result.wind_spd} km/h`;
    document.querySelector(".luft").innerText = `Luftfuktighet ${result.rh} %`;
    document.querySelector(".solupp").innerText = `${result.valid_date}`;
    document.querySelector(
      ".solned"
    ).innerText = `Risk för snö   ${result.snow} %`;
    $(".weather").removeClass("loading");
  },
  daily: function (data) {
    {
      document.querySelector(".dagett").innerText = data.data[1].datetime;
      document.querySelector(".dag1temp").innerText =
        data.data[1].weather.description;
      document.querySelector(".tempett").innerText = data.data[1].temp + "°C";

      ///
      document.querySelector(".dagentvo").innerText = data.data[2].datetime;
      document.querySelector(".dagtvo").innerText =
        data.data[2].weather.description;
      document.querySelector(".temptvo").innerText = data.data[2].temp + "°C";
      ///
      document.querySelector(".dagentre").innerText = data.data[3].datetime;
      document.querySelector(".tredagen").innerText =
        data.data[3].weather.description;
      document.querySelector(".temptre").innerText = data.data[3].temp + "°C";
      ///
      document.querySelector(".dagfyra").innerText = data.data[4].datetime;
      document.querySelector(".dagenfyra").innerText =
        data.data[4].weather.description;
      document.querySelector(".tempfyra").innerText = data.data[4].temp + "°C";
      ///
      document.querySelector(".dagfem").innerText = data.data[5].datetime;
      document.querySelector(".dagenfem").innerText =
        data.data[5].weather.description;
      document.querySelector(".tempfem").innerText = data.data[5].temp + "°C";

      $.each($(".ikondesk"), function (index) {
        $el = $(this);
        $el.attr(
          "src",
          `https://www.weatherbit.io/static/img/icons/${data.data[index].weather.icon}.png`
        );
      });
    }
  },
};
document
  .querySelector(".search button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    search();
  });
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key == "Enter") {
      search();
    }
  });
