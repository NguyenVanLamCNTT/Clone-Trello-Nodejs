module.exports.regexp = function (req, res, next) {
    const reg_username = /^[A-z0-9]{0,30}$/;
    const username = req.body.username;
    const password = req.body.password;
    if(!username || typeof username !== "string" || reg_username.test(username) == false){
        return res.status(400).json({message: "Invalid username",success: false});
    };
    if(!password || typeof password !== "string" || password.length < 8){
        return res.status(400).json({message: "Invalid password", success: false});
    }
    next();
}
