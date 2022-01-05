const { matches , ligneMatches, sequelize, QueryTypes} = require('../models')

async function Creatematch(req, res, next){
    var { lieux, date, heure, duree, nbJoueur, mode, prix } = req.body
    var userId = req.user.id
 
    if( !lieux || !date || !heure || !duree || !nbJoueur || !mode || !prix ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    try {
        var mch = await matches.create({ lieux, date, heure, duree, nbJoueur, mode, prix , userId })
        ligne = await ligneMatches.create({ matchId: mch.id, userId, dateParticipation: new Date()})

        return res.status(200).json({'id' : mch})
    
    }catch(error){
        console.log(error)
        return res.status(401).json({'message' : 'Erreur l\'ors de la creation du match'})
    }
    
    
    next()
}

async function Joinmatch(req, res, next){
    var { matchId , dateParticipation } = req.body
    var userId = req.user.id

    if( !matchId || !userId || !dateParticipation ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    try {
        ligne = await ligneMatches.create({ matchId, userId, dateParticipation })
    }catch(error){
        console.log(error)
        return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    }
    
    return res.status(200).json({'message' : 'Vous avez rejoint ce match'})
    next()
}

async function Quitmatch(req, res, next){
    var { matchId } = req.body

    if( !matchId ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    const ligne = await ligneMatches.findOne({where : {matchId}})
    if(!ligne) return res.status(401).json({'message' : 'Une erreur s\'est produite'})

    await ligne.destroy()
    
    return res.status(200).json({'message' : 'Vous avez quitté ce match'})
    next()
}

async function Listmatch(req, res, next){
    var { date } = req.body

    const results = await sequelize.query('SELECT date, nbJoueur, lieux, prix, duree, mode , nom as `user.nom`, prenom as `user.prenom`, telephone as `user.telephone` FROM matches m , users u WHERE m.userId = u.id AND date=:search_date',{
        nest: true,
        replacements: { 'search_date': date}
    });
    
    if(!results) return res.status(401).json({'message' : 'Une erreur s\'est produite'})

    return res.status(200).json({'data' : results})
    next()
}

async function Getmatch(req, res, next){
    var { id } = req.body

    const results = await sequelize.query('SELECT date, nbJoueur, lieux, prix, duree, mode ,m.id ,nom as `user.nom`, prenom as `user.prenom`, telephone as `user.telephone` FROM matches m , users u WHERE m.userId = u.id AND m.id=:id',{
        nest: true,
        replacements: { 'id': id}
    });
    
    if(!results) return res.status(401).json({'message' : 'Une erreur s\'est produite'})


    return res.status(200).json({'data' : results})
    next()
}

async function GetAllMyMatch(req, res, next){
    var userId = req.user.id

    const results = await sequelize.query('SELECT date, lieux, prix, l.matchId FROM matches m , lignematches l WHERE l.userId =:id AND l.matchId = m.id',{
        nest: true,
        replacements: { 'id': userId}
    });
    
    console.log(results)
    if(!results) return res.status(401).json({'message' : 'Une erreur s\'est produite'})


    return res.status(200).json({'data' : results})
    next()
}

async function getNumberOfParticipant(req, res, next){
    var { matchId } = req.body

    console.log(matchId)
    const results = await sequelize.query('SELECT COUNT(*) as `nb` FROM lignematches WHERE matchId=:id',{
        nest: true,
        replacements: { 'id': matchId}
    });
    
    console.log(results)
    if(!results) return res.status(401).json({'message' : 'Une erreur s\'est produite'})


    return res.status(200).json({'data' : results})
    next()
}


module.exports ={ Creatematch, Joinmatch, Quitmatch , Listmatch, Getmatch, GetAllMyMatch, getNumberOfParticipant}