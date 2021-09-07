const mongoose = require('mongoose');
let sessionSchema = new mongoose.Schema({
    id_user: String,
    token: String,
    created: Date
})
let Sessions = mongoose.model('Sessions',sessionSchema,'sessions');
module.exports = Sessions;
