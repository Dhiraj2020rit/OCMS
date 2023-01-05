const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')


router.post('/signup', (req, res) => {
    const { name, email, password,pic } = req.body;
    if (!email || !name || !password ) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    //res.json({ message: "Successfully posted" });
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Email already exists" });
            }
            bcrypt.hash(password, 12).then(hashedpassword => {
                const user = new User({
                    email,
                    password: hashedpassword,
                    name,
                    pic
                })

                user.save().then(user => {
                        res.json({ message: "Saved Successfully" })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }).catch(err => {
                console.log(err);
            })

        }).catch(err => {
            console.log(err);
        })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    User.findOne({ email: email }).then(savedUser => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email or password" });
        }
        bcrypt.compare(password, savedUser.password)
            .then(doMatch => {
                if (doMatch) {
                    //res.json({ message: "Login Successful" });
                    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                    const {_id,name,email,pic} = savedUser
                    res.json({ token ,user:{_id,name,email,pic}});
                    console.log(res.json({ token ,user:{_id,name,email,pic}}));
                } else {
                    return res.status(422).json({ error: "Invalid email or password" });
                }
            }).catch(err => {
                console.log(err);
            })
    }).catch(err => {
        console.log(err);
    })
    
})

module.exports = router