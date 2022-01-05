const express = require('express')
const app = express()
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
const { sequelize } = require('./models')
const { register, login, verifyToken, GerantLogin, GerantRegister } = require('./middleware/auth')
const { Creatematch, Joinmatch, Quitmatch, Listmatch, Getmatch, GetAllMyMatch, getNumberOfParticipant } = require('./middleware/matchRoute')
const { CreateReservation, SaveReservation, DeleteReservation } = require('./middleware/reservationRoute')
const { Accept, Remove, List, Search } = require('./middleware/friends')
const { buildFriend, buildInvite, showFriendNotification, showInviteNotification} = require('./middleware/notification')

/**--------------------------------------------------------------------------------------------------------- */
app.post('/registerGerant',GerantRegister, (req, res)=>{
    return res.json('Welcome register')
})

app.post('/loginGerant',GerantLogin, (req, res)=>{
    return res.json('Welcome login')
})


/**--------------------------------------------------------------------------------------------------------- */
app.post('/register',register, (req, res)=>{
    return res.json('Welcome register')
})

app.post('/login',login, (req, res)=>{
    return res.json('Welcome login')
})

/**--------------------------------------------------------------------------------------------------------- */
app.post('/getnumberofparticipant', verifyToken, async (req, res)=>{
    getNumberOfParticipant(req, res)
})


app.post('/getallmymatch', verifyToken, async (req, res)=>{
    GetAllMyMatch(req, res)
})

app.post('/getmatch', verifyToken, async (req, res)=>{
    Getmatch(req, res)
})

app.post('/listmatch', verifyToken, async (req, res)=>{
    Listmatch(req, res)
})

app.post('/creatematch', verifyToken, async (req, res)=>{
    Creatematch(req, res)
})

app.post('/joinmatch', verifyToken, async (req, res)=>{
    Joinmatch(req, res)
})

app.post('/quitmatch', verifyToken, async (req, res)=>{
    Quitmatch(req, res)
})

/**--------------------------------------------------------------------------------------------------------- */
app.post('/createreservation', verifyToken, async (req, res)=>{
    CreateReservation(req, res)
})

app.post('/savereservation', verifyToken, async (req, res)=>{
    SaveReservation(req, res)
})

app.post('/deletereservation', verifyToken, async (req, res)=>{
    DeleteReservation(req, res)
})

/**--------------------------------------------------------------------------------------------------------- */
app.post('/accept', verifyToken, async (req, res)=>{
    Accept(req, res)
})

app.post('/remove', verifyToken, async (req, res)=>{
    Remove(req, res)
})

app.post('/list', verifyToken, async (req, res)=>{
    List(req, res)
})

/**--------------------------------------------------------------------------------------------------------- */
app.post('/search', verifyToken, async (req, res)=>{
    Search(req, res)
})

app.post('/buildfriend', verifyToken, async (req, res)=>{
    buildFriend(req, res)
})

app.post('/buildinvite', verifyToken, async (req, res)=>{
    buildInvite(req, res)
})

app.post('/showfriendnotification', verifyToken, async (req, res)=>{
    showFriendNotification(req, res)
})

app.post('/showinvitenotification', verifyToken, async (req, res)=>{
    showInviteNotification(req, res)
})

/**--------------------------------------------------------------------------------------------------------- */

app.post('/verifyToken', verifyToken, async (req, res)=>{
    return res.status(200).json({ user : req.user , token : req.token})
})

app.listen(19002,'192.168.1.2',async ()=>{
    try {
        await sequelize.authenticate()
        console.log('server listen on http://192.168.1.2:19002 ... ')
    } catch (error) {
        console.log('error to connected server to database')
    }
})