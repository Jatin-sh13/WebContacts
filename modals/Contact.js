const mongoose = require('mongoose')
const contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //jo apna user bnega usko isse refer krdenge to ek particular user ka data create ho jayega.
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "personal"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('Contact', contactSchema)