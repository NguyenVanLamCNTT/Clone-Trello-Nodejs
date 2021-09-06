const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const Accounts = require('../models/accounts');

module.exports.register = async function register(req, res) {
    try{
        const username = req.body.username;
        const plainTextPassword = req.body.password;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = await bcrypt.hash(plainTextPassword,10);
        const newUser = new Users({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            avatar: {path: 'https://res.cloudinary.com/codingclubblog/image/upload/v1627315725/avatar_yhyzcp.jpg',cloudId: 'avatar_yhyzcp'}
        })
        const user = await newUser.save();
        if (!user) throw Error('error!');
        // create account
        const newAccount = new  Accounts({
            id_user: user._id,
            username: username,
            password: password
        })
        await newAccount.save();
        res.status(200).json({success: true});
    }catch (err) {
        res.status(400).json({success: false,message: err.toString()});
    }
}

