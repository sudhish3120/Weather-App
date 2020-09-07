const express=require("express");
const app=express();
const https=require("https");

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
var _ = require('lodash');

app.get("/",function(req, res){
  res.render('openingPage');
});

app.post("/",function(req, res){
  const cityName=req.body.cityName;

  const query=cityName;
  const apiID="a4c7aaeb3dae1ea11bebd19f658da2c9";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiID+ "&units=metric";

if (req.body.button==="Redirect"){
  res.redirect('/'); //go back to get request
} else if (req.body.button==="Redirect-2"){
  res.redirect('/');
} else {
  https.get(url, function(response){
    console.log(response.statusCode);
    if (response.statusCode!='200'){
      res.render('redirect');
    } else {
      response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp = weatherData.main.temp;
        const feelsLike = weatherData.main.feels_like;
        const description=weatherData.weather[0].description;

        res.render('mainPage',{cityName:_.capitalize(cityName), temp:temp, feelsLike:feelsLike, description:description});
      });
    }

  });
}

});

app.listen(3000, function(){
  console.log("server is running on port 3000");
});
