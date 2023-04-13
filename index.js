const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
    const cityName = req.body.cityName;
    const apiKey = "60615f5dbfcbfd6dee7bdbd2bbc66e78";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units=" + unit;
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = " https://openweathermap.org/img/wn/"+ icon + "@2x.png";
            res.write("<h1>The temp in "+ cityName + " is " +temp+ " degree celsius.</h1>");
            res.write("<h3>The description is: " + desc+ ".</h3>");
            res.write("<img src = " + iconUrl + ">");
            res.send();
            console.log(weatherData);
        });
    });
});
app.listen(3000, function(){
    console.log("server running on port 3000");;
});