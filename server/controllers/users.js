const Users = require('../models/users');

const Accounts = require('../models/accounts');

module.exports.findUser = async function (req, res) {
    try {
        const username = req.params.username;
        const account = await Accounts.findOne({username: username});
        const user = await Users.findById(account.id_user);
        if (!user) throw Error("Error!");
        let data = {
            username: username,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            email: user.email,
            avatar: user.avatar.path
        }
        res.status(200).json(data);
    }catch (err){
        res.status(400).json({message: err.toString(),success: false});
    }
}
