var map;
$(document).ready(function () {
    $(':input').change(function () {
        $(this).val($(this).val().trim());
    });
    $("#myform").validate({
        rules: {
            StreetAddress: {
                required: true
            },

            city: {
                required: true

            },
            state: {
                notEqualTo: true
            }


        },
        messages: {
            StreetAddress: {
                required: 'Please enter the Street Address'
            },
            city: {
                required: 'Please enter the city'
            },
            state: {
                notEqualTo: 'Please select a state'
            }


        },
        submitHandler: function (form) {
            sub();
        },



    });
    $.validator.addMethod('notEqualTo', function (value, element) {
        return value != 'select';
    });


});

var json;
var staddress;
var v_city;
var v_state;
var v_degree;


function fb() {
    var image;
    if (json['currently']['icon'] == "partly-cloudy-day") {
        image = "cloud_day.png";
    } else if (json['currently']['icon'] == "partly-cloudy-night") {
        image = "cloud_night.png";
    } else if (json['currently']['icon'] == "clear-day") {
        image = "clear.png";
    } else if (json['currently']['icon'] == "clear-night") {
        image = "clear_night.png";
    } else if (json['currently']['icon'] == "rain") {
        image = "rain.png";
    } else if (json['currently']['icon'] == "snow") {
        image = "snow.png";
    } else if (json['currently']['icon'] == "sleet") {
        image = "sleet.png";
    } else if (json['currently']['icon'] == "wind") {
        image = "wind.png";
    } else if (json['currently']['icon'] == "fog") {
        image = "fog.png";
    } else if (json['currently']['icon'] == "cloudy") {
        image = "cloudy.png";
    } else {
        image = "";
    }

    if (v_degree == "Fahrenheit") {
        deg = "&deg;F";
    } else {
        deg = "&deg;C";
    }

    FB.ui({
        method: 'feed',
        link: 'http://forcast.io',
        caption: 'WEATHER INFORMATION FROM FORECAST.IO',
        picture: 'http://cs-server.usc.edu:45678/hw/hw8/images/' + image,
        name: 'Current Weather in ' + v_city + ',' + v_state,
        description: json['currently']['summary'] + ', ' + Math.round(json['currently']['temperature']) + deg,
    }, function (response) {
        if (response && response.post_id) {
            alert("Posted Successfully");
        } else {
            alert("Not Posted");
        }
    });
}


function sub() {

    staddress = document.myform.StreetAddress.value;
    v_city = document.myform.city.value;
    v_state = document.myform.state.value;
    v_degree = document.myform.degree.value;

    $.ajax({
        url: 'http://amweb-env.elasticbeanstalk.com/',
        //	this is	the	parameter	list
        data: {
            StreetAddress: staddress,
            city: v_city,
            state: v_state,
            degree: v_degree
        },
        type: 'GET',
        crossDomain: true,
        success: function (response) {

            json = JSON.parse(response);
            time_zone = json['timezone'];

            $("#tabsdiv").css('visibility', 'visible');

            if (json['currently']['icon'] == "partly-cloudy-day") {
                image = "cloud_day.png";
            } else if (json['currently']['icon'] == "partly-cloudy-night") {
                image = "cloud_night.png";
            } else if (json['currently']['icon'] == "clear-day") {
                image = "clear.png";
            } else if (json['currently']['icon'] == "clear-night") {
                image = "clear_night.png";
            } else if (json['currently']['icon'] == "rain") {
                image = "rain.png";
            } else if (json['currently']['icon'] == "snow") {
                image = "snow.png";
            } else if (json['currently']['icon'] == "sleet") {
                image = "sleet.png";
            } else if (json['currently']['icon'] == "wind") {
                image = "wind.png";
            } else if (json['currently']['icon'] == "fog") {
                image = "fog.png";
            } else if (json['currently']['icon'] == "cloudy") {
                image = "cloudy.png";
            } else {
                image = "";
            }


            document.getElementById("icon").innerHTML = '<center><img src=http://cs-server.usc.edu:45678/hw/hw8/images/' + image + ' alt=' + json['currently']['icon'] + ' title=' + json['currently']['icon'] + ' width="130px" height="130px"></center>';

            document.getElementById("summary").innerHTML = json['currently']['summary'] + " in " + v_city + "," + v_state;

            if (v_degree == "Fahrenheit") {
                document.getElementById("temp").innerHTML = Math.round(json['currently']['temperature']) + '<span style="font-size:20px; position: relative;bottom: 20px;">&deg; F</style>';
            } else {
                document.getElementById("temp").innerHTML = Math.round(json['currently']['temperature']) + '<span style="font-size:20px; position: relative;bottom: 20px;">&deg; C</style>';
            }

            image = "http://cs-server.usc.edu:45678/hw/hw8/images/fb_icon.png";
            document.getElementById("hl").innerHTML = '<span style="color:blue;">L: ' + Math.round(json.daily.data[0].temperatureMin) + '&deg;' + '<span> |<span style="color:green;"> H: ' + Math.round(json.daily.data[0].temperatureMax) + '&deg; </span ><img src=' + image + ' alt="fb icon" width="30px" height="30px" style="float:right;" onClick="fb()">';


            if (json['currently']['precipIntensity'] >= 0 && json['currently']['precipIntensity'] < 0.002) {
                precip = "None";
            } else if (json['currently']['precipIntensity'] >= 0.002 && json['currently']['precipIntensity'] < 0.017) {
                precip = "Very Light";
            } else if (json['currently']['precipIntensity'] >= 0.017 && json['currently']['precipIntensity'] < 0.1) {
                precip = "Light";
            } else if (json['currently']['precipIntensity'] >= 0.1 && json['currently']['precipIntensity'] < 0.4) {
                precip = "Moderate";
            } else if (json['currently']['precipIntensity'] >= 0.4) {
                precip = "Light";
            }

            document.getElementById("prec").innerHTML = precip;

            document.getElementById("rain").innerHTML = Math.round(json['currently']['precipProbability'] * 100) + "%";

            if (v_degree == "Fahrenheit") {
                document.getElementById("ws").innerHTML = json['currently']['windSpeed'] + " mph";
            } else {
                document.getElementById("ws").innerHTML = json['currently']['windSpeed'] + " m/s";
            }

            if (v_degree == "Fahrenheit") {
                document.getElementById("dp").innerHTML = json['currently']['dewPoint'] + "&deg; F";
            } else {
                document.getElementById("dp").innerHTML = json['currently']['dewPoint'] + "&deg; C";
            }

            document.getElementById("hum").innerHTML = Math.round(json['currently']['humidity'] * 100) + "%";

            if (v_degree == "Fahrenheit") {
                document.getElementById("vis").innerHTML = (json['currently']['visibility']).toFixed(2) + " mi";
            } else {
                document.getElementById("vis").innerHTML = (json['currently']['visibility']).toFixed(2) + " km";
            }

            var r_time = moment.tz((json.daily.data[0].sunriseTime * 1000), time_zone).format("hh:mm A");




            document.getElementById("sr").innerHTML = r_time;
            var s_time = moment.tz((json['daily']['data'][0]['sunsetTime'] * 1000), time_zone).format("hh:mm A");


            document.getElementById("ss").innerHTML = s_time;

            init();

            if (v_degree == "Fahrenheit") {
                document.getElementById("tabhead").innerHTML = "Temp(&deg;F)";
            } else {
                document.getElementById("tabhead").innerHTML = "Temp(&deg;C)";
            }

            var table = document.getElementById("myTable");
            table.innerHTML = "";

            for (var i = 0; i < 24; i++) {

                table.innerHTML += '<tr id="row' + i + '"></tr><tr><td colspan="5"><div id="cdiv' + i + '" style="background-color:#F5F5F5; padding=10px; width=500px;" class="container-fluid"></div></td></tr>'
                document.getElementById("row" + i).innerHTML = '<td id="col1' + i + '"></td><td id="col2' + i + '"></td><td id="col3' + i + '"></td><td id="col4' + i + '"></td><td id="col5' + i + '"></td>'


                var cell1 = document.getElementById("col1" + i);
                var cell2 = document.getElementById("col2" + i);
                var cell3 = document.getElementById("col3" + i);
                var cell4 = document.getElementById("col4" + i);
                var cell5 = document.getElementById("col5" + i);

                var h_time = moment.tz((json['hourly']['data'][i]['time'] * 1000), time_zone).format("hh:mm A");


                cell1.innerHTML = h_time;

                if (json['hourly']['data'][i]['icon'] == "partly-cloudy-day") {
                    image = "cloud_day.png";
                } else if (json['hourly']['data'][i]['icon'] == "partly-cloudy-night") {
                    image = "cloud_night.png";
                } else if (json['hourly']['data'][i]['icon'] == "clear-day") {
                    image = "clear.png";
                } else if (json['hourly']['data'][i]['icon'] == "clear-night") {
                    image = "clear_night.png";
                } else if (json['hourly']['data'][i]['icon'] == "rain") {
                    image = "rain.png";
                } else if (json['hourly']['data'][i]['icon'] == "snow") {
                    image = "snow.png";
                } else if (json['hourly']['data'][i]['icon'] == "sleet") {
                    image = "sleet.png";
                } else if (json['hourly']['data'][i]['icon'] == "wind") {
                    image = "wind.png";
                } else if (json['hourly']['data'][i]['icon'] == "fog") {
                    image = "fog.png";
                } else if (json['hourly']['data'][i]['icon'] == "cloudy") {
                    image = "cloudy.png";
                } else {
                    image = "";
                }

                cell2.innerHTML = '<img src=http://cs-server.usc.edu:45678/hw/hw8/images/' + image + ' alt=' + json['hourly']['data'][i]['icon'] + ' title=' + json['hourly']['data'][i]['icon'] + ' width="50px" height="50px" >';
                cell3.innerHTML = Math.round(json['hourly']['data'][i]['cloudCover'] * 100) + "%";
                cell4.innerHTML = json['hourly']['data'][i]['temperature'];
                if (v_degree == "Fahrenheit") {
                    cell5.innerHTML = '<button type= " button " class= " btn btn-default" onclick="blur()" style="border:none;" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '" ><span class= " glyphicon glyphicon-plus" aria-hidden= " true " style="color:blue"></span></button>';
                } else {
                    cell5.innerHTML = '<button type= " button " class= "btn btn-default" onclick="blur()" style="border:none;" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '" ><span class= " glyphicon glyphicon-plus" aria-hidden= " true " style="color:blue" ></span></button>';

                }


            }
            for (var i = 0; i < 24; i++) {
                if (v_degree == "Fahrenheit") {
                    document.getElementById("cdiv" + i).innerHTML = '<div class="collapse" id="collapse' + i + '" class="container-fluid" ><div class="table-responsive" style="margin-top:10px;"><table class="table" style=" text-align:center;"><tr><th  style=" text-align:center;">Wind</th><th  style=" text-align:center;">Humidity</th><th  style=" text-align:center;">Visibility</th><th  style=" text-align:center;">Pressure</th></tr><tr style="background-color:#F5F5F5;"><td>' + json['hourly']['data'][i]['windSpeed'] + ' mph</td><td>' + Math.round(json['hourly']['data'][i]['humidity'] * 100) + '%</td><td>' + json['hourly']['data'][i]['visibility'].toFixed(2) + ' mi</td><td>' + json['hourly']['data'][i]['pressure'] + ' mb</td></tr></table></div></div>';
                } else {
                    document.getElementById("cdiv" + i).innerHTML = '<div class="collapse" id="collapse' + i + '" class="container-fluid" ><div class="table-responsive" style="margin-top:10px;"><table class="table" style=" text-align:center;"><tr><th  style=" text-align:center;">Wind</th><th  style=" text-align:center;">Humidity</th><th  style=" text-align:center;">Visibility</th><th  style=" text-align:center;">Pressure</th></tr><tr style="background-color:#F5F5F5;"><td>' + json['hourly']['data'][i]['windSpeed'] + ' m/s</td><td>' + Math.round(json['hourly']['data'][i]['humidity'] * 100) + '%</td><td>' + json['hourly']['data'][i]['visibility'].toFixed(2) + ' km</td><td>' + json['hourly']['data'][i]['pressure'] + ' hPa</td></tr></table></div></div>';
                }
            }
            var str = "";
            var date;
            var dayOfWeek;
            var month;
            var icon;
            var r_date;
            var r_hours;
            var r_minutes;
            var r_ampm;
            var s_date;
            var s_hours;
            var s_minutes;
            var s_ampm;
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var color = ['#337db5', '#ed413e', '#E68d49', '#a6a42e', '#966da6', '#f57d7d', '#cf426f'];
            for (var j = 1; j <= 7; j++) {

                date = new Date(json['daily']['data'][j]['time'] * 1000);

                dayOfWeek = days[date.getDay()]
                month = months[date.getMonth()];
                if (json['daily']['data'][j]['icon'] == "partly-cloudy-day") {
                    image = "cloud_day.png";
                } else if (json['daily']['data'][j]['icon'] == "partly-cloudy-night") {
                    image = "cloud_night.png";
                } else if (json['daily']['data'][j]['icon'] == "clear-day") {
                    image = "clear.png";
                } else if (json['daily']['data'][j]['icon'] == "clear-night") {
                    image = "clear_night.png";
                } else if (json['daily']['data'][j]['icon'] == "rain") {
                    image = "rain.png";
                } else if (json['daily']['data'][j]['icon'] == "snow") {
                    image = "snow.png";
                } else if (json['daily']['data'][j]['icon'] == "sleet") {
                    image = "sleet.png";
                } else if (json['daily']['data'][j]['icon'] == "wind") {
                    image = "wind.png";
                } else if (json['daily']['data'][j]['icon'] == "fog") {
                    image = "fog.png";
                } else if (json['daily']['data'][j]['icon'] == "cloudy") {
                    image = "cloudy.png";
                } else {
                    image = "";
                }

                icon = '<img src=http://cs-server.usc.edu:45678/hw/hw8/images/' + image + ' alt=' + json['daily']['data'][j]['icon'] + ' title=' + json['daily']['data'][j]['icon'] + ' width="50px" height="50px" >';

                var rd_time = moment.tz((json['daily']['data'][j]['sunriseTime'] * 1000), time_zone).format("hh:mm A");

                var sd_time = moment.tz((json['daily']['data'][j]['sunsetTime'] * 1000), time_zone).format("hh:mm A");


                var vis = "";

                if (json['daily']['data'][j]['visibility'] === undefined) {
                    vis = "N.A.";
                } else {
                    if (v_degree == "Fahrenheit") {
                        vis = json['daily']['data'][j]['visibility'].toFixed(2) + " mi";
                    } else {
                        vis = json['daily']['data'][j]['visibility'].toFixed(2) + " km";
                    }
                }

                //style="background-color:' + color[j - 1] + '; color:white; width:100px; margin:10px; padding:0px;"
                if (v_degree == "Fahrenheit") {
                    str = str + '<button type="button" class="btn btn-info btn-autosize" style="background-color:' + color[j - 1] + '; color:white; margin:10px; padding:0px;" data-toggle="modal" data-target="#myModal' + j + '" ><div text-align="center"><span style="margin-top:0px;">' + dayOfWeek + '</span><br>' + month + ' ' + date.getDate() + '<br><br>' + icon + '<br>Min<br>Temp<br><h3>' + Math.round(json['daily']['data'][j]['temperatureMin']) + '&deg;</h3>Max<br>Temp<br><h3>' + Math.round(json['daily']['data'][j]['temperatureMax']) + '&deg;</h3></div></button><div class="modal fade" id="myModal' + j + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel" align="left">Weather in ' + v_city + ' on ' + month + ' ' + date.getDate() + '</h4></div><div class="modal-body"> <div class="container-fluid"> <div class="row"> <img src=http://cs-server.usc.edu:45678/hw/hw8/images/' + image + ' alt=' + json['daily']['data'][j]['icon'] + ' title=' + json['daily']['data'][j]['icon'] + ' width="200px" height="200px"> </div> <div class="row"> <div class="col-md-12" style="text-align:center; font-size:23px;">' + dayOfWeek + ' : <span style="color:#e68d49;">' + json['daily']['data'][j]['summary'] + '</span></div> </div> <div class="row"> <div class="table-responsive col-md-4 noborder" > <table class="table" style="text-align:center;padding:0px;border: 0px none;"> <tr> <th>Sunrise Time</th> </tr> <tr> <td>' + rd_time + '</td> </tr> </table></div> <div class="table-responsive col-md-4 noborder"> <table class="table" style="text-align:center;padding:0px;border: 0px none;"> <tr> <th>Sunset Time</th> </tr> <tr> <td>' + sd_time + '</td> </tr> </table> </div> <div class="table-responsive col-md-4 noborder"> <table class="table" style="text-align:center;padding:0px; border: 0px none;"> <tr> <th>Humidity</th> </tr> <tr> <td>' + Math.round(json['daily']['data'][j]['humidity'] * 100) + '%</td> </tr> </table> </div> </div> </div> <div class="row"> <div class="table-responsive col-md-4 noborder"> <table class="table" style="text-align:center;padding:0px; border: 0px none;"> <tr> <th>Wind Speed</th> </tr> <tr> <td>' + json['daily']['data'][j]['windSpeed'] + ' mph</td> </tr> </table> </div> <div class="table-responsive col-md-4 noborder"> <table class="table" style="text-align:center;padding:0px; border: 0px none;"> <tr> <th>Visibility</th> </tr> <tr> <td>' + vis + ' </td> </tr> </table> </div> <div class="table-responsive col-md-4 noborder"> <table class="table" style="text-align:center;padding:0px;border: 0px none;"> <tr> <th>Pressure</th> </tr> <tr> <td>' + json['daily']['data'][j]['pressure'] + ' mb</td> </tr> </table> </div> </div> </div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>';
                } else {
                    str = str + '<button type="button" class="btn btn-info btn-autosize" style="background-color:' + color[j - 1] + '; color:white; margin:10px; padding:0px;" data-toggle="modal" data-target="#myModal' + j + '" ><div text-align="center"><span style="margin-top:0px;">' + dayOfWeek + '</span><br>' + month + ' ' + date.getDate() + '<br><br>' + icon + '<br>Min<br>Temp<br><h3>' + Math.round(json['daily']['data'][j]['temperatureMin']) + '&deg;</h3>Max<br>Temp<br><h3>' + Math.round(json['daily']['data'][j]['temperatureMax']) + '&deg;</h3></div></button><div class="modal fade" id="myModal' + j + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel" align="left">Weather in ' + v_city + ' on ' + month + ' ' + date.getDate() + '</h4></div><div class="modal-body"> <div class="container-fluid"> <div class="row"> <img src=http://cs-server.usc.edu:45678/hw/hw8/images/' + image + ' alt=' + json['daily']['data'][j]['icon'] + 'title=' + json['daily']['data'][j]['icon'] + ' width="200px" height="200px"> </div> <div class="row"> <div class="col-md-12" style="text-align:center; font-size:23px;">' + dayOfWeek + ' : <span style="color:#e68d49;">' + json['daily']['data'][j]['summary'] + '</span></div> </div> <div class="row"> <div class="table-responsive col-md-4 noborder" > <table class="table" style="text-align:center;padding:0px;border: 0px none;"> <tr> <th>Sunrise Time</th> </tr> <tr> <td>' + rd_time + '</td> </tr> </table></div> <div class="table-responsive col-md-4 noborder"> <table class="table" style="text-align:center;padding:0px;border: 0px none;"> <tr> <th>Sunset Time</th> </tr> <tr> <td>' + sd_time + '</td> </tr> </table> </div> <div class="table-responsive col-md-4 noborder"> <table class="table" style="text-align:center;padding:0px; border: 0px none;"> <tr> <th>Humidity</th> </tr> <tr> <td>' + Math.round(json['daily']['data'][j]['humidity'] * 100) + '%</td> </tr> </table> </div> </div> </div> <div class="row"> <div class="table-responsive col-md-4 noborder"> <table class="table" style="text-align:center;padding:0px; border: 0px none;"> <tr> <th>Wind Speed</th> </tr> <tr> <td>' + json['daily']['data'][j]['windSpeed'] + ' m/s</td> </tr> </table> </div> <div class="table-responsive col-md-4 noborder"> <table class="table" style="text-align:center;padding:0px; border: 0px none;"> <tr> <th>Visibility</th> </tr> <tr> <td>' + vis + ' </td> </tr> </table> </div> <div class="table-responsive col-md-4 noborder"> <table class="table" style="text-align:center;padding:0px;border: 0px none;"> <tr> <th>Pressure</th> </tr> <tr> <td>' + json['daily']['data'][j]['pressure'] + ' hPa</td> </tr> </table> </div> </div> </div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>';
                }

            }

            document.getElementById("days").innerHTML = str;




        },
        error: function () {
            alert("error");
        }

    });
}


function init() {
    //Center of map

    var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var lonlat = new OpenLayers.LonLat(json['longitude'], json['latitude']).transform(fromProjection, toProjection);;

    if (!map) {
        map = new OpenLayers.Map("mapid");

        var zoom = 9;
        // Create OSM overlays
        var mapnik = new OpenLayers.Layer.OSM();
        var layer_cloud = new OpenLayers.Layer.XYZ(
            "clouds",
            "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png", {
                isBaseLayer: false,
                opacity: 0.7,
                sphericalMercator: true
            }
        );

        var layer_precipitation = new OpenLayers.Layer.XYZ(
            "precipitation",
            "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png", {
                isBaseLayer: false,
                opacity: 0.7,
                sphericalMercator: true
            }
        );


        map.addLayers([mapnik, layer_precipitation, layer_cloud]);
    }
    map.setCenter(lonlat, zoom);

}