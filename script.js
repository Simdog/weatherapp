var dInput = $("#displayInput");
var putaway = $(".putaway");
putaway.hide();
dInput.hide();
var d = new Date();
var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
// formatDate('yy/mm/dd', new Date());
$("#cityName").append(strDate);



function weatherApp () {
    $("#displayInput").show();
    putaway.show();

    // event.preventDefault();
    // $("#displayInfo").empty();

    var city = $("#searchInput").val();
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&appid=84195ee828661450717285da2a13ecae"


    $.ajax({

        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var name = response.name;

            // this is where the city names are being appended
            var imgSource = "http://openweathermap.org/img/wn/"+ response.weather[0].icon + "@2x.png"
            $("#weatherIcon").attr("src", imgSource);

            console.log(response.weather[0].icon);
             $("#cityName").html(name);
            $("#cityName").append(" (" + strDate + ")");
            
            var list = $("#listInput");  
            var p = $("<p>").addClass("newlist");
            p.html(name);
            p.attr("data-name", name);
            p.on("click", function(e){
                var newAttr = $(this).attr("data-name");
                $("#searchInput").val(newAttr);
                console.log(newAttr, "ciaciaciacia");



                buildForecast();
                weatherApp();
                

            });

            var itsThere =  false;

            $("#listInput").children('p').each(function () {

                if ( $(this).attr("data-name") == p.attr("data-name")){
                    itsThere = true;
                    

                     }
                
                
            });
            

            if ( !itsThere) {
                list.append(p);
            }


          
            
            var wind = (response.wind.speed);
            $("#wind").html("Wind Speed: " + wind + "MPH");
            var humidity = (response.main.humidity);
            $("#humidity").html("Humidity: " + humidity + "%");
            var temp = (response.main.temp);
            var convTemp = (tempConvert(temp));
            $("#temperature").html("Temperature: " + convTemp + "°F");


            var uv1 = response.coord.lat;
            var uv2 = response.coord.lon;
            uvIndex(uv1, uv2);
            
        });

};



function uvIndex(uv1, uv2) {
    console.log(uv1 + "uv1");
    console.log(uv2)
    var setUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=84195ee828661450717285da2a13ecae&lat=" + uv1 +  "&lon=" + uv2 
    $.ajax({

        url: setUrl,
        method: "GET"
    })
        .then(function (index) {
            console.log(index.value);
            var uIndex = (index.value);
            $("#indexUV").html("UV Index: "+ "<a>" + uIndex);

            // UVindex coloring
            if (uIndex <= 2) {
                $("a").addClass("green");
            } else if (  uIndex <= 5 ) {
                $("a").addClass("yellow");

            } else if ( uIndex <= 8  ) {
                $("a").addClass("orange");


            } else if ( uIndex >= 8) {
                $("a").addClass("red");


            };

        });


    
}

// on click listeners
$("#searchBtn").on("click", buildForecast);
$("#searchBtn").on("click", weatherApp);
// function for forecast
function buildForecast (event) {
    if (event) {
        event.preventDefault();
    }

    var input = $("#searchInput").val();
newURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=84195ee828661450717285da2a13ecae"
$.ajax({

    url: newURL,
    method: "GET"
})
    .then(function (forecast) {
 
    for (var i = 0; i < 40; i++ ) {
        
        if (i % 8 === 0) {
            var imgSource = "http://openweathermap.org/img/wn/"+ forecast.list[i].weather[0].icon + "@2x.png"
            
            $("#img-"+ i).attr('src', imgSource);
            var temp = forecast.list[i].main.temp;
            var humidity = forecast.list[i].main.humidity;
            var date = forecast.list[i].dt_txt;
            var newDate = (date.substr(0,10));
            var newTemp = tempConvert(temp);

            $(".temp-"+i).html("Temperature: " +newTemp + "°F");
            $(".humid-"+i).html("Humidity: " + humidity);
            $(".date-" + i).html(newDate);

            
        }

    }
        
    });

    
}

// This is where im converting the temperature to farenheight
function tempConvert (valNum) {
    var celsius = valNum - 273.15;
    var faren = Math.floor(celsius *(9/5) + 32);
    valNum = parseFloat(valNum);

    return(faren);
    
  }



  $(document).ready(function(){
    if(localStorage.getItem("inputvalue")){
     localStorage.getItem("inputvalue");
      $('#searchInput').val(localStorage.getItem("inputvalue"));
      weatherApp();
      buildForecast();
    }
    
    $('#searchBtn').on('click', function() {
    localStorage.setItem("inputvalue", $('#searchInput').val());
    $('#searchInput').text(localStorage.getItem("inputvalue"));
});
    
  });

 