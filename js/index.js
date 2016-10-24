$(document).ready(function () {
    var latitude = 21.0384124;
    var longitude = 105.81341019999999;
    var unit = 'c';

    var getWeather = function () {
        getLocation();
        return $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather',
            data: {
                'appid': 'fafd204bfa49f4bad143a808197cca38',
                'lat': latitude,
                'lon': longitude,
                'units': 'metric'
            },
            dataType: 'json'
        });
    }

    var setWeather = function (data) {
        if (data.cod == 200) {
            var temperature = Math.round(data.main.temp);
            if (unit == 'f') {
                temperature = Math.round(temperature * 9 / 5 + 32);
                $('.unit').text('F');
                $('.temperature').text(temperature.toString());
            } else {
                $('.unit').text('C');
                $('.temperature').text(temperature.toString());
            }
            $('.city').text(data.name + ",");
            $('.country').text(data.sys.country);
            $('.weatherDetail').text(data.weather[0].description);
            $('.humidity').text(data.main.humidity);
            $('.cloud').text(data.clouds.all);
            $('.wind').text(data.wind.speed);
        } else if (data.cod == 404) {
            alert("Location not found! Refine search or try again.");
        }
    }


    var getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
            });
        }
        else {
            alert("Sorry, your browser does not support geolocation!");
        }
    }
    $('.cel').on('click', function () {
        unit = 'c';
        getWeather().done(setWeather);
    });

    $('.fahr').on('click', function () {
        unit = 'f';
        getWeather().done(setWeather);
    });

    $('.cel').trigger('click');
});