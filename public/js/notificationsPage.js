$(document).ready(() => {
    $.get("/api/notifications", (data) => {
        outputNotificationList(data, $(".resultsContainer"))
    })
});

function outputNotificationList(notifications, container) {
    notifications.forEach(notification => {
        let html = createNotificationHtml(notification);
        container.append(html);
    })

    if(notifications.length == 0) {
        container.append("<span class='noResults'>Nothing to show.</span>");
    }
}

function createNotificationHtml(notification) {
    let userFrom = notification.userFrom;
    let text = getNotificationText(notification);
    let href = getNotificationUrl(notification);
    let className = notification.opened ? "" : "active";

    return `<a href='${href}' class='resultListItem notification ${className}' data-id='${notification._id}'>
                <div class='resultsImageContainer'>
                    <img src='${userFrom.profilePic}'>
                </div>
                <div class='resultsDetailsContainer ellipsis'>
                    <span class='ellipsis'>${text}</span>
                </div>
            </a>`;
}

function getNotificationText(notification) {

    let userFrom = notification.userFrom;

    if(!userFrom.firstName || !userFrom.lastName) {
        return alert("user from data not populated");
    }

    let userFromName = `${userFrom.firstName} ${userFrom.lastName}`;
    
    let text;

    if(notification.notificationType == "retweet") {
        text = `${userFromName} retweeted one of your posts`;
    }
    else if(notification.notificationType == "postLike") {
        text = `${userFromName} liked one of your posts`;
    }
    else if(notification.notificationType == "reply") {
        text = `${userFromName} replied to one of your posts`;
    }
    else if(notification.notificationType == "follow") {
        text = `${userFromName} followed you`;
    }

    return `<span class='ellipsis'>${text}</span>`;
}

function getNotificationUrl(notification) { 
    let url = "#";

    if(notification.notificationType == "retweet" || 
        notification.notificationType == "postLike" || 
        notification.notificationType == "reply") {
            
        url = `/posts/${notification.entityId}`;
    }
    else if(notification.notificationType == "follow") {
        url = `/profile/${notification.entityId}`;
    }

    return url;
}