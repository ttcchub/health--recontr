const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const upload = multer({ dest: "uploads/" }); 
const User = require('../../schemas/UserSchema');
const Post = require('../../schemas/PostSchema');
const Notification = require('../../schemas/NotificationSchema');


app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res, next) => {
    let searchObj = req.query;

    if(req.query.search !== undefined) {
        searchObj = {
            // $or is mongoDb condition for search
            $or: [
                // regex for partial patch
                { firstName: { $regex: req.query.search, $options: "i" }},
                { lastName: { $regex: req.query.search, $options: "i" }},
                { username: { $regex: req.query.search, $options: "i" }},
            ]  
        }
    }
    
    User.find(searchObj)
    .then(results => res.status(200).send(results))
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
});


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

    if(!isFollowing) {
        await Notification.insertNotification(userId, req.session.user._id, "follow", req.session.user._id);
    }

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


router.post("/profilePicture", upload.single("croppedImage"), async (req, res, next) => {
    if(!req.file) {
        console.log("No file uploaded with ajax request.");
        return res.sendStatus(400);
    }

    let filePath = `/uploads/images/${req.file.filename}.png`;
    let tempPath = req.file.path;
    let targetPath = path.join(__dirname, `../../${filePath}`);

    fs.rename(tempPath, targetPath, async error => {
        if(error != null) {
            console.log(error);
            return res.sendStatus(400);
        }

        //old prof picture storing in old session
        req.session.user = await User.findByIdAndUpdate(req.session.user._id, { profilePic: filePath }, { new: true });
        res.sendStatus(204); // 204 - no content 
    })

});


router.post("/coverPhoto", upload.single("croppedImage"), async (req, res, next) => {
    if(!req.file) {
        console.log("No file uploaded with ajax request.");
        return res.sendStatus(400);
    }

    let filePath = `/uploads/images/${req.file.filename}.png`;
    let tempPath = req.file.path;
    let targetPath = path.join(__dirname, `../../${filePath}`);

    fs.rename(tempPath, targetPath, async error => {
        if(error != null) {
            console.log(error);
            return res.sendStatus(400);
        }

        //old prof picture storing in old session
        req.session.user = await User.findByIdAndUpdate(req.session.user._id, { coverPhoto: filePath }, { new: true });
        res.sendStatus(204); // 204 - no content 
    })

});

module.exports = router;