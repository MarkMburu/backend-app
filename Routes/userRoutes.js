const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { sign } = require("jsonwebtoken")
const express = require('express');
const router = express.Router();
const queries = require("../db/userQueries");
const { checkValidToken } = require("../Middlewares/auth_token_validation");
const {sendMessage} = require("../Middlewares/send_messages");

const isValid = (req, res, next) => {
    if (!isNaN(req.params.id)) return next()
    next(new Error("Invalid Id...."))
};


router.get("/", checkValidToken,(req, res) => {
    console.log("whats my user id",req.userId)
    console.log("whats my ",req.firstname)
    queries.getAll().then(users => {
        res.json({
            userId: req.userId,
            firstname:req.firstname,
            users:users
        });
    })
        .catch(err => res.json(err))
});

router.get("/profile",checkValidToken,(req,res)=>{
     queries.getById(req.userId).then(users =>{
         res.json(users[0]);
     } )
     .catch(err => res.json(err))
});

router.get("/:id",checkValidToken, (req, res) => {
    queries.getById(req.params.id).then(users => {
        res.json(users[0])
    })
        .catch(err => res.json(err))
});

router.post("/register", (req, res) => {
    const body = req.body;
    const salt = genSaltSync();
    body.password = hashSync(body.password, salt);
    // body.confirmPassword = hashSync(body.confirmPassword, salt);
    queries.create(body).then(user => {
        let message = `Hi ${body.firstname}, Welcome to Anchor Premier Land Solutions.`;
        sendMessage(body.phone,message);
        res.status(201).json(user);

    })
        .catch(err => res.json(err))
});
router.post("/login", (req, res) => {
    const body = req.body;
    queries.getUser(body.email).then(users => {
        if (!users[0]) {
            return res.json({
                auth:false,
                success: 0,
                message: "Invalid Email or Passowrd"
            })
        }
        const user = compareSync(req.body.password, users[0].password);
        if (user) {
            users[0].password = undefined;
            const jsontoken = sign({ user: users[0] }, process.env.SECRET, {
                expiresIn: "1h"
            });
            return res.status(200).json({
                auth:true,
                success: 1,
                message: "logged in successfully",
                token: jsontoken
            })
        }
        else {
            return res.json({
                auth:false,
                success: 0,
                message: "Invalid Email or Passowrd"
            })

        }
    })
});

router.patch("/update/:id", checkValidToken, (req, res) => {
    const body = req.body;
    const salt = genSaltSync();
    body.password = hashSync(body.password, salt);
    body.confirmPassword = hashSync(body.confirmPassword, salt);
    queries.updateUser(req.params.id, body).then(user => {
        res.status(201).json(user)
    })
        .catch(err => res.json(err));

});
router.delete("/:id", checkValidToken, (req, res) => {
    queries.deleteUser(req.params.id).then(user => {
        res.status(200).json({
            message: "User Deleted"
        });
    });
});

module.exports = router;