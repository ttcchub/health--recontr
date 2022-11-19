const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const User = require('../../schemas/UserSchema');
const Post = require('../../schemas/PostSchema');

app.use(bodyParser.urlencoded({ extended: false }));


router.put("/:userId/follow", async (req, res, next) => {
    //checking clickable of button for a call


    let userId = req.params.userId;
    // cehcing if user exists by his ID
    let user = await User.findById(userId);
    
    //if not found user we giving error 404
    if (user == null) return res.sendStatus(404);

    // check for status of following exist's , to be sure that htey even following someone , to return it back visually
    let isFollowing = user.followers && user.followers.includes(req.session.user._id);
    //res.status(200).send(isFollowing)

    // checking isFollowing if no -> than we pull to set new userID to follower other userID
    let option = isFollowing ? "$pull" : "$addToSet"; // pull and addToSet are variables ***

    //updating following array 
    req.session.user = await User.findByIdAndUpdate(req.session.user._id, { [option]: { following: userId } }, { new: true})
    // [ ] when we use variable as an option we need square breakets ***
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    //handling  followers be updated after click  
    User.findByIdAndUpdate(userId, { [option]: { followers: req.session.user._id } })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    res.status(200).send(req.session.user);
})

router.get("/:userId/following", async (req, res, next) => {
    User.findById(req.params.userId)
    .populate("following")
    .then(results => {
        res.status(200).send(results);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
});

router.get("/:userId/followers", async (req, res, next) => {
    User.findById(req.params.userId)
    .populate("followers")
    .then(results => {
        res.status(200).send(results);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
});

module.exports = router;