const { users, notes, gerants } = require('../models')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

function register(req, res, next){
    var {physique, technique, frappe, assiduite, fairPlay} = {'physique': 88, 'technique':88, 'frappe':88, 'assiduite':88, 'fairPlay':88}
  
    var {login, password, telephone, nom, prenom } = req.body

    if (password.length < 8) return res.status(401).json({'message' : 'Le mot de passe doit contenir au moins 8 caractères'})

    if( !login || !telephone || !password || !nom || !prenom ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    if( login.replace(/\s/g, '')=='' || telephone.replace(/\s/g, '')=='' || nom.replace(/\s/g, '')=='' || prenom.replace(/\s/g, '')=='' ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    try {
        bcrypt.hash(password, 10, async function(err, password) {
            if(err) return res.status(401).json({'message' : 'Une erreur interne s\'est produite, veuillez ressayez'})
            var usr;
        
            try {

                var nt = await notes.create({physique, technique, frappe, assiduite, fairPlay})
                usr = await users.create({login ,nom , prenom, telephone, password, noteId : nt.dataValues.id})
                
            } catch (error) {
                console.log(error)
                return res.status(401).json({'message' : 'Le login existe déja'})
            }
            
            var usr = await users.findOne({
                where : {login} ,
                include: [{
                    model: notes, as: 'note'
                }]
            })

            console.log(usr)
            const token = jwt.sign(usr.dataValues,process.env.SECRET_TOKEN)

            return res.status(200).json({'token' : token})
            
        });
    } catch (error) {
        return res.status(401).json({'message' : 'Erreur l\'or de la création de l\'utilisateur'})   
    }
}

async function login(req, res, next){
    var { login, password } = req.body

    if( !login || !password ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    var usr = await users.findOne({
        where : {login} ,
        include: [{
            model: notes, as: 'note'}]
        })
    if(!usr) return res.status(401).json({'message' : 'Mot de passe ou login invalide'})

    bcrypt.compare(password, usr.password, function(err, result) {
        if(err) return res.status(401).json({'message' : 'Une erreur interne s\'est produite, veuillez ressayez'})

        if(!result) return res.status(401).json({'message' : 'Mot de passe ou login invalide'})

        const token = jwt.sign(usr.dataValues ,process.env.SECRET_TOKEN)

        return res.status(200).json({'token' : token})
       
    });
}

async function GerantLogin(req, res, next){
    var { login, password } = req.body

    if( !login || !password ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    var grt = await gerants.findOne({
        where : {login} 
    })
    if(!grt) return res.status(401).json({'message' : 'mot de passe ou login invalide'})

    bcrypt.compare(password, grt.password, function(err, result) {
        if(err) return res.status(401).json({'message' : 'Une erreur interne s\'est produite, veuillez ressayez'})

        if(!result) return res.status(401).json({'message' : 'mot de passe ou login invalide'})

        const token = jwt.sign(grt.dataValues ,process.env.SECRET_TOKEN)

        return res.status(200).json({'token' : token})
       
    });
}

function GerantRegister(req, res, next){
 
    var {nom, prenom, login, password, organisation } = req.body

    if (password.length < 8) return res.status(401).json({'message' : 'Le mot de passe doit contenir au moins 8 caractères'})

    if( !nom || !prenom || !login || !password || !organisation ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    if( nom.replace(/\s/g, '')=='' || prenom.replace(/\s/g, '')=='' || login.replace(/\s/g, '')=='' || organisation.replace(/\s/g, '')=='' ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    try {
        bcrypt.hash(password, 10, async function(err, password) {
            if(err) return res.status(401).json({'message' : 'Une erreur interne s\'est produite, veuillez ressayez'})
            var grt;
        
            try {
                grt = await gerants.create({ nom, prenom, login, password, organisation })

            } catch (error) {
                console.log(error)
                return res.status(401).json({'message' : 'Le login existe déja'})
            }
            
            var grt = await gerants.findOne({
                where : {login} 
            })

            const token = jwt.sign(grt.dataValues,process.env.SECRET_TOKEN)

            return res.status(200).json({'token' : token})
            
        });
    } catch (error) {
        return res.status(401).json({'message' : 'Erreur l\'or de la création de l\'utilisateur'})   
    }
}


async function verifyToken(req, res, next){
    const header = req.headers['authorization']

    const token = header && header.split(' ')[1]
    jwt.verify(token,process.env.SECRET_TOKEN, async (err, user)=>{
        if(err) return res.status(401).json({'message' : 'Une erreur interne s\'est produite, veuillez ressayez'})
        
        if(!user) return res.status(401).json({'message' : 'Une erreur interne s\'est produite, veuillez ressayez'})
  
        req.user = user
        req.token = token

        next()
    })
}

module.exports ={ register, login, verifyToken, GerantLogin, GerantRegister }