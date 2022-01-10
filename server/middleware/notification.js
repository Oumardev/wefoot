const { notifications , NotificationInvites, users, sequelize, QueryTypes, torents} = require('../models')

async function buildFriend(req, res, next){
    var { recipientId } = req.body
    var senderId = req.user.id

    if( senderId == recipientId ) return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    if( !senderId || !recipientId ) return res.status(401).json({'message' : 'Une erreur s\'est produite'}) 

    try {
        await notifications.create({ senderId, recipientId, read : false, deleted : false, notificationTypes : 1  })
    }catch(error){
        console.log(error)
        return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    }
    
    return res.status(200).json({'message' : "La notification pour être amis a été crée"})
    next()
}

async function destroy(req, res, next){
    var { recipientId } = req.body
    var senderId = req.user.id

    if( senderId == recipientId ) return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    if( !senderId || !recipientId ) return res.status(401).json({'message' : 'Une erreur s\'est produite'}) 

    try {
        await sequelize.query(
            `
                DELETE FROM notifications WHERE senderId=:senderId AND recipientId=:recipientId
            `,{ replacements: { 'senderId': senderId, 'recipientId' : recipientId }
        });
    }catch(error){
        console.log(error)
        return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    }
    
    return res.status(200).json({'message' : "La notification pour être amis a été crée"})
    next()
}

async function buildInvite(req, res, next){
    var { recipiendId , matchId } = req.body
    var senderId = req.user.id

    if( senderId == recipiendId ) return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    if( !senderId || !recipiendId ) return res.status(401).json({'message' : 'Une erreur s\'est produite'})

    try {
        await NotificationInvites.create({ senderId, recipiendId, read : false, deleted : false, notificationTypes : 2 , matchId })
    }catch(error){
        console.log(error)
        return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    }
    
    return res.status(200).json({'message' : 'La notification pour inviter a été crée'})
    next()
}

async function showFriendNotification(req, res, next){
    var id = req.user.id

    if( !id ) return res.status(401).json({'message' : 'Une erreur s\'est produite'})

    const results  = await sequelize.query('SELECT senderId, login as `user.login`, nom as `user.nom`, prenom as `user.prenom`, telephone as `user.telephone`, physique as `user.note.physique`, technique  as `user.note.technique`, frappe  as `user.note.frappe`, assiduite  as `user.note.assiduite`, fairPlay  as `user.note.fairPlay`  FROM notifications n , users u, notes nt WHERE n.senderId=u.id AND u.noteId=nt.id', {
        nest: true
      });

    await sequelize.query('UPDATE `notifications` SET `read`=TRUE WHERE `recipientId`=:recipientId',{ replacements: { 'recipientId': id}});

    if( !results ) return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    
    return res.status(200).json({'list' :results})
    next()
}

async function showInviteNotification(req, res, next){
    var id = req.user.id

    console.log(id)
    if( !id ) return res.status(401).json({'message' : 'Une erreur s\'est produite'})

    const results =  await sequelize.query('SELECT senderId, matchId as `match.matchId`, date as `match.date`, nbJoueur as `match.nbJoueur`, lieux as `match.lieux`, prix as `match.prix`, duree as `match.duree`, mode as `match.mode`, login as `user.login`, nom as `user.nom`, prenom as `user.prenom`, telephone as `user.telephone`, physique as `user.note.physique`, technique as `user.note.technique`, frappe as `user.note.frappe`, assiduite as `user.note.assiduite`, fairPlay as `user.note.fairPlay` FROM notificationinvites n , users u, notes nt, matches m WHERE n.senderId=u.id AND u.noteId=nt.id AND n.matchId=m.id', {
        nest: true
    });

    await sequelize.query('UPDATE `notificationinvites` SET `read`=TRUE WHERE `recipiendId`=:recipientId',{ replacements: { 'recipientId': id}});

    if( !results ) return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    
    return res.status(200).json({'results' :results})
    next()
}

module.exports={ buildFriend, buildInvite, showFriendNotification, showInviteNotification, destroy }