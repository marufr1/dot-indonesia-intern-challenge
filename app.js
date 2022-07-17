const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const userRouter = require('./routes/user.route')

appInit(app)

function appInit(app) {
    app.use(express.json())
    app.use(express.urlencoded({
        extended: false
    }))
    app.use('/', userRouter)
}

app.listen(port, () => {
    console.log(`App running on http://localhost:3000/`)
})