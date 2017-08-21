'use strict';

angular.module('ddsApp').controller('FoyerPatrimoineCtrl', function($scope, SituationService, RessourceService) {
    var patrimoineProperties = [
        'valeur_locative_terrains_non_loue',
        'valeur_locative_immo_non_loue',
        'interets_epargne_sur_livrets',
        'epargne_non_remuneree',
    ];

    $scope.periodKey = '2012-01';
    var demandeur = $scope.demandeur = $scope.situation.individus[0];
    patrimoineProperties.forEach(function(patrimoinePropertyName) {
        demandeur[patrimoinePropertyName] = demandeur[patrimoinePropertyName] || {};
        demandeur[patrimoinePropertyName][$scope.periodKey] = demandeur[patrimoinePropertyName][$scope.periodKey] || 0;
    });

    $scope.locals = {
        epargneSurLivrets: demandeur.interets_epargne_sur_livrets[$scope.periodKey] * 100,
    };
    function epargneSurLivretsUpdated() {
        demandeur.interets_epargne_sur_livrets[$scope.periodKey] = $scope.locals.epargneSurLivrets * 0.01;
    }
    $scope._epargneSurLivretsUpdated = epargneSurLivretsUpdated;
    $scope.$watch('locals.epargneSurLivrets', epargneSurLivretsUpdated);

    $scope.submit = function() {
        $scope.$emit('patrimoine');
    };
});
