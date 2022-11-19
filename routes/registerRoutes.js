const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const User = require('../schemas/UserSchema')
const bcrypt = require("bcrypt");


app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {

    res.status(200).render("register");
})

router.post("/", async (req, res, next) => {

    let firstName = req.body.firstName.trim();
    let lastName = req.body.lastName.trim();
    let username = req.body.username.trim();
    let email = req.body.email.trim();
    let password = req.body.password;

    let payload = req.body;

    if(firstName && lastName && username && email && password) {
        //query searching same username & email in data
        let user = await User.findOne({
            $or: [ // execute condition checking Username OR Email similarity and existance in database
                {username: username },
                {email: email }
            ]
        })

        .catch ((error)=>{
            console.log(error);

            payload.errorMessage = "Something went wrong";
            res.status(200).render("register", payload);
        });

        console.log (user);
        console.log("Async Proceeded"); // after previous await async function will jump to current line 
        if(user == null) {
            // No user found
            let data = req.body;


            data.password = await bcrypt.hash(password, 12) // hashing part / depends on the number -> the time of process it will take computer gpu also 

            //inserting data
            User.create(data)
            .then((user)=>{
                req.session.user = user; // setting session right here
                return res.redirect("/") // redirecting succesful session to the home page
            })
        } 
        else {
            // User found
            if (email == user.email) {
                payload.errorMessage = "Email already in use.";
            }
            else {
                payload.errorMessage = "Username already in use.";
        } 
            res.status(200).render("register", payload);
            payload.errorMessage = "Make sure each field has a valid value.";
            res.status(200).render("register", payload);
        }
    }
})

module.exports = router;