
// timer for search type-in / when u stop typing it will proceed search 
$("#searchBox").keydown((event) => {
    clearTimeout(timer);
    let textbox = $(event.target);
    let value = textbox.val();
    let searchType = textbox.data().search;

    timer = setTimeout(() => {
        value = textbox.val().trim(); 

        if(value == "") {
            $(".resultsContainer").html("");
        }
        else {
            search(value, searchType);
        }
    }, 1000) // duration in 1sec

})

function search(searchTerm, searchType) {
    // what we a searching for 
    let url = searchType == "users" ? "/api/users" : "/api/posts"

    //ajax call
    $.get(url, { search: searchTerm }, (results) => {
        

        if(searchType == "users") {
            outputUsers(results, $(".resultsContainer"));
        }
        else {
            outputPosts(results, $(".resultsContainer"))
        }

    })
}
