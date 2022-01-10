const { user_friends , users, sequelize, QueryTypes, torents} = require('../models')
const { Op } = require("sequelize");

async function Accept(req, res, next){
    var { TargetId } = req.body
    var sourceId = req.user.id


    if( sourceId == TargetId ) return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    if( !sourceId || !TargetId ) return res.status(401).json({'message' : 'Une erreur s\'est produite'})

    var usr = await users.findOne({
        where : {id : TargetId} 
    })

    if(!usr) return res.status(401).json({'message' : 'Une erreur s\'est produite'})

    try {
        await sequelize.query(
            `
                DELETE FROM notifications WHERE senderId=:senderId AND recipientId=:recipientId
            `,{ replacements: { 'senderId': TargetId, 'recipientId' : sourceId }
        });

        await user_friends.create({ TargetId : TargetId , sourceId : sourceId})
        await user_friends.create({ TargetId : sourceId , sourceId : TargetId})
    }catch(error){
        console.log(error)
        return res.status(401).json({'message' : 'Une erreur s\'est produite'})
    }
    
    return res.status(200).json({'message' : 'Vous êtes désormais amis'})
    next()
}

async function Remove(req, res, next){
    var { TargetId } = req.body
    var sourceId = req.user.id

    if( !TargetId ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    const [results, metadata] = await sequelize.query(
        `
            SELECT * FROM user_friends WHERE TargetId=:target AND sourceId=:source
            OR TargetId=:source AND sourceId=:target
              
        `,{ replacements: { 'target': TargetId, 'source' : sourceId }
        });
    
    console.log(results)
    if(!results) return res.status(401).json({'message' : 'Une erreur s\'est produite'})

    await sequelize.query(
        `
            DELETE FROM user_friends WHERE TargetId=:target AND sourceId=:source
            OR TargetId=:source AND sourceId=:target
              
        `,{ replacements: { 'target': TargetId, 'source' : sourceId }
    });
    
    return res.status(200).json({'message' : 'Vous avez supprimé ce lien d\'amitié'})
    next()
}

async function List(req, res, next){
    var id = req.user.id

    if( !id ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    const list = await user_friends.findAll({ where: {sourceId: id},  include: [{model: users, as: 'user'}]})

    if(!list) return res.status(401).json({'message' : 'Une erreur s\'est produite'})

    
    return res.status(200).json({'list' :list})
    next()
}

async function Search(req, res, next){
    var { search } = req.body
    var id = req.user.id

    console.log(search)
    if( !id || !search ) return res.status(401).json({'message' : 'Veuillez saisir tout les champs'})

    const results = await sequelize.query("SELECT u.id,u.id=:userId as `me` ,u.nom, u.prenom, u.id=n.recipientId and n.senderId=:userId as `invited`,:userId=n.recipientId and n.senderId=u.id as `accepted`, uf.sourceId=:userId and uf.TargetId=u.id or uf.sourceId=u.id and uf.TargetId=:userId as `isfriend` FROM users u , notifications n, user_friends uf WHERE u.nom like :search or u.prenom like :search GROUP BY u.nom, u.prenom",{ nest: true ,replacements: {'userId' : id, 'search': '%'+search+'%'} });
    console.log(results)
    
    return res.status(200).json({'data' : results})
    next()
}


module.exports={
    Accept,
    Remove,
    List,
    Search
}