// connected with 'main-layouts.pug' & 'home.pug' block scripts 
// that is proceed cripts in a block 
$(document).ready(() => {
    $.get("/api/posts", { followingOnly: true }, results => {
        outputPosts(results, $(".postsContainer"));
    })
})





