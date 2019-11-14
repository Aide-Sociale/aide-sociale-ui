'use strict';

angular.module('ddsApp').controller('FoyerRessourcesMontantsCtrl', function($scope, $stateParams, ressourceTypes, RessourceService, IndividuService) {
   
    //console.log($scope.selectedRessourceTypes); //{salaire_net: true} ou {retraite_net : true}
    //console.log($scope);

    $scope.selectedRessourceTypes = {salaire_net:true};
    console.clear();
    console.log($scope.individu.specificSituations);
    console.log($scope.individu.specificSituations.indexOf("retraite"));

    //var statutSpecific = IndividuService.formatStatutsSpecifiques($scope.individu);
    if ( $scope.individu.specificSituations.indexOf("retraite") > 0 )  {
        $scope.selectedRessourceTypes = {retraite_nette : true} ;
    } else if ( $scope.individu.specificSituations.indexOf("chomeur") > 0) {
        $scope.selectedRessourceTypes = {chomage_net : true };
    } 


    $scope.yearMoins1 = moment($scope.situation.dateDeValeur).subtract(1, 'years').format('YYYY');
    $scope.currentMonth = moment($scope.situation.dateDeValeur).format('MMMM YYYY');

    $scope.individuLabel = IndividuService.label($scope.individu);

    $scope.ressourceTypes = _.keyBy(ressourceTypes, 'id');
    $scope.isNumber = angular.isNumber;

    _.forEach($scope.selectedRessourceTypes, function(value, key) {
        RessourceService.setDefaultValueForCurrentYear($scope.situation.dateDeValeur, $scope.individu, $scope.ressourceTypes[key]);
    });

    $scope.submit = function(form) {
        form.submitted = true;
        if (form.$valid) {
            $scope.individu.hasRessources = ! _.isEmpty($scope.selectedRessourceTypes);
            $scope.declareNextIndividuResources(parseInt($stateParams.individu));
        }
    };
});
