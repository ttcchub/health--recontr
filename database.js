const mongoose = require("mongoose");


// Connecting to DB 
//The require ('mongoose') call above returns a Singleton object.
// It means that the first time you call require ('mogoosee') , it
// is creating an istance of the Mogoose class and returnung it 
// On susequent calls , it will return the dame instance that was
// created and returned to you the first time because of how modile import  / export workds in ES6

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://lyudik:Dfhbfyn890DB@cluster0.cxc7v5m.mongodb.net/?retryWrites=true&w=majority")
        
    
        .then(() => {
            console.log("                        💾  Database ... Connected successful ");
        })
        .catch((err) => {
            console.log("Database ... ERROR 🍉 " + err);
        })
    }
}

module.exports = new Database();