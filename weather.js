function $(id) {
    return document.getElementById(id);
}

function getPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                let data = {
                    latitude: latitude,
                    longitude: longitude
                }
                resolve(data)
            }, function () {
                reject(arguments)
            })
        } else {
            reject('你的浏览器不支持当前地理位置信息获取')
        }
    })
}

getPosition().then(result => {
    // 返回结果示例：
    // {latitude: 30.318030999999998, longitude: 120.05561639999999}
    let queryData = {// 小数点后取六位即可
        longtitude: String(result.longitude).match(/\d+\.\d{0,6}/)[0],
        latitude: String(result.latitude).match(/\d+\.\d{0,6}/)[0],
        channelType: '00'
    }
    console.log(queryData)
    // 获取坐标后要执行的代码
    var local = new XMLHttpRequest();//获取经纬度
    var citycode = 0;
    local.open("GET", "https://restapi.amap.com/v3/geocode/regeo?output=json&location=" + queryData.longtitude
        + "," + queryData.latitude + "&key=426a8679df9b936e1d16c5e799601f82&radius=1000&extensions=all&regeocodes"
        , true);
    local.onreadystatechange = function () {
        if (local.readyState == 4 && local.status == 200) {
            $('weather_wrap').innerHTML = `
                    <table id="weather_inner">
                        <tr>
                            <td id="city"><img id="location" alt="城市"><span id="location_cnt"></span></td>
                            <td id="weather"><img id="weather_img" alt="天气"><span id="weather_cnt"></span></td>
                            <td id="temperature"><img id="temperature_img" alt="温度"><span id="temperature_cnt"></span></td>
                            <td id="humidity"><img id="humidity_img" alt="湿度"><span id="humidity_cnt"></span></td>
                            <td id="wind"><img id="wind_img" alt="风"><span id="wind_cnt"></span></td>
                        </tr>
                    </table>
            `;
            var adcode = JSON.parse(this.responseText);
            console.log(adcode);
            console.log(adcode["regeocode"]["addressComponent"]["adcode"])//json对象嵌套查询示例，返回当前城市code
            console.log("" + adcode["regeocode"]["addressComponent"]["city"] +
                adcode["regeocode"]["addressComponent"]["district"]);//返回当前城市以及县区名
            $("location_cnt").innerHTML = "" + adcode["regeocode"]["addressComponent"]["city"] +
                adcode["regeocode"]["addressComponent"]["district"];

            var weather = new XMLHttpRequest();//下面获取当前定位的天气信息
            weather.open("GET", "https://restapi.amap.com/v3/weather/weatherInfo?city=" + adcode["regeocode"]["addressComponent"]["adcode"] + "&key=426a8679df9b936e1d16c5e799601f82", true);
            weather.onreadystatechange = function () {
                if (weather.readyState == 4 && weather.status == 200) {
                    var weather_Data = JSON.parse(this.responseText);
                    console.log(weather_Data);//天气信息的json对象
                    console.log(weather_Data["lives"]["0"]);// 最直接的含有天气信息的对象
                    $("weather_cnt").innerHTML = weather_Data["lives"]["0"]["weather"];
                    $("temperature_cnt").innerHTML = "" + weather_Data["lives"]["0"]["temperature"] + "℃";
                    $("humidity_cnt").innerHTML = "" + weather_Data["lives"]["0"]["humidity"] + "%";
                    $("wind_cnt").innerHTML = weather_Data["lives"]["0"]["winddirection"] + "风  风力" + weather_Data["lives"]["0"]["windpower"] + "级";
                    $("location").setAttribute("src", "./img_weather/location.png");
                    $("temperature_img").setAttribute("src", "./img_weather/temperature.png");
                    $("humidity_img").setAttribute("src", "./img_weather/humidity.png");
                    $("wind_img").setAttribute("src", "./img_weather/wind.png");
                    if (weather_Data["lives"]["0"]["weather"].indexOf("阴") != -1) {
                        $("weather_img").setAttribute("src", "./img_weather/cloudy.png");
                    }
                    if (weather_Data["lives"]["0"]["weather"] == "晴") {
                        $("weather_img").setAttribute("src", "./img_weather/sunny.png");
                    }
                    if (weather_Data["lives"]["0"]["weather"].indexOf("多云") != -1) {
                        $("weather_img").setAttribute("src", "./img_weather/overcast.png");
                    }
                    if (weather_Data["lives"]["0"]["weather"].indexOf("雨") != -1) {
                        $("weather_img").setAttribute("src", "./img_weather/rainy.png");
                    }
                    if (weather_Data["lives"]["0"]["weather"].indexOf("雪") != -1) {
                        $("weather_img").setAttribute("src", "./img_weather/snowy.png");
                    }
                    if (weather_Data["lives"]["0"]["weather"].indexOf("霾") != -1) {
                        $("weather_img").setAttribute("src", "./img_weather/haze.png");
                    }
                }
            }
            weather.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            weather.send();
        }
    }
    local.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    local.send();

}).catch(err => {
    console.log(err)
})