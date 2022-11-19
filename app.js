const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware')
const path = require('path')
const bodyParser = require("body-parser")


//Calling Db file for connection
const mongoose = require("./database"); 
const session = require("express-session");
const server = app.listen(port, () => console.log("                   🚀 Launching . . . We currently on PORT: " + port));

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({ //kinda hashing sessions same as with password
    secret: "bbqCrazy", //word that is a key for hasking
    resave: true, //force session to be saved
    saveUninitialized: false // prevents if it wasnt set it still save as initialized 
}))

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logout');
const postRoute = require('./routes/postRoutes');
const profileRoute = require('./routes/profileRoutes');



// Api routes
const postsApiRoute = require('./routes/api/posts');
const usersApiRoute = require('./routes/api/users');


//page
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/posts", middleware.requireLogin, postRoute);
app.use("/profile", middleware.requireLogin, profileRoute);

app.use("/api/posts", postsApiRoute);
app.use("/api/users", usersApiRoute);


app.get("/", middleware.requireLogin, (req, res, next) => {

    //requesting payload and data of user from session for an exact page
    let payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user), // to pass variable  we need to stringify first to pass it between calls / pass user object as a valuwe that we can use by 'logedInJs'
    }

    res.status(200).render("home", payload);
})

