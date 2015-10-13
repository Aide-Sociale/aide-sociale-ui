'use strict';

angular.module('ddsApp').factory('SituationService', function($http, $sessionStorage, $modal) {
    var situation;

    var flattenRessource = function(ressource, source, target) {
        if (ressource.periode) {
            target.push(ressource);
            return;
        }

        var debutPeriode = moment(ressource.debutPeriode, 'YYYY-MM');
        var finPeriode = moment(ressource.finPeriode, 'YYYY-MM');
        var monthsDiff = finPeriode.diff(debutPeriode, 'months') + 1;
        var totalMontantToFlatten = ressource.montant;
        _.where(source, {type: ressource.type}).forEach(function(diffRessource) {
            var periode = diffRessource.periode;
            if (periode) {
                periode = moment(periode, 'YYYY-MM');
                if ((periode.isAfter(debutPeriode) || periode.isSame(debutPeriode)) &&
                    (periode.isBefore(finPeriode) || periode.isSame(finPeriode))) {
                    totalMontantToFlatten -= diffRessource.montant;
                    monthsDiff--;
                }
            }
        });

        var flattenedMontant = Math.round(totalMontantToFlatten / monthsDiff * 100) / 100;

        while (debutPeriode.isBefore(finPeriode) || debutPeriode.isSame(finPeriode)) {
            if (! _.find(source, {periode: debutPeriode.format('YYYY-MM')})) {
                var splittedRessource = {
                    periode: debutPeriode.format('YYYY-MM'),
                    montant: flattenedMontant
                };
                if (ressource.type) {
                    splittedRessource.type = ressource.type;
                }
                target.push(splittedRessource);
            }
            debutPeriode.add(1, 'months');
        }
    };

    var flattenPatrimoine = function(patrimoine) {
        var source = patrimoine.revenusDuCapital;
        patrimoine.revenusDuCapital = [];
        source.forEach(function(revenu) {
            flattenRessource(revenu, source, patrimoine.revenusDuCapital);
        });

        source = patrimoine.revenusLocatifs;
        patrimoine.revenusLocatifs = [];
        source.forEach(function(revenu) {
            flattenRessource(revenu, source, patrimoine.revenusLocatifs);
        });
    };

    return {
        newSituation: function() {
            situation = $sessionStorage.situation = { individus: [], dateDeValeur: moment().format() };
        },

        restoreLocal: function() {
            if (! situation) {
                situation = $sessionStorage.situation;
            }

            if (! situation) {
                this.newSituation();
            }

            situation.individus.forEach(function(individu) {
                individu.dateDeNaissance = moment(individu.dateDeNaissance);
            });

            return situation;
        },

        restoreRemote: function(situationId) {
            return $http.get('/api/situations/' + situationId).then(function(result) {
                situation = result.data;

                situation.individus.forEach(function(individu) {
                    individu.dateDeNaissance = moment(individu.dateDeNaissance);
                });

                $sessionStorage.situation = situation;

                return situation;
            });
        },

        getMonths: function(baseDate) {
            var refDate = baseDate ? moment(baseDate) : moment();
            refDate.subtract(4, 'months');
            return _.map([3, 2, 1], function() {
                refDate.add(1, 'months');
                return {
                    id: refDate.format('YYYY-MM'),
                    label: refDate.format('MMMM YYYY')
                };
            });
        },

        save: function(situation) {
            var apiSituation = this.createApiCompatibleSituation(situation);
            if (! situation._id) {
                return $http.post('/api/situations', apiSituation).then(function(result) {
                    situation._id = result.data._id;
                    return result.data;
                }).catch(function(error) {
                    $modal.open({
                        templateUrl: '/partials/error-modal.html',
                        controller: ['$scope', function($scope) {
                            $scope.error = error;
                        }]
                    });
                });
            } else {
                return $http.put('/api/situations/' + situation._id, apiSituation).then(function(result) {
                    return result.data;
                });
            }
        },

        createApiCompatibleSituation: function(situation) {
            var individus = _.map(situation.individus, this.createApiCompatibleIndividu);

            var conjoint = _.find(individus, { role: 'conjoint' });
            var demandeur = _.find(individus, { role: 'demandeur' });
            if (conjoint) {
                demandeur.statutMarital = conjoint.statutMarital;
            } else {
                demandeur.statutMarital = demandeur.situationFamiliale;
            }

            if (situation.logement.dateArriveeString) {
                var dateArrivee = moment(situation.logement.dateArriveeString, 'L');
                if (dateArrivee.isValid()) {
                    situation.logement.dateArrivee = dateArrivee.format('YYYY-MM-DD');
                }
            }

            if (situation.patrimoine) {
                flattenPatrimoine(situation.patrimoine); // FIXME Faire ça dans le controller du patrimoine
            }

            var result = {
                individus: individus,
                logement: situation.logement,
                patrimoine: situation.patrimoine,
                phoneNumber: situation.phoneNumber,
                email: situation.email
            };

            if (situation.ressourcesYearMoins2Captured) {
                result.ressourcesYearMoins2Captured = true;
                result.rfr = situation.rfr;
            }

            return result;
        },

        createApiCompatibleIndividu: function(individu) {
            var result = _.cloneDeep(individu);
            result.dateDeNaissance = individu.dateDeNaissance && individu.dateDeNaissance.format('YYYY-MM-DD');

            if (individu.dateArriveeFoyerString) {
                var dateArrivee = moment(individu.dateArriveeFoyerString, 'L');
                if (dateArrivee.isValid()) {
                    result.dateArriveeFoyer = dateArrivee.format('YYYY-MM-DD');
                }
            }

            if (individu.dateSituationFamiliale) {
                var dateSituationFamiliale = moment(individu.dateSituationFamiliale, 'L');
                if (dateSituationFamiliale.isValid()) {
                    result.dateSituationFamiliale = dateSituationFamiliale.format('YYYY-MM-DD');
                } else {
                    delete result.dateSituationFamiliale;
                }
            }

            return result;
        },

        flattenPatrimoine: flattenPatrimoine,

        getDemandeur: function(situation) {
            return _.find(situation.individus, { role: 'demandeur' });
        },

        hasEnfantScolarise: function(situation) {
            return _.find(situation.individus, { role: 'enfant', scolarite: 'college' }) || _.find(situation.individus, { role: 'enfant', scolarite: 'lycee' });
        },

        hasEnfant: function(situation) {
            return _.find(situation.individus, { role: 'enfant' });
        },

        hasConjoint: function(situation) {
            return _.find(situation.individus, { role: 'conjoint' });
        },

        setConjoint: function(situation, conjoint) {
            var individus = situation.individus;
            // si le conjoint existait déjà avant, on l'écrase
            if (this.hasConjoint(situation)) {
                individus[individus.length - 1] = conjoint;
            } else {
                // on insère le conjoint en dernier dans la liste des individus
                individus.push(conjoint);
            }
        },

        setEnfants: function(situation, enfants) {
            var individus = situation.individus;
            individus = _.filter(individus, function(individu) {
                return 'enfant' !== individu.role;
            });
            individus = individus.slice(0,1)
                .concat(enfants)
                .concat(individus.slice(1));
            situation.individus = individus;
        }
    };
});
