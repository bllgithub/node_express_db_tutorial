// this is where we can control the access to resources endpoints
// 
module.exports = (req, res, next) => {
    console.log("session object", req.session);

    if (req.session && req.session.user) {
        next(); // allowed
    } else {
        res.status(401).json({message:"Sorry dude, can not let you in. "});
    }
}