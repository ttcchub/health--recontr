const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const User = require('../schemas/UserSchema');
const Chat = require('../schemas/ChatSchema');

router.get("/", (req, res, next) => {
    res.status(200).render("inboxPage", {
        pageTitle: "Appointments Queue",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    });
})

router.get("/new", (req, res, next) => {
    res.status(200).render("newMessage", {
        pageTitle: "New Appointment",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    });
})

router.get("/:chatId", async (req, res, next) => {

    let userId = req.session.user._id;
    let chatId = req.params.chatId;
    let isValidId = mongoose.isValidObjectId(chatId);

    let payload = {
        pageTitle: "Appointment",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    };

    if(!isValidId) {
        payload.errorMessage = "Chat does not exist or you do not have permission to view it.";
        return res.status(200).render("chatPage", payload);
    }

    // checking is this chat even exists 
    let chat = await Chat.findOne({ _id: chatId, users: { $elemMatch: { $eq: userId } } })
    .populate("users");

    if(chat == null) {
        // Check if chat id is really user id
        let userFound = await User.findById(chatId);

        if(userFound != null) {
            // get chat using user id
            chat = await getChatByUserId(userFound._id, userId);
        }
    } 

    if(chat == null) {
        payload.errorMessage = "Chat does not exist or you do not have permission to view it.";
    }
    else {
        payload.chat = chat;
    }

    res.status(200).render("chatPage", payload);
})

function getChatByUserId(userLoggedInId, otherUserId) {
    return Chat.findOneAndUpdate({
        isGroupChat: false,
        // checking is the users are the participate in chat
        users: {
            $size: 2,
            $all: [
                { $elemMatch: { $eq: mongoose.Types.ObjectId(userLoggedInId) }},
                // { $elemMatch: { $eq: userLoggedInId }},
                { $elemMatch: { $eq: mongoose.Types.ObjectId(otherUserId) }}
                // { $elemMatch: { $eq: otherUserId }}
            ]
        }
    },
    {
        $setOnInsert: {
            users: [userLoggedInId, otherUserId] 
        }
    },
    // options of newly updated 
    {
        new: true,
        // upsert - 'if you didnt find - create it' straign explanaition of function
        upsert: true
    })
    .populate("users");
}

module.exports = router;