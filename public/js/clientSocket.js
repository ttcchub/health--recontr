// client socket avaliable on all pages
let connected = false;

let socket = io("http://localhost:3003")
socket.emit("setup", userLoggedIn);

socket.on("connected", () => connected = true);
// handling server room income
socket.on("message received", (newMessage) => messageReceived(newMessage));