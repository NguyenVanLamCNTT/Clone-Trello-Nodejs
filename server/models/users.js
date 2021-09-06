const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: String,
    email: String,
    avatar: {path: String,cloudId: String}
})

let Users = mongoose.model('Users',userSchema,'users');
module.exports = Users;
