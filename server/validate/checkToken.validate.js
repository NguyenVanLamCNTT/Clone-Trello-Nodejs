const Sessions = require('../models/sessions');
module.exports.checkToken = async function(req, res, next){
    const token = req.headers['authorization'].split(' ')[1];
    const session = await Sessions.findOne({token: token});
    if(!session){
        return res.status(400).json({message: "You are not logged in", success: false});
    }
    next();
}
