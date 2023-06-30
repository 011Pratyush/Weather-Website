const express = require("express");
const https = require("https");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req,res) {
    console.log(req.body.cityName);

const query = req.body.cityName;
const apikey = "f6dbce7c8c25c6f24df128bc10da7952";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
console.log(query);

https.get(url, function(response) {
    // ye jo response h wo ek JSON language v ka code h
    console.log(response.statusCode);
    // statusCode batata h ki success ye sab

    response.on("data", function(data) {


        // Jo data h wo Hexadecimal me h JSON.prase() krne se wo JSON language me convert hogya
        const weatherData = JSON.parse(data);
        
        // const object = {
        //     name: "Pratyush",
        //     favouriteFood : "Dosa"
        // }
        // to convert jSON to string
        // console.log(JSON.stringify(object));
        // console.log(weatherData);
        
        const temp = weatherData.main.temp;
        const WeatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        
        var d = new Date();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        var time = hour + ":" + minutes;

        res.render("weather", {query1 : query, WeatherDescription1 :WeatherDescription, temp1 : temp , time1 : time});

        // res.write("<p> The weather is currently " + WeatherDescription + "</p>")
        // // send krna hai agr humko 1 se jyada to dono me res.write likh sakte h
        // res.write("<h1> The Temperature in <em>" +  query + "</em> is " + temp + " degrees Celcius. </h1>");
        // res.write("<img src =" + imageURL + ">");
        // res.send();
    })
});
// Do send nhi jaayega
// res.send("Server is running");
})

























app.listen(3000,function() {
    console.log("Server is Running on port 3000");
});