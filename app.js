const express = require('express')
const app = express()
const connectdb = require('./config/db')
const userRoute = require('./routes/users')
const userContacts = require('./routes/contacts')
const userAuth = require('./routes/auth')
// mongoose
//     .connect('mongodb://localhost:27017/auth', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true
//     })
//     .then(() => {
//         console.log("DB CONNECTED");
//     });
connectdb();
app.get('/', (req, res) => {
    res.send("hello world")
})
app.use(express.json({ extended: false }))

app.use('/api/users', userRoute)
app.use('/api/contacts', userContacts)
app.use('/api/auth', userAuth)
const port = process.env.PORT || 1999
app.listen(port, () => {
    console.log("Server is running")
})