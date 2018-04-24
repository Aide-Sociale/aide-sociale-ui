var mongoose = require('mongoose');
var _ = require('lodash');
var ressources = require('../../app/js/constants/ressources');
var utils = require('../lib/utils');

var familleDef = {
    parisien: Boolean,
    proprietaire_proche_famille: Boolean,
    rsa_isolement_recent: Boolean,
};

var foyerFiscalDef = {
    rfr: Object,
};

var ressourcesDefs = _.concat(
    ressources.ressourceTypes,
    ressources.categoriesRnc,
    ressources.patrimoineTypes)
.reduce(function(result, ressource) {
    result[ressource.id] = Object;
    return result;
}, {});

var specificSituationValues = [
    'chomeur',
    'etudiant',
    'retraite',
    'handicap',
    'boursier',
    'inapte_travail',
    'autre'
];

var statutMaritalValues = [
    'marie',
    'pacse',
    'celibataire',
];

var individuDef = Object.assign({
    _id: false,
    id: String,
    ass_precondition_remplie: Boolean,
    boursier: Boolean,
    date_arret_de_travail: Date,
    dateDernierContratTravail: Date,
    date_naissance: Date,
    echelon_bourse: Number,
    enfant_a_charge: Object,
    enfant_place: Boolean,
    enceinte: Boolean,
    firstName: String,
    garde_alternee: Boolean,
    gir: { type: String, default: 'non_defini' },
    habite_chez_parents: Boolean,
    nationalite: { type: String, enum: ['fr', 'ue', 'autre'] },
    role: { type: String, enum: ['demandeur', 'conjoint', 'enfant'] },
    scolarite: { type: String, enum: ['inconnue', 'college', 'lycee'] },
    specificSituations: [{ type: String, enum: specificSituationValues }],
    statut_marital: { type: String, enum: statutMaritalValues },
    taux_incapacite: Number,
    tns_auto_entrepreneur_type_activite: { type: String, enum: ['achat_revente', 'bic', 'bnc'] },
    tns_autres_revenus_type_activite: { type: String, enum: ['achat_revente', 'bic', 'bnc'] },
    tns_micro_entreprise_type_activite: { type: String, enum: ['achat_revente', 'bic', 'bnc'] },
}, ressourcesDefs);

var statutOccupationLogementValues = [
    'primo_accedant',
    'proprietaire',
    'locataire_vide',
    'locataire_meuble',
    'loge_gratuitement',
    'locataire_foyer',
    'sans_domicile',
];

var menageDef = {
    charges_locatives: Number,
    code_postal: String,
    coloc: Boolean,
    depcom: String,
    logement_chambre: Boolean,
    loyer: Number,
    nom_commune: String,
    participation_frais: Boolean,
    statut_occupation_logement: { type: String, enum: statutOccupationLogementValues },
};

var situation = {
    dateDeValeur: Date,
    famille: familleDef,
    foyer_fiscal: foyerFiscalDef,
    individus: [individuDef],
    menage: menageDef,
    modifiedFrom: String,
    status: { type: String, default: 'new' },
    token: String,
    version: Number,
};

var SituationSchema = new mongoose.Schema(situation, { minimize: false });

SituationSchema.pre('save', function(next) {
    if (!this.isNew) next();
    var situation = this;
    utils.generateToken()
    .then(function(token) {
        situation.token = token;
    })
    .then(next)
    .catch(next);
});

mongoose.model('Situation', SituationSchema);
mongoose.model('LegacySituation', new mongoose.Schema({}, { strict: false }));
