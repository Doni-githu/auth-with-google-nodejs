const express = require('express')
const create = require('express-handlebars').create
const mongoose = require('mongoose')
const UserRoutes = require('./routes/user')

const GOOGLE_AUTH_KEY = "702350934784-k5mbe74hrcel2s6blhc9aougeauf1nvg.apps.googleusercontent.com"
const GOOGLE_AUTH_SECRET = "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"

const app = express()

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', UserRoutes)

function startApp() {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("Mongo DB connected"))
            .catch((error) => console.log("Mongo DB has't connected yet ," + error))
        const PORT = process.env.PORT ?? 8000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {

    }
}

startApp()