const mongoose = require("mongoose")
const horseSchema = mongoose.Schema({
horsename: {
    type:String,
    required:[true,"Should have to give a name"]
},
habitat: String,
classification: String,
price: {
    type:Number,
    min:[10000,"Horses prices are starting from 10000$"],
    max:[40000,"Horses prices are should not be more than 40000$"]
}
    

})
module.exports = mongoose.model("horse", horseSchema)