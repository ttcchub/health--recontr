const express = require('express');
const app = express();
const router = express.Router();
// we need bodyParser to get information fro 'req.body' 
const bodyParser = require("body-parser") 
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema')




app.use(bodyParser.urlencoded({ extended: false }));


// getting data from input
router.get("/", (req, res, next) => {

    if(req.session){ // proceed destroying current session and throwing on log in page
        req.session.destroy(()=> {
            res.redirect("/login");
        })
    }
})

module.exports = router;