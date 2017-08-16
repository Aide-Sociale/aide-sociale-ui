'use strict';

angular.module('ddsApp').controller('ResultatCtrl', function($scope, $rootScope, $window, $http, $state, $stateParams, $timeout, SituationService, ResultatService, droitsDescription, $analytics) {

    $scope.error = false;
    $scope.awaitingResults = true;


    ResultatService.simulate(SituationService.restoreLocal())
    .then(function(droits) {
        $scope.droits = droits.droitsEligibles;
        $scope.droitsInjectes = droits.droitsInjectes;
        $scope.noDroits = _.isEmpty($scope.droits.prestationsNationales) && _.isEmpty($scope.droits.partenairesLocaux);
    })
    .catch(function(error) {
        $scope.error = JSON.stringify((error && error.data), null, 2);
        $scope.encodedError = encodeURIComponent($scope.error);
        $scope.encodedUserAgent = encodeURIComponent(window.navigator.userAgent);
        $analytics.eventTrack('error', { label: $scope.error });
    })
    .finally(function() {
        $scope.awaitingResults = false;
    });

    $scope.yearMoins2 = moment($scope.situation.dateDeValeur).subtract('years', 2).format('YYYY');
    $scope.debutPeriode = moment($scope.situation.dateDeValeur).startOf('month').subtract('years', 1).format('MMMM YYYY');
    $scope.finPeriode = moment($scope.situation.dateDeValeur).startOf('month').subtract('months', 1).format('MMMM YYYY');
    $scope.ressourcesYearMoins2Captured = SituationService.ressourcesYearMoins2Captured($scope.situation);

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
        }).success(function(data) {
            $window.location.href = '/tests/' + data._id + '/edit';
        }).error(function(data) {
            $window.alert(data.error.apiError);
        });
    };
});
