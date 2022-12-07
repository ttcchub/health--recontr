const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware')
const path = require('path')
const bodyParser = require("body-parser")
const connectFlash = require("connect-flash");
const { roles } = require('./utils/constants');

//Calling Db file for connection
const mongoose = require("./database"); 
const connectMongo = require('connect-mongo'); 
const session = require("express-session");

const server = app.listen(port, () => console.log("                   🚀 Launching . . . We currently on PORT: " + port));
const io = require("socket.io")(server, { pingTimeout: 60000 });

app.set("view engine", "pug" ,  "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));



// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logout');
const postRoute = require('./routes/postRoutes');
const profileRoute = require('./routes/profileRoutes');
const uploadRoute = require('./routes/uploadRoutes');
const searchRoute = require('./routes/searchRoutes');
const messagesRoute = require('./routes/messagesRoutes');
const notificationsRoute = require('./routes/notificationRoutes');



// Api routes
const postsApiRoute = require('./routes/api/posts');
const usersApiRoute = require('./routes/api/users');
const chatsApiRoute = require('./routes/api/chats');
const messagesApiRoute = require('./routes/api/messages');
const notificationsApiRoute = require('./routes/api/notifications');


const MongoStore = require('connect-mongo');
const { Cookie } = require('express-session');

// Session handler not to drop out during server restart 


app.use(
    session({ //kinda hashing sessions same as with password
    secret: "bbqCrazy", //word that is a key for hasking
    resave: true, //force session to be saved
    saveUninitialized: false, // prevents if it wasnt set it still save as initialized  
    cookie: {
        httpOnly: true,
    },
    store: MongoStore.create({ mongoUrl: "mongodb+srv://lyudik:Dfhbfyn890DB@cluster0.cxc7v5m.mongodb.net/?retryWrites=true&w=majority"})    })
);

//page
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/posts", middleware.requireLogin, postRoute);
app.use("/profile", middleware.requireLogin, profileRoute);
app.use("/uploads", uploadRoute);
app.use("/search", middleware.requireLogin, searchRoute);
app.use("/messages", middleware.requireLogin, messagesRoute);
app.use("/notifications", middleware.requireLogin, notificationsRoute);


app.use("/api/posts", postsApiRoute);
app.use("/api/users", usersApiRoute); 
app.use("/api/chats", chatsApiRoute);
app.use("/api/messages", messagesApiRoute);
app.use("/api/notifications", notificationsApiRoute);


app.get("/", middleware.requireLogin, (req, res, next) => {
 
    //requesting payload and data of user from session for an exact page
    let payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user), // to pass variable  we need to stringify first to pass it between calls / pass user object as a valuwe that we can use by 'logedInJs'
    }

    res.status(200).render("home", payload);
})



function ensureAdmin(req, res, next) {
    if (req.user.role === roles.admin) {
     next();
   } else {
     req.flash('warning', 'you are not Authorized to see this route');
     res.redirect('/');
   }
 }
 
 function ensureModerator(req, res, next) {
   if (req.user.role === roles.moderator) {
     next();
   } else {
     req.flash('warning', 'you are not Authorized to see this route');
     res.redirect('/');
   }
 }



// socket is actually is a client in the context 
io.on("connection", socket => {

  socket.on("setup", userData => {
      socket.join(userData._id);
      socket.emit("connected");
  })

  socket.on("join room", room => socket.join(room));
  socket.on("typing", room => socket.in(room).emit("typing"));
  // reciveing typing on the server and putting information in room
  socket.on("stop typing", room => socket.in(room).emit("stop typing"));


  socket.on("new message", newMessage => {
      let chat = newMessage.chat;

      if(!chat.users) return console.log("Chat.users not defined");

      chat.users.forEach(user => {
          
        //  so we keeping this part in app.js cuz we checking exact user._id to notidy exactly user cuz he can stay on different page and have connection to the chat like this by notification 
          if(user._id == newMessage.sender._id) return;
          console.log(user);
          socket.in(user._id).emit("message received", newMessage);
      })
  });

})