var moment = require('moment');
var _ = require('lodash');

var droitsDescription = require('../../../../app/js/constants/droits');

exports.isIndividuValid = function(individu, situation) {
    var age = moment(situation.dateDeValeur).diff(moment(individu.date_naissance), 'years');
    var handicap = individu.specificSituations.indexOf('handicap' ) >= 0;
    return individu.role != 'enfant' || age <= 25 || handicap;
};

exports.getDemandeur = function(situation) {
    return _.find(situation.individus, { role: 'demandeur' });
};

exports.getConjoint = function(situation) {
    return _.find(situation.individus, { role: 'conjoint' });
};

exports.getEnfants = function(situation) {
    return _.filter(situation.individus, { role: 'enfant' });
};

exports.getPeriods = function (dateDeValeur) {
    dateDeValeur = moment(dateDeValeur);
    return {
        thisMonth: dateDeValeur.format('YYYY-MM'),
        '1MonthsAgo': dateDeValeur.clone().subtract(1, 'months').format('YYYY-MM'),
        '2MonthsAgo': dateDeValeur.clone().subtract(2, 'months').format('YYYY-MM'),
        '3MonthsAgo': dateDeValeur.clone().subtract(3, 'months').format('YYYY-MM'),
        // 12-element array of the latest 12 months
        last12Months: _.map(_.range(1, 12 + 1), function(monthIndex) {
            return dateDeValeur.clone().subtract(monthIndex, 'months').format('YYYY-MM');
        }),
        lastYear: dateDeValeur.clone().subtract(1, 'years').format('YYYY'),
        anneeFiscaleReference: dateDeValeur.clone().subtract(2, 'years').format('YYYY'),
        // 12-element array of the 12 months in the année fiscale de référence
        anneeFiscaleReference12Months: _.map(_.range(12), function(monthIndex) {
            var anneeFiscaleReference = moment(dateDeValeur.clone().subtract(2, 'years').year(), 'YYYY');
            return anneeFiscaleReference.clone().add(monthIndex, 'months').format('YYYY-MM');
        })
    };
};

function generateRequestedVariables() {
    var structuredVariables = _.values(droitsDescription).map(function(level) {
        return _.values(level).map(function(provider) {
            return _.values(_.mapValues(provider.prestations, function(prestation, prestationName) {
                    var prestations = {};
                    prestations[prestationName] = _.assign({}, prestation);
                    if (prestation.uncomputability)
                        prestations[prestationName + '_non_calculable'] = _.assign({}, prestation, { type: 'string' });
                    return prestations;
            }));
        });
    });

    return _.chain(structuredVariables).flatten().flatten().value()
        .reduce(function(obj, accum) { return _.assign(accum, obj); } , {});
}

exports.requestedVariables = generateRequestedVariables();
