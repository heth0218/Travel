const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Heth=new Schema({
    latitude:Number,
    longitude:Number,
    name:String
})

const Hell=mongoose.model('location',Heth);

module.exports=Hell;