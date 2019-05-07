var _ = require('lodash');
var moment = require('moment');
var CurrencyFormatter = require('currencyformatter.js');
var situationsFamiliales = require('../../../app/js/constants/situationsFamiliales.js');
var getPeriods = require('../openfisca/mapping/common').getPeriods;

function reduce(demandeur, dateDeValeur, field) {
    var resources = Array.isArray(field.resources) ? field.resources : [ field.resources ];
    var total = 0;
    var last12Months = getPeriods(dateDeValeur).last12Months;
    _.each(resources, function(resource) {
        if (demandeur[resource]) {
            total += _.sum(_.values(_.pickBy(demandeur[resource], function(amount, period) {
                return _.includes(last12Months, period);
            })));
        }
    });
    return total;
}

function reduceToAmount(demandeur, dateDeValeur, field) {
    return CurrencyFormatter.format(reduce(demandeur, dateDeValeur, field), { currency: 'EUR', locale: 'fr' });
}

var fields = {
    date_naissance_dem: {
        label: 'votre date de naissance',
        toInternal: function(demandeur) {
            return moment(demandeur.date_naissance).format('LL');
        },
        toExternal: function(demandeur) {
            return moment(demandeur.date_naissance).format('DD/MM/YYYY');
        }
    },
    situationfam_dem: {
        label: 'votre situation familiale',
        toInternal: function(demandeur) {
            var situationFamiliale = _.find(situationsFamiliales, function(situationFamiliale) {
                return situationFamiliale.value === demandeur.statut_marital;
            });
            return situationFamiliale.label;
        },
        toExternal: function(demandeur) {
            // Voir le menu déroulant "Situation" sur la page ci-dessous
            // https://reflexe45-test.loiret.fr/public/requestv2/accountless/teleprocedure_id/92/
            switch (demandeur.statut_marital) {
            case 'marie':
                return 1;
            case 'pacse':
                return 5;
            case 'celibataire':
                return 0;
            }
        }
    },
    salaire_dem: {
        label: 'vos salaires (net) sur les 12 derniers mois',
        resources: [
            'salaire_net'
        ],
        toInternal: reduceToAmount
    },
    montantRetraite_dem: {
        label: 'votre retraite (net) sur les 12 derniers mois',
        resources: [
            'retraite_nette',
            'retraite_combattant'
        ],
        toInternal: reduceToAmount
    },
    allocations_dem: {
        label: 'vos allocations sur les 12 derniers mois',
        resources: [
            'indemnites_journalieres_maladie_professionnelle',
            'indemnites_journalieres_maladie',
            'pensions_invalidite'
        ],
        toInternal: reduceToAmount
    },
    pension_dem: {
        label: 'vos pensions alimentaires perçues',
        resources: 'pensions_alimentaires_percues',
        toInternal: reduceToAmount
    },
    rev_loca_dem: {
        label: 'vos revenus locatifs',
        resources: 'revenus_locatifs',
        toInternal: reduceToAmount
    },
    rev_biens_dem: {
        label: 'vos revenus du capital',
        resources: 'revenus_capital',
        toInternal: reduceToAmount
    }
};

function Loiret(situation) {
    this.situation = situation;
}

Loiret.prototype.toInternal = function() {

    var demandeur = _.find(this.situation.individus, function(individu) {
        return individu.role === "demandeur";
    });
    var dateDeValeur = this.situation.dateDeValeur;

    return _.map(fields, function(field) {
        return {
            label: field.label,
            formattedValue: field.toInternal.apply(null, [ demandeur, dateDeValeur, field ])
        };
    });
};

Loiret.prototype.toExternal = function() {

    var demandeur = _.find(this.situation.individus, function(individu) {
        return individu.role === "demandeur";
    });
    var dateDeValeur = this.situation.dateDeValeur;

    return {
        date_naissance_dem: fields.date_naissance_dem.toExternal(demandeur),
        situationfam_dem: fields.situationfam_dem.toExternal(demandeur),
        montantRetraite_dem: reduce(demandeur, dateDeValeur, fields.montantRetraite_dem),
        salaire_dem: reduce(demandeur, dateDeValeur, fields.salaire_dem),
        pension_dem: reduce(demandeur, dateDeValeur, fields.pension_dem),
        rev_loca_dem: reduce(demandeur, dateDeValeur, fields.rev_loca_dem),
        rev_biens_dem: reduce(demandeur, dateDeValeur, fields.rev_biens_dem),
        allocations_dem: reduce(demandeur, dateDeValeur, fields.allocations_dem),
    };
};

module.exports = Loiret;
