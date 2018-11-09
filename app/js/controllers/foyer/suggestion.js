'use strict';

angular.module('ddsApp').controller('SuggestionCtrl', function($scope, $http, droitsDescription, ResultatService, SituationService, SuggestionService) {
    $scope.test = {
        name: 'Nom du test',
        description: 'Description du test',
        expectedResults: []
    };

    $scope.situationYAML = SituationService.YAMLRepresentation($scope.situation);
    ResultatService.simulate($scope.situation, true)
        .then(bootstrap);

    function bootstrap(results) {
        $scope.results = processResults(results);


        $scope.submitting = false;
        $scope.submitLabel = function() {
            return $scope.submitting ? 'Enregistrement…' : 'Enregistrer';
        };

        var droits = [];
        for (var level in droitsDescription) {
            for (var provider in droitsDescription[level]) {
                for (var prestation in droitsDescription[level][provider].prestations) {
                    droits.push(_.assign({
                        id: prestation,
                        provider: _.assign({ id: provider, level: level }, droitsDescription[level][provider]),
                    }, droitsDescription[level][provider].prestations[prestation]));
                }
            }
        }

        var droitCountByLabel = _.countBy(droits, 'label');
        droits.forEach(function(droit) {
            if (droitCountByLabel[droit.label] > 1) {
                droit.label = droit.provider.label + ' - ' + droit.label;
            }
        });
        $scope.droitsById = _.keyBy(droits, 'id');

        $scope.possibleValues = _.sortBy(droits, 'label');
    }

    // Remove complexity from result object
    function processResults(results) {
        return results.droitsEligibles.partenairesLocaux.reduce(function(aggregate, partenairesLocal) {
            return _.assign(aggregate, partenairesLocal.prestations);
        }, _.assign({}, results.droitsEligibles.prestationsNationales));
    }

    function displayValueFor(droit, value) {
        if (_.isBoolean(value)) {
            return value ? 'Oui' : 'Non';
        }

        if (_.isNumber(value)) {
            return value + ' ' + ( droit.unit || '€' );
        }

        if (_.isString(value)) {
            return droit.uncomputability && droit.uncomputability[value] && droit.uncomputability[value].reason.admin || 'raison non définie';
        }

        return value;
    }
    $scope.displayValueFor = displayValueFor;

    $scope.droitSelected = function(expectedResult) {
        if ((! expectedResult) || (! $scope.results))
            return;
        var actualValue = $scope.results[expectedResult.ref.id] || {};
        expectedResult.result = actualValue.montant;
        expectedResult.expectedValue = expectedResult.result;
        delete expectedResult.shouldCompute;
    };

    function createSuggestionFile(form) {
        delete $scope.error;
        if ($scope.submitting || (! form.$valid)) {
            return;
        }

        if (_.some($scope.test.expectedResults, function(expectedResult) { return ! expectedResult.ref; })) {
            $scope.error = 'Une prestation est mal définie.';
            return;
        }

        var aidsWithAnExpectedValue = $scope.test.expectedResults.map(function(expectedValue) { return expectedValue.ref; });
        var metadata = SuggestionService.determineExtensionAndRepository(aidsWithAnExpectedValue);
        if (metadata.error) {
            $scope.error = metadata.error;
            return;
        }

        var testMetadata = SuggestionService.generateTestMetadata($scope.test, metadata.extension);

        $scope.submitting = true;
        $http.post('api/situations/' + $scope.situation._id + '/openfisca-test', testMetadata)
            .then(function(result) {
                return $http.post('https://ludwig.incubateur.net/api/repositories/github/betagouv/' + (metadata.repository) + '/suggest', {
                    title: testMetadata.name,
                    body: testMetadata.description,
                    content: result.data
                });
            })
            .then(function(response) {
                $scope.result = response.data;
            })
            .catch(function(error) {
                $scope.error = error.message;
            })
            .finally(function() {
                $scope.submitting = false;
            });
    }
    $scope.createSuggestionFile = createSuggestionFile;
});
