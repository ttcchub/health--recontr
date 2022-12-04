const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

router.get("/", (req, res, next) => {

    var payload = {
        pageTitle: req.session.user.username,
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        profileUser: req.session.user
    }
    
    res.status(200).render("profilePage", payload);
})

router.get("/:username", async (req, res, next) => {

    // because function is asynchronize we need to wait for this call
    let payload = await getPayload(req.params.username, req.session.user);
    

    res.status(200).render("profilePage", payload);
})



router.get("/:username/replies", async (req, res, next) => {

    // because function is asynchronize we need to wait for this call
    let payload = await getPayload(req.params.username, req.session.user);
    payload.selectedTab = "replies";
    
    res.status(200).render("profilePage", payload);
})

// handling followers and following page 
// loading just a payload with user session name / follwoing  data and samer with followers
// (1)
router.get("/:username/following", async (req, res, next) => {

    let payload = await getPayload(req.params.username, req.session.user);
    payload.selectedTab = "following";
    
    res.status(200).render("followersAndFollowing", payload);
})


// (2)
router.get("/:username/followers", async (req, res, next) => {

    let payload = await getPayload(req.params.username, req.session.user);
    payload.selectedTab = "followers";
    
    res.status(200).render("followersAndFollowing", payload);
})
// taking user name to get user
async function getPayload(username, userLoggedIn) {
    // searching for username 
    // we waiting for name / calling and waiting for it 
    // --(here *)--
    let user = await User.findOne({ username: username })

    // if username not found 
    if(user == null) {

        //do the dearch by id -> try to find by username , if not found , searach by id 
        // we dont use let cuz we already used it  --(here *)--
        user = await User.findById(username);
        //setting as user to check if user not exist we will return message / 'not username' -> 'use user'
        if (user == null) {
            return {
                pageTitle: "User not found",
                userLoggedIn: userLoggedIn,
                userLoggedInJs: JSON.stringify(userLoggedIn)
            }
        }
    }

    return {
        pageTitle: user.username,
        userLoggedIn: userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn), 
        profileUser: user
    }
}

module.exports = router;

