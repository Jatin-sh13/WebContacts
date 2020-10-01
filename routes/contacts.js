const express = require('express')
const router = express.Router()
const User = require('../routes/users')
const Contact = require('../modals/Contact')
const authmiddle = require('../middleware/auth')
const { body, validationResult } = require('express-validator');
//@route get api/contacts
//@description  get all contacts
//@access PRIVATE
router.get('/', authmiddle, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
        res.json(contacts)
    } catch (error) {
        console.log(error)
    }
})
//@route post  api/contacts
//@description  add contact 
//@access PRIVATE
router.post('/', [authmiddle,
    body('name', 'Name is Required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
        const newcontact = await new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })
        const contact = await newcontact.save()
        res.json(contact)
    } catch (error) {
        console.log(error)
    }
})
//@route update api/contacts/:id
//@description update contact 
//@access PRIVATE
router.put('/:id', authmiddle, async (req, res) => {
    const { name, email, phone, type } = req.body;
    const contactFields = {}
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });
        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) { //token ko compare krna hai
            console.log(contact.user)
            return res.status(401).json({ msg: 'Not authorized' });
        }
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true },
        );
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
//@route delete api/contacts/:id
//@description delete contact 
//@access PRIVAT
router.delete('/:id', authmiddle, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });
        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) { //token ko compare krna hai
            console.log(contact.user)
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await Contact.findByIdAndRemove(
            req.params.id,
        );
        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;