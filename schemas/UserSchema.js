const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    role: { },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    //should be lowercase ('username')
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "../css/icon/profilePic.png"},
    likes:[{type: Schema.Types.ObjectId, ref: 'Post'}],
    retweets:[{type: Schema.Types.ObjectId, ref: 'Post'}],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]


}, {timestamps: true}); // giving time of regisdtration

let User = mongoose.model('User', UserSchema);
module.exports = User;