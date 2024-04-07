const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

//connection mogodb
mongoose.connect('mongodb+srv://admin:1234@cluster0.oihvi1v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true
})  

global.loggIn = null

//controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')
const health_informationController = require('./controllers/health_informationController')
const heal_bodyController = require('./controllers/heal_bodyController')
const matchaController = require('./controllers/matchaController')
const mochaController = require('./controllers/mochaController')
const proteinController = require('./controllers/proteinController')
const communityController = require('./controllers/communityController')
const storeCommentsController = require('./controllers/storeCommentsController')

// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')


app.use(express.static('public'))   
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({    
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine','ejs')



app.get('/', indexController)
app.get('/home', authMiddleware, homeController)
app.get('/community',authMiddleware, communityController) 
app.get('/protein', authMiddleware, proteinController)
app.get('/mocha', authMiddleware, mochaController)
app.get('/matcha', authMiddleware, matchaController)
app.get('/heal_body', authMiddleware, heal_bodyController)
app.get('/health_information', authMiddleware, health_informationController)

app.get('/login', redirectIfAuth, loginController)
app.get('/register',redirectIfAuth, registerController)
app.post('/user/register',redirectIfAuth, storeUserController)
app.post('/user/login',redirectIfAuth, loginUserController)   
app.post('/user/community',redirectIfAuth, storeCommentsController)

   
app.get('/logout', logoutController)


app.listen(4000,()=>{
    console.log("App listening on port 4000")
})