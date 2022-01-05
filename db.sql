CREATE TABLE user(idUser, nom, prenom, atNaiss, password, idNotes)
CREATE TABLE note(idNotes, physique, technique, frappe, assiduité, fairPlay)
CREATE TABLE ligneMatch(idUser, idMatch, dateParticipation)
CREATE TABLE match(idMatch, dateMatch, nbJoueurs, lieux, prix, durée, heure, mode, participant)
CREATE TABLE reservation(idReserv, lieux, durée, heure, mode, prix)

-- Une notification est envoyé a l'utilisateur pour chacune de ses actions
CREATE TABLE estAmis(idUser, idUser1)
CREATE TABLE ajoute(idUser, idUser1)
CREATE TABLE invite(idUser, idUser1)