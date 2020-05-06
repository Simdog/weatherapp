var dInput = $("#displayInput")
dInput.hide();


$("#searchBtn").on("click", function (event) {
    $("#displayInput").show();




    event.preventDefault();


    var city = $("#searchInput").val();
    console.log(city);
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&appid=84195ee828661450717285da2a13ecae"
    $.ajax({

        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log("hi");
            console.log(response);
            var name = response.name;
            console.log(name);
            $("#cityName").html(name);
            console.log(response.wind.speed + "this i wind speed");
            var wind = (response.wind.speed);
            $("#wind").prepend("Wind Speed: " + wind);
            console.log(response.main.humidity + "this is humidity");
            var humidity = (response.main.humidity);
            $("#humidity").prepend("Humidity: " + humidity);
            console.log(response.main.temp + "this is temperature kelvin");
            var temp = (response.main.temp);
            var convTemp = (tempConvert(temp));
            $("#temperature").prepend("Temperature: " + convTemp);



            console.log(tempConvert(temp) + " this is temp convert");
            




  


        });


});


function tempConvert (valNum) {
    var celsius = valNum - 273.15;
    var faren = Math.floor(celsius *(9/5) + 32);
    console.log("the temperature is " + faren + "degrees farenheight");
    console.log(valNum + "this is val num");
    valNum = parseFloat(valNum);

    return(faren);
    
  }