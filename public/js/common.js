//common is commanly used scripts for all users
// so here we can meet posts -> buttons -> passing data script to the main feed and etc..

// jQuery here ( should be changed)
// Post box recognising keyup to enable post button and count letters in the post.
$("#postTextarea, #replypostTextarea").keyup(event => {
    let textbox = $(event.target);
    let value = textbox.val().trim();

    let isModal = textbox.parents(".modal").length == 1;

   // geting  submit button 
   let submitButton = isModal ? $("#submitReplyButton") : $("#submitPostButton");


   // to be sure that we have a value of it // 0 means if ther is no elemnt if wrong elemnt been chosed
   if(submitButton.length == 0) return alert("No submit button found");

   if (value == "") {
       submitButton.prop("disabled", true);
       return;
   }

   submitButton.prop("disabled", false);
});


// modal comment reply with 'replypostTextarea'
$("#submitPostButton, #submitReplyButton").click(() => {
   let button = $(event.target);

   //if its modal - set textbox the text area from the modal, 
   let isModal = button.parents(".modal").length == 1;
   let textbox = isModal ? $("#replypostTextarea") : $("#postTextarea");
   // information that we will send to the server
   let data = {
       // giving the value of the content
       //after will be sent through RestAPI in 'post.js'
       content: textbox.val()
   }

   if (isModal){
       let id = button.data().id;
       if(id == null) return alert("Button id is null");
       data.replyTo = id;
   }
   // sending ext data to the server that been type din
   // call back function  -> first proceeding 'data' send it throught api url  
   // xhr - status of the request - 'exeml html request'
   // postrequest here is a short cut 
   $.post("/api/posts", data, postData=> {

           // on reply step its reloading page
       if(postData.replyTo){
           location.reload();
       } 
       else {
           //creating end point
           let html = createPostHtml(postData);
           // jQuery prepend gona add new elemnt to the top, not 1 after another like uppend
           $(".postsContainer").prepend(html);
           textbox.val("");
           button.prop("disabled", true);
       }
   })
});

// Modal reply function
$("#replyModal").on("show.bs.modal", (event) => {
   let button = $(event.relatedTarget);
   let postId = getPostIdFromElement(button);

   $("#submitReplyButton").data("id", postId);

   //from home.js to recive actual post
   $.get("/api/posts/" + postId, results => {
       outputPosts(results.postData, $("#originalPostContainer"));
   })
});
// bug fix with modal content appearence
$("#replyModal").on("hidden.bs.modal", () => $("#originalPostContainer").html(""));


// Deleting own post.

$("#deletePostModal").on("show.bs.modal", (event) => {
    let button = $(event.relatedTarget);
    let postId = getPostIdFromElement(button);
    $("#deletePostButton").data("id", postId);
});

$("#deletePostButton").click((event) => {
    let postId = $(event.target).data("id");

    $.ajax({
        url: `/api/posts/${postId}`,
        type: "DELETE",
        success: (data, status, xhr) => {

            if(xhr.status != 202) {
                alert("could not delete post");
                return;
            }
            
            location.reload();
        }
    })
})



//Likes
$(document).on("click", ".likeButton", (event) => {
   let button = $(event.target);
   let postId = getPostIdFromElement(button);

   if (postId === undefined) return;

   //AJAX request - updating existing resourse 

   $.ajax({
       url: `/api/posts/${postId}/like`,
       type: "PUT",
       success: (postData) => {
           
           button.find("span").text(postData.likes.length || "");
           
           if(postData.likes.includes(userLoggedIn._id)) {
               button.addClass("active");
           } else {
               button.removeClass("active");
           }
           //checking is user already liked the post 
       }
   })
})

//Retweets
$(document).on("click", ".retweetButton", (event) => {
   let button = $(event.target);
   let postId = getPostIdFromElement(button);
   
   if(postId === undefined) return;

       //AJAX request - updating existing resourse 

   $.ajax({
       url: `/api/posts/${postId}/retweet`,
       type: "POST",
       success: (postData) => {
           
           button.find("span").text(postData.retweetUsers.length || "");

           if(postData.retweetUsers.includes(userLoggedIn._id)) {
               button.addClass("active");
           }
           else {
               button.removeClass("active");
           }

       }
   })

})


//replying on post
$(document).on("click", ".post", (event) => {
   let element = $(event.target);
   let postId = getPostIdFromElement(element);

   //is check is it sertain type
   if(postId !== undefined && !element.is("button")) {
       window.location.href = '/posts/' + postId;
   }
});



$(document).on("click", ".followButton", (e) => {
    let button = $(e.target);
    let userId = button.data().user;
    
    $.ajax({
        url: `/api/users/${userId}/follow`,
        type: "PUT",
        success: (data, status, xhr) => { 
            // status contains string of success or fail
            // cheching is user exists 
            if (xhr.status == 404) {
                alert("user not found");
                return;
            }
            
            //after click on following button we check if it contains following in array / so we can switch between follow and following (reflect it each time we click on it)
            // differen of each user is equel to 1 pointer
            let difference = 1;
            if(data.following && data.following.includes(userId)) {
                button.addClass("following");
                button.text("In Favourites");
            }
            else {
                button.removeClass("following");
                button.text("Add Favourite");
                difference = -1;
            }
            
            //label showing how much each user have follwoing / followers users 
            let followersLabel = $("#followersValue");
            if(followersLabel.length != 0) {
                let followersText = followersLabel.text();
                //containing converted integer to parsInt string to actual integer type
                followersText = parseInt(followersText);
                // difference is all other followers arrays
                followersLabel.text(followersText + difference);
            }
        }
    })
});



// solving like situation here
function getPostIdFromElement(element) {

   let isRoot = element.hasClass("post");
   let rootElement = isRoot == true ? element : element.closest(".post");
   let postId = rootElement.data().id;

   if(postId === undefined) return alert("Post id undefined");
   return postId;
}

function createPostHtml(postData, largeFont = false) {

   if(postData == null) return alert("post object is null");

   let isRetweet = postData.retweetData !== undefined;
   let retweetedBy = isRetweet ? postData.postedBy.username : null;
   postData = isRetweet ? postData.retweetData : postData;

   let postedBy = postData.postedBy;

   if(postedBy._id === undefined) {
       return console.log("User object not populated");
   }


   let displayName = postedBy?.firstName + " " + postedBy?.lastName ;
   let timestamp = timeDifference(new Date(), new Date(postData.createdAt));

   let likeButtonActiveClass = postData.likes.includes(userLoggedIn._id) ? "active" : "";
   let retweetButtonActiveClass = postData.retweetUsers.includes(userLoggedIn._id) ? "active" : "";
   let largeFontClass = largeFont ? "largeFont" : "";


   let retweetText = '';
   if(isRetweet) {
       retweetText = `<span>
                       <i class='fas fa-retweet'></i>
                       Retweeted by <a href='/profile/${retweetedBy}'>@${retweetedBy}</a>    
                   </span>`
   }


   // so its actually proceeding reply to exact post by checking is post already populated or not, after that ots fetching username of current dude id and replying to user who's post been choosed  
   let replyFlag = "";
   if(postData.replyTo && postData.replyTo._id) {
       
       if(!postData.replyTo._id) {
           return alert("Reply to is not populated");
       }
       else if(!postData.replyTo.postedBy._id) {
           return alert("Posted by is not populated");
       }

       let replyToUsername = postData.replyTo.postedBy.username
       // to whom we replying
       replyFlag = `<div class='replyFlag'>
                       Replying to <a href='/profile/${replyToUsername}'>@${replyToUsername}<a>
                   </div>`;

   }

   let buttons = "";
   if (postData.postedBy._id == userLoggedIn._id) {
       buttons = `<button data-id="${postData._id}" data-toggle="modal" data-target="#deletePostModal"><i class='fas fa-times'></i></button>`;
   }


   return `<div class='post ${largeFontClass}' data-id='${postData._id}'>
               <div class='postActionContainer'>
                   ${retweetText}
               </div>
               <div class='mainContentContainer'>
                   <div class='userImageContainer'>
                       <img src='${postedBy.profilePic}'>
                   </div>
                   <div class='postContentContainer'>
                       <div class='header'>
                           <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                           <span class='username'>@${postedBy.username}</span>
                           <span class='date'>${timestamp}</span>
                           <div class='fas fasDel'>
                                <span class='fas fasDel'> ${buttons} </span>
                           </div>
                       </div>
                       ${replyFlag}
                       <div class='postBody'>
                           <span>${postData.content}</span>
                       </div>
                       <div class='postFooter'>
                            <div class='postButtonContainer orange'>
                               <button data-toggle='modal' data-target='#replyModal'>
                                   <i class='far fa-comment'></i>
                               </button>
                           </div>
                           <div class='postButtonContainer green'>
                               <button class='retweetButton ${retweetButtonActiveClass}'>
                                   <i class='fas fa-retweet'></i>
                                   <span>${postData.retweetUsers.length || ""}</span>
                               </button>
                           </div>
                           <div class='postButtonContainer red'>
                               <button class='likeButton ${likeButtonActiveClass}'>
                                   <i class='far fa-heart'></i>
                                   <span>${postData.likes.length || ""}</span>
                               </button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>`;
}

function timeDifference(current, previous) {

   let msPerMinute = 60 * 1000;
   let msPerHour = msPerMinute * 60;
   let msPerDay = msPerHour * 24;
   let msPerMonth = msPerDay * 30;
   let msPerYear = msPerDay * 365;

   let elapsed = current - previous;

   if (elapsed < msPerMinute) {
       if(elapsed/1000 < 30) return "Just now";
       
       return Math.round(elapsed/1000) + ' seconds ago';   
   }

   else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';   
   }

   else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';   
   }

   else if (elapsed < msPerMonth) {
       return Math.round(elapsed/msPerDay) + ' days ago';   
   }

   else if (elapsed < msPerYear) {
       return Math.round(elapsed/msPerMonth) + ' months ago';   
   }

   else {
       return Math.round(elapsed/msPerYear ) + ' years ago';   
   }
}

function outputPosts(results, container) {
   container.html("");

   if(!Array.isArray(results)) {
       results = [results];
   }

   results.forEach(result => {
       let html = createPostHtml(result)
       container.append(html);
   });

   if (results.length == 0 ) {
       container.append("<span class='noResults'> No posts yet. </span>")
   }
}

function outputPostsWithReplies(results, container) {
   container.html("");

   if(results.replyTo !== undefined && results.replyTo._id !== undefined) {
       let html = createPostHtml(results.replyTo)
       container.append(html);
   }

   let mainPostHtml = createPostHtml(results.postData, true)
   container.append(mainPostHtml);

   results.replies.forEach(result => {
       let html = createPostHtml(result)
       container.append(html);
   });
}