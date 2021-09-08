module.exports.regexp = function (req,res,next){
    const reg_username = /^[A-z0-9]{0,30}$/;
    const reg_phone = /^0[389][0-9]{8}$/;
    const reg_firstname =/^([A-Z][a-z]{0,20} ){0,6}([A-Z][a-z]{0,20} {0,2})$/;
    const reg_lastname = /^([A-Z][a-z]{0,20} ){0,6}([A-Z][a-z]{0,20} {0,2})$/;
    const reg_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone = req.body.phone;
    const email = req.body.email;
    if(!username || typeof username !== "string" || reg_username.test(username) == false){
        return res.status(400).json({message: "Invalid username!"});
    }
    if(!password || typeof password !== "string" || password.length < 8){
        return res.status(400).json({message: "Invalid password!"});
    }
    if(!firstname || typeof firstname !== "string" || reg_firstname.test(firstname) == false){
        return res.status(400).json({message: "Invalid firstname!"});
    }
    if(!lastname || typeof lastname !== "string" || reg_lastname.test(lastname) == false){
        return res.status(400).json({message: "Invalid lastname!"});
    }
    if(!phone || typeof phone !== "string" || reg_phone.test(phone) == false){
        return res.status(400).json({message: "Invalid phone!"});
    }
    if(!email || typeof email !== "string" || reg_email.test(email) == false){
        return res.status(400).json({message: "Invalid email!"});
    }
    next();
}
const Users = require('../../models/users');
const Accounts = require('../../models/accounts');
module.exports.checkUser = async function(req, res, next){
    const user_phone = await Users.findOne({phone: req.body.phone});
    const user_email = await Users.findOne({email: req.body.email});
    const account = await Accounts.findOne({username: req.body.username});
    if(user_email){
        return res.status(400).json({message: "email exists!", success: false});
    }
    if (user_phone){
        return res.status(400).json({message: "phone exists!", success: false});
    }
    if (account){
        return res.status(400).json({message: "username exists!", success: false});
    }
    next();
}

