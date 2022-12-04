$(document).ready(() => {
    $.get("/api/chats", (data, status, xhr) => {
        if(xhr.status == 400) {
            alert("Could not get chat list.");
        }
        else {
            
            outputChatList(data, $(".resultsContainerOpenedCases.ellipsis.col-lg-20"));
        }
    })
})

// defining chat list with users
function outputChatList(chatList, container) {
    chatList.forEach(chat => {
        let html = createChatHtml(chat);
        container.append(html);
    })

    if(chatList.length == 0) {
        container.append("<span class='noResults'>Nothing to show.</span>");
    }
}


// ellipsis  -  is handling the border of content box, if to many users added it will leave ... withoung exiting the border

function createChatHtml(chatData) {
    let chatName = getChatName(chatData);
    let image = getChatImageElements(chatData);
    let latestMessage = "This is the latest message";
    
    return `<a href='/messages/${chatData._id}' class='resultListItem'>
                ${image}
                <div class='resultsDetailsContainer ellipsis'>
                    <span class='heading ellipsis'>${chatName}</span>
                    <span class='subText ellipsis'>${latestMessage}</span>
                </div>
            </a>`;
}

//taking the chat data as parameter
function getChatName(chatData) {
    let chatName = chatData.chatName;

    if(!chatName) {
        let otherChatUsers = getOtherChatUsers(chatData.users);
        let namesArray = otherChatUsers.map(user => user.firstName + " " + user.lastName);
        chatName = namesArray.join(", ")
    }

    return chatName;
}

function getOtherChatUsers(users) {
    if(users.length == 1) return users;

    return users.filter(user => user._id != userLoggedIn._id);
}

function getChatImageElements(chatData) {
    let otherChatUsers = getOtherChatUsers(chatData.users);

    let groupChatClass = "";
    let chatImage = getUserChatImageElement(otherChatUsers[0]);

    if(otherChatUsers.length > 1) {
        groupChatClass = "groupChatImage";
        chatImage += getUserChatImageElement(otherChatUsers[1]);
    }

    return `<div class='resultsImageContainer ${groupChatClass}'>${chatImage}</div>`;
}

function getUserChatImageElement(user) {
    if(!user || !user.profilePic) {
        return alert("User passed into function is invalid");
    }

    return `<img src='${user.profilePic}' alt='User's profile pic'>`;
}
