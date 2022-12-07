const express = require('express');
const app = express();
const router = express.Router();
// we need bodyParser to get information fro 'req.body' 
const bodyParser = require("body-parser")
// because extra folder deep we need scheme of page
const User = require('../../schemas/UserSchema');
const Post = require('../../schemas/PostSchema');
const Notification = require('../../schemas/NotificationSchema');


app.use(bodyParser.urlencoded({ extended: false }));

//    ( 1 )
// getting data from input
router.get("/", async (req, res, next) => {
    
    // it will search data that was posted in
    // for filtering posts in user page 
    let searchObj = req.query;

    //providing also replies of exact user in his feed
    if(searchObj.isReply !== undefined) {
        let isReply = searchObj.isReply == "true";
        // filter based on replyTo field
        // mongo DB check is this field exists  
        searchObj.replyTo = { $exists: isReply };
        delete searchObj.isReply;
        // console.log(searchObj) 
        // cehck of the replies 
    }

    //  
    if(searchObj.search !== undefined) {
        //  regex - regular expression searching for string & rules
        //  value - searchObj.search
        // 'i' - is sensetive search in case of low or upper case
        searchObj.content = { $regex: searchObj.search, $options: "i" };
        delete searchObj.search;
    }

    //procceding only posts of people whom we following only
    if(searchObj.followingOnly !== undefined) {
        var followingOnly = searchObj.followingOnly == "true";

        if(followingOnly) {
            var objectIds = [];
            
            if(!req.session.user.following) {
                req.session.user.following = [];
            }

            req.session.user.following.forEach(user => {
                objectIds.push(user);
            })

            objectIds.push(req.session.user._id);
            searchObj.postedBy = { $in: objectIds };
        }
        
        delete searchObj.followingOnly;
    }

    var results = await getPosts(searchObj);
    res.status(200).send(results);
})
   // ================================================ \\
   //   findOme - find & return only one item/element
   // right now we proceeding post to appear in the feed
   // Post.find()
   // //populating file by adding all income api to the page / so all the post will be displayed
   // .populate("postedBy")
   // .populate("retweetData")
   // .sort({ "createdAt": -1 })
   // .then(async results => {
   //     results = await User.populate(results, { path: "retweetData.postedBy"});
   //     res.status(200).send(results);
   // })
   // .catch(error => {
   //     console.log(error);
   //     res.sendStatus(400);
   // }) 
   // ================================================ \\
    //- - if (user.role === 'ADMIN')

    // proceeding same result as above  with fetching all the posts , shorter with getPost() function 


//    ( 2 )
//posting in modal only current post to reply on it
router.get("/:id", async (req, res, next) => {

    let postId = req.params.id;

    //filling post with comments 
    let postData = await getPosts({ _id: postId });
    //passing to reply modal current post data 
    postData = postData[0];

    var results = {
        postData: postData
    }

    if(postData.replyTo !== undefined) {
        results.replyTo = postData.replyTo;
    }

    // called get function with filter , which will sort any post that been replied  via postId' 
    results.replies = await getPosts({ replyTo: postId });

    res.status(200).send(results);
})
//posting data from user
router.post("/", async (req, res, next) => {


    if (!req.body.content) {
        console.log("Content param not sent with request");
        return res.sendStatus(400);
    }
        //creating PostSchema similar as in UserSchema
    // we recognizing who posting it by the session so registering all data from the session
    let postData = {
        content: req.body.content,
        postedBy: req.session.user
    }

    if(req.body.replyTo) {
        postData.replyTo = req.body.replyTo;
    }

    Post.create(postData)
    .then(async newPost => {
        newPost = await User.populate(newPost, { path: "postedBy" })
        newPost = await Post.populate(newPost, { path: "replyTo" })

        // Modified later cuz of mismatch of source code
        if(newPost.replyTo !== undefined) {
            await Notification.insertNotification(newPost.replyTo.postedBy, req.session.user._id, "reply", newPost._id);
        }
        
        // http status  201 - created
        res.status(201).send(newPost);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
           //return succs message or ur post wont abble to be submitted (as an example)
    })
})

// inserting data in existing 
// id/like to match with common.js put 
router.put("/:id/like", async (req, res, next) => {
    let postId = req.params.id;
        // who liked
    let userId = req.session.user._id;
    // checking is it liked or not / at the bneggining here is no like
    let isLiked = req.session.user.likes && req.session.user.likes.includes(postId);
    let option = isLiked ? "$pull" : "$addToSet";
    // add to set - is updating likes in mongoDB
    // pull -is actually to remove like  , but option operator allows to switch those possitions like and unlike 
    // [option] - in square breakets cuz it allows to inject variable and use as an option exactly insted of $pull or $addToSet

    // Insert user like    
    req.session.user = await User.findByIdAndUpdate(userId, { [option]: { likes: postId } }, { new: true})
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    // Insert post like
    let post = await Post.findByIdAndUpdate(postId, { [option]: { likes: userId } }, { new: true}) // new - newly updated record 
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    if(!isLiked) {
        await Notification.insertNotification(post.postedBy, userId, "postLike", post._id);
    }

    // 200 - success html request 
    res.status(200).send(post)
})

router.post("/:id/retweet", async (req, res, next) => {
    let postId = req.params.id;
    let userId = req.session.user._id;

    // Try and delete retweet
    let deletedPost = await Post.findOneAndDelete({ postedBy: userId, retweetData: postId })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    let option = deletedPost != null ? "$pull" : "$addToSet";

    let repost = deletedPost;

    if (repost == null) {
        repost = await Post.create({ postedBy: userId, retweetData: postId })
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })
    }

    // Insert user like
    req.session.user = await User.findByIdAndUpdate(userId, { [option]: { retweets: repost._id } }, { new: true })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    // Insert post like
    let post = await Post.findByIdAndUpdate(postId, { [option]: { retweetUsers: userId } }, { new: true })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    if(!deletedPost) {
        await Notification.insertNotification(post.postedBy, userId, "retweet", post._id);
    }
    
    res.status(200).send(post)
})

router.delete("/:id", (req, res, next) => {
    Post.findByIdAndDelete(req.params.id) 
    .then(result => res.sendStatus(202))
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
})

router.put("/:id", async (req, res, next) => {

    if(req.body.pinned !== undefined) {
        await Post.updateMany({postedBy: req.session.user }, { pinned: false })
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })
    }

    Post.findByIdAndUpdate(req.params.id, req.body) 
    .then(result => res.sendStatus(204))
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
})



// refactoring / which is allows to reuse code in multiple places 
async function getPosts (filter) {
    let results = await Post.find(filter)
    .populate("postedBy")
    .populate("retweetData")
    .populate("replyTo")
    .sort({ "createdAt": -1 })
    .catch(error => console.log(error))
    
    // taking results and populating it with repies on current post
    results = await User.populate(results, { path: "replyTo.postedBy"})
    return await User.populate(results, { path: "retweetData.postedBy"});
}

module.exports = router;