const express = require('express')
const router = express.Router()
const User = require('../modals/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
//@route POST api/users
//@description  user registration
//@access PUBLIC
router.post('/', [
    body('name', 'Name is Required').not().isEmpty(),
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password length min 6').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            name,
            email,
            password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id     ///TOKEN MAI USER KI ID BHJ RHE HAI 
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            },
        );
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;