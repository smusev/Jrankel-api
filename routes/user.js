const express = require('express')
const router = express.Router()
const { getToken, isAuth } = require('../util')
const User = require('../models/user')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//signin
router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        phone: req.body.phone,
        password: req.body.password,
    });
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            phone: signinUser.phone,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        });
    } else {
        res.status(401).send({ message: 'Invalid Email or Password.' });
    }
})

router.post('/signup', async (req, res) => {
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            phone: newUser.phone,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        });
    } else {
        res.status(401).send({ message: 'Неверные данные' });
    }
})

module.exports = router