'use strict';

angular.module('ddsApp').controller('ResultatCtrl', function($analytics, $http, $scope, $sessionStorage, $stateParams, $window, ABTestingService, CityService, ResultatService, SituationService, TrampolineService) {
    $scope.awaitingResults = false;
    $scope.error = false;
    $scope.warning = false;
    $scope.warningMessage = false;

    var env = ABTestingService.getEnvironment();
    $scope.variante = env.resultat && env.resultat.value;

    function loadSituation() {
        if ($stateParams.situationId) { // If we want the result page for an already existing situation.
            return $scope.restoreRemoteSituation($stateParams.situationId);
        } else {
            return $scope.persistLocalSituation();
        }
    }
    $scope.trampoline = TrampolineService;

    function triggerEvaluation() {
        loadSituation()
            .then(function(situation) {
                $scope.awaitingResults = true;
                return situation;
            })
            .then(ResultatService.simulate)
            .then(function(droits) {
                $scope.droits = droits.droitsEligibles;
                $scope.droitsNonEligibles = droits.droitsNonEligibles;
                $scope.droitsNonEligiblesShow = Boolean($sessionStorage.ameliNoticationDone);
                $scope.droitsInjectes = droits.droitsInjectes;
                $scope.noDroits = _.isEmpty($scope.droits.prestationsNationales) && _.isEmpty($scope.droits.partenairesLocaux);
            })
            .then(function() {
                return SituationService
                    .fetchRepresentation($scope.situation._id, 'openfisca_tracer')
                    .then(function(data) {
                        $scope.openfiscaTracerURL = data.destination.url;
                    }).catch(function() {});
            })
            .catch(function(error) {
                if (error.status === 403) {
                    $scope.warning = true;
                    $scope.warningMessage = 'La simulation à laquelle vous souhaitez accéder n‘est pas accessible.';
                    $analytics.eventTrack('unauthorised');
                    return;
                }
                $scope.error = JSON.stringify((error && error.data), null, 2);
                $scope.encodedError = encodeURIComponent($scope.error);
                $scope.encodedUserAgent = encodeURIComponent(window.navigator.userAgent);
                $analytics.eventTrack('error', { label: $scope.error || $scope.situation._id });
            })
            .finally(function() {
                $scope.awaitingResults = false;

                $scope.yearMoins2 = moment($scope.situation.dateDeValeur).subtract(2, 'years').format('YYYY');
                $scope.debutPeriode = moment($scope.situation.dateDeValeur).startOf('month').subtract(1, 'years').format('MMMM YYYY');
                $scope.finPeriode = moment($scope.situation.dateDeValeur).startOf('month').subtract(1, 'months').format('MMMM YYYY');
                $scope.ressourcesYearMoins2Captured = SituationService.ressourcesYearMoins2Captured($scope.situation);

                $scope.shouldPatrimoineBeCaptured = function() {
                    if ((! $scope.droits) || (! $scope.droits.prestationsNationales)) {
                        return;
                    }

                    return _.some($scope.droits.prestationsNationales, 'isBaseRessourcesPatrimoine') && ! angular.isDefined(SituationService.hasPatrimoine($scope.situation));
                };
            });
    }

    if ($stateParams.situationId || SituationService.passSanityCheck($scope.situation)) {
        triggerEvaluation();
    } else {
        $scope.warning = true;
    }

    $scope.createTest = function() {
        // Merge national and local prestations into a flat object compatible with ludwig.
        var flatPrestations = _.merge.apply(
            null,
            _.values($scope.droits.partenairesLocaux).concat($scope.droits.prestationsNationales)
        );

        var expectedResults = _.map(flatPrestations, function(droit, id) {
            return {
                code: id,
                expectedValue: droit.montant
            };
        });

        $http.post('api/public/acceptance-tests', {
            expectedResults: expectedResults,
            scenario: { situationId: $scope.situation._id }
        }).then(function(data) {
            $window.location.href = '/tests/' + data._id + '/edit';
        }).catch(function(data) {
            $window.alert(data.error.apiError);
        });
    };
});
