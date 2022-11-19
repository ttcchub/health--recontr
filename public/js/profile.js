// identify that page prepared to load futher code
$(document).ready(() => {

    if(selectedTab === "replies") {
        loadReplies();
    }
    else {
        loadPosts();
    }
});

// https://stackoverflow.com/questions/8567114/how-can-i-make-an-ajax-call-without-jquery
// loading posts of exact user 
function loadPosts() {
    // to have access to userId adn posts of it
    $.get("/api/posts", { postedBy: profileUserId, isReply: false }, results => {
        outputPosts(results, $(".postsContainer"));
    })
}

function loadReplies() {
    // here we have an access only to replies of exact user so we can separate them
    $.get("/api/posts", { postedBy: profileUserId, isReply: true }, results => {
        outputPosts(results, $(".postsContainer"));
    })
}