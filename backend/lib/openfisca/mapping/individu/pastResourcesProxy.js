var _ = require('lodash');
var moment = require('moment');

var common = require('../common');
var individuRessources = require('./ressources');
var ressources = require('../../../../../app/js/constants/ressources');

var ressourcesToDuplicate = _.concat(
    Object.keys(individuRessources.computedRessources),
    ressources.ressourceTypes.map(function(ressourceType) { return ressourceType.id; })
);

function proxyWithCurrentResources(individu, dateDeValeur) {
    var periods = common.getPeriods(dateDeValeur);
    ressourcesToDuplicate.forEach(function(ressourceTypeName) {
        var result = individu[ressourceTypeName];
        if (! result)
            return;
        // Variables can be defined on a yearly or a monthly basis
        if (_.isNumber(result[periods.lastYear])) {
            result[periods.fiscalYear] = result[periods.lastYear];
        } else {
            var sumOverLast12Months = periods.last12Months.reduce(function(sum, periodObject) {
                return sum + (result[periodObject] || 0);
            }, 0);
            if (sumOverLast12Months) {
                var months = [].concat(periods.fiscalYear12Months, periods.previousFiscalYear12Months);
                months.forEach(function(month) {
                    result[month] = sumOverLast12Months / 12;
                });
            }
        }
    });
}

function extendFiscalDataBackward(individu, dateDeValeur) {
    var periods = common.getPeriods(dateDeValeur);
    var fy = periods.fiscalYear;
    var pfy = periods.previousFiscalYear;

    ressources.categoriesRnc.forEach(function(ressource) {
        if (!individu[ressource.id]) {
            return;
        }

        var value = individu[ressource.id][fy];
        individu[ressource.id][pfy] = value;
    });

}

function ressourcesYearMoins2Captured(situation) {
    var yearMoins2 = moment(situation.dateDeValeur).subtract(2, 'years').format('YYYY');
    var januaryYearMoins2 = yearMoins2 + '-01';
    var hasRfr = situation.foyer_fiscal && _.some(situation.foyer_fiscal.rfr, _.isNumber);
    var hasYm2Ressources = situation.individus.some(function(individu) {
        return _.some(ressources.categoriesRnc, function(categorieRnc) {
            if (! individu[categorieRnc.id])
                return false;

            return _.some([
                individu[categorieRnc.id][yearMoins2],
                individu[categorieRnc.id][januaryYearMoins2]
            ], _.isNumber);
        });
    });
    return hasRfr || hasYm2Ressources;
}

function proxyRessources(individu, situation) {
    if (! ressourcesYearMoins2Captured(situation)) {
        proxyWithCurrentResources(individu, situation.dateDeValeur);
    } else {
        extendFiscalDataBackward(individu, situation.dateDeValeur);
    }
}

proxyRessources.proxyWithCurrentResources = proxyWithCurrentResources;
proxyRessources.extendFiscalDataBackward = extendFiscalDataBackward;

module.exports = proxyRessources;
