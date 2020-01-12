const express=require("express")
const app=express()
const modules=require("./config/database");
const mongoose=require('mongoose')
const location =require("./mongo")
const fetch =require('node-fetch')

app.listen(3000,()=>{
    console.log("connected successfully")
})

app.use(express.static('public'))
app.use(express.json({limit:'1mb'}))
// app.post('/api',async (req,res)=>{
//     console.log(req.body);
//     res.json({
//         status:"success"
//     });
//     const loca=new location({
//         latitude:req.body.lat,
//         longitude:req.body.lon,
//         name:req.body.lol
//     }).save().then(res=>console.log(res))

// })
app.get('/weather/:latlon/:text',async (req,res)=>{
    const hello=req.params.latlon.split(',');
    const lat=hello[0];
    const long=hello[1];
    const text=req.params.text
    console.log(text)
    
    
    const api_url=await fetch(`https://api.darksky.net/forecast/3bc0db978e12a1a19d71a2df505bf448/${lat},${long}`)
    const response=await api_url.json()
    
    const weather_url=await fetch(`https://api.openaq.org/v1/latest?coordinates=${lat},${long}`)
    const resp=await weather_url.json()
    
    console.log(lat,long)
    const places=await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=90000&type=${text}&keyword=cruise&key=AIzaSyCTxTEtCEvFOAYTLO0BGrJ9NjPbOw8stQw`)
    const ress=await places.json()
    console.log(ress)
    

    const data={
        weather:response,
        air:resp,
        places:ress
    }
    
    res.json(data);

    
})

// app.get('/api1',async (req,res)=>{
// const hell=await location.find({})
// console.log(hell)
// res.send(hell)
// })

mongoose.connect(modules.database);
mongoose.connection.on("connected",()=>{
    console.log("successfully connected ");
})