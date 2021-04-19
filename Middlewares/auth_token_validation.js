const { verify } = require("jsonwebtoken");

const checkValidToken = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.json({
                    succes: 0,
                    message: "Invalid Token"
                })
            }
            else{
                req.userId = decoded.user.id
                req.firstname = decoded.user.firstname;
                next();
            }
        });
    }
    else {
        res.json({
            success: 0,
            message: "Access denied, unauthorized user"
        })
    }
}

module.exports = {
    checkValidToken
}