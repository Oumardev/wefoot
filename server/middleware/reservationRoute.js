const { reservations , ligneReservations} = require('../models')

async function CreateReservation(req, res, next){
    var { lieux, heure, duree, mode, prix } = req.body
    var gerantId = req.user.id

    if( !lieux || !heure || !duree || !mode || !prix ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    try {
        await reservations.create({ lieux, heure, duree, mode, prix , gerantId })
    }catch(error){
        console.log(error)
        return res.status(401).json({'message' : 'Erreur l\'ors de la creation de la réservation'})
    }
    
    return res.status(200).json({'message' : 'Votre réservation a été bien crée'})
    next()
}

async function SaveReservation(req, res, next){
    var { idUser , idReservation , date } = req.body
  
    if( !idUser || !idReservation || !date ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    try {
        ligne = await ligneReservations.create({ idUser, idReservation, date })
    }catch(error){
        console.log(error)
        return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    }
    
    return res.status(200).json({'message' : 'Vous avez enregistré cette réservation'})
    next()
}

async function DeleteReservation(req, res, next){
    var { idReservation } = req.body

    if( !idReservation ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    const ligne = await ligneReservations.findOne({where : {idReservation}})
    if(!ligne) return res.status(401).json({'message' : 'Une erreur s\'est produite'})

    await ligne.destroy()
    
    return res.status(200).json({'message' : 'Vous avez supprimé cette réservation'})
    next()
}

module.exports ={ CreateReservation, SaveReservation, DeleteReservation }