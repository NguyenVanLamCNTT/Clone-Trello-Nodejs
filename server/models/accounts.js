const mongoose = require('mongoose');

let accountSchema = new mongoose.Schema({
    id_user: String,
    username: String,
    password: String
})
let Accounts = mongoose.model('Accounts',accountSchema,'accounts');
module.exports = Accounts;
