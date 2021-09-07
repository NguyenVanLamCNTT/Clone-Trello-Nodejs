const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const Accounts = require('../models/accounts');
const Sessions = require('../models/sessions');
const jwt = require('jsonwebtoken');
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
module.exports.login = async function (req, res) {
    try {
        const today = new Date();
        const username = req.body.username;
        const password = req.body.password;
        const account = await Accounts.findOne({username: username});
        if (!account) {
            return res.status(400).json({message: "Username does not exist", success: false});
        }
        if (await bcrypt.compare(password, account.password)) {
            const session = await Sessions.findOne({id_user: account.id_user});
            if (session) {
                return res.status(200).json({token: session.token, success: true});
            }
            const token = jwt.sign(
                {
                    id: account.id_user,
                    day: today,
                },
                process.env.JWT_SECRET
            )
            const newSession = new Sessions({
                id_user: account.id_user,
                token: token,
                created: today
            });
            await newSession.save();
            res.status(200).json({token: token, success: true});
        } else {
            return res.status(400).json({message: "Incorrect password!", success: false});
        }
    } catch (err) {
        res.status(400).json({message: err.toString(), success: false});
    }
}
