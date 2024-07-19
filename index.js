import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app=express();
const port=3000;
let Category;
let Language;
let String;
let AmountOfJoke;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.render("index.ejs");
});
let apiLink=`https://v2.jokeapi.dev/joke/${Category}`;
app.post('/',async(req,res)=>{
    try {
        Category=req.body.Category;
        Language=req.body.lang;
        String=req.body.String;
        AmountOfJoke=req.body.Aoj;
        if(Language){
            apiLink=`https://v2.jokeapi.dev/joke/${Category}?lang=${Language}`;
        }
        if(String){
            apiLink=`https://v2.jokeapi.dev/joke/${Category}?lang=${Language}&contains=${String}`;
        }
        if(AmountOfJoke){
            apiLink=`https://v2.jokeapi.dev/joke/${Category}?lang=${Language}&contains=${String}&amount=${AmountOfJoke}`;
        }
        const response=await axios.get(apiLink);
        res.render("index.ejs",{co: response.data});
    } catch (error) {
        console.log(error.response.data);
    }
})
app.listen(port);