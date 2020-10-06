const express = require('express')
const app = express()
const connectdb = require('./config/db')
const userRoute = require('./routes/users')
const userContacts = require('./routes/contacts')
const userAuth = require('./routes/auth')
const path =require('path')
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
app.use(express.json({ extended: false }))

app.use('/api/users', userRoute)
app.use('/api/contacts', userContacts)
app.use('/api/auth', userAuth)
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}
const port = process.env.PORT || 1999
app.listen(port, () => {
    console.log("Server is running")
})