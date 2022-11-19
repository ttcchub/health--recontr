const express = require('express');
const app = express();
const router = express.Router();
// we need bodyParser to get information fro 'req.body' 
const bodyParser = require("body-parser") 
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema')



app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));


// getting data from input
router.get("/", (req, res, next) => {
    
    res.status(200).render("login");
})

// posting data to server from input
router.post("/", async(req, res, next) => {

    let payload = req.body;

    if (req.body.logUsername && req.body.logPassword) {
            let user = await User.findOne({
                $or: [ // execute condition checking Username OR Email similarity and existance in database
                    {username: req.body.logUsername},
                    {email: req.body.logUsername}
                ]
            })
            .catch((error) => {
                console.log(error); // if something goes wrong during Log in
                payload.errorMessage = "Something went wrong";
                res.status(200).render("login", payload);
            });

            //QuickCheck of user in databsae
            if(user != null){
                let result = await bcrypt.compare(req.body.logPassword, user.password)
                //Comparing entered password and encrypted from DB
                if(result === true){
                    req.session.user = user;
                    return res.redirect("/");
                }
            }
            // if something goes wrong during Log in
            payload.errorMessage = "Login credentials incorrect";
            return res.status(200).render("login", payload);
        }
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("login");
})
module.exports = router;