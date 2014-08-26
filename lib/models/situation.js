/*
** Module dependencies
*/
var mongoose = require('mongoose');
var async = require('async');

var Schema = mongoose.Schema;

var ressourceTypes = [
    'revenusSalarie',
    'revenusNonSalarie',
    'revenusAutoEntrepreneur',
    'revenusStage',
    'allocationsChomage',
    'allocationLogement',
    'rsa',
    'aspa',
    'ass',
    'aah',
    'pensionsInvalidite',
    'indJourMaternite',
    'indJourMaladie',
    'indJourMaladieProf',
    'indJourAccidentDuTravail',
    'indChomagePartiel',
    'pensionsAlimentaires',
    'pensionsRetraitesRentes',
    'bourseEnseignementSup',
    'revenusLocatifs'
];

var RessourceSchema = new Schema({
    periode: { type: String, required: true },
    type: { type: String, required: true, enum: ressourceTypes },
    montant: { type: Number, required: true }
});

var SituationPro = new Schema({
    situation: { type: String, enum: ['sans_activite', 'salarie', 'auto_entrepreneur', 'apprenti', 'travailleur_saisonnier', 'stagiaire', 'independant','gerant_salarie', 'demandeur_emploi', 'etudiant', 'retraite'] },
    since: String,
    volontairementSansActivite: Boolean,
    contractType: { type: String, enum: ['cdi', 'cdd', 'interim'] },
    isRemunere: Boolean,
    gerantSalarieAffiliation: String,
    isIndemnise: Boolean,
    indemniseSince: String
});

var IndividuDef = {
    civilite: { type: String, enum: ['f', 'h'] },
    firstName: String,
    lastName: String,
    nomUsage: String,
    nir: String,
    enceinte: Boolean,
    boursierEnseignementSup: Boolean,
    etudiant: Boolean,
    demandeurEmploi: Boolean,
    retraite: Boolean,
    statutMarital: { type: String, enum: ['mariage', 'pacs', 'relation_libre', 'celibataire', 'separe', 'divorce', 'veuf', 'pacs_rompu', 'concubinage_rompu'] },
    dateSituationFamiliale: Date,
    dateDeNaissance: Date,
    villeNaissance: String,
    departementNaissance: String,
    paysNaissance: String,
    situation: { type: String, enum: ['scolarise', 'apprenti', 'salarie', 'formation_pro', 'demandeur_emploi', 'chomage_indemnise', 'sans_activite', 'autre' ]},
    situationsPro: [SituationPro],
    nationalite: { type: String, enum: ['fr', 'ue', 'autre'] },
    dateArriveeFoyer: Date,
    inscritCaf: Boolean,
    numeroAllocataire: String,
    lienParente: { type: String, enum: ['fils', 'neveu', 'aucun', 'autre'] },
    role: { type: String, enum: ['demandeur', 'conjoint', 'enfant', 'personneACharge'] },
    ressources: [RessourceSchema],
};

var IndividuSchema = new Schema(IndividuDef);

var AdresseDef = {
    adresse: String,
    codePostal: String,
    ville: String,
    pays: String
};

var LogementDef = {
    primoAccedant: Boolean,
    membreFamilleProprietaire: Boolean,
    conjointMemeAdresse: Boolean,
    loyer: Number,
    adresse: AdresseDef,
    type: { type: String, enum: ['locataire', 'proprietaire', 'gratuit', 'payant'] },
    locationType: { type: String, enum: ['hlm', 'nonmeuble', 'meublehotel'] },
    dateArrivee: Date,
    adresseConjoint: AdresseDef
};

var SituationSchema = new Schema({
    _updated: Date,
    status: { type: String, default: 'new' },
    dateDeValeur: { type: Date, default: Date.now },
    logement: LogementDef,
    individus: [IndividuSchema],
    immobilierValue: Number,
    mobilierValue: Number,
    phoneNumber: String,
    email: String
});

SituationSchema.methods = {

    submit: function(done) {
        if (this.status !== 'new') done(new Error('Not a new situation. Cannot be submitted.'));

        var situation = this;
        this.set('status', 'pending').save(function(err) {
            if (err) return done(err);
            situation.createTasks(done);
        });
    },

    createTasks: function(done) {
        var situation = this;
        async.each(['nir_validation', 'revenus_dgfip'], function(type, created) {
            mongoose.model('Task').create({ type: type, status: 'todo', situation: situation }, created);
        }, done);
    }

};

mongoose.model('Situation', SituationSchema);
