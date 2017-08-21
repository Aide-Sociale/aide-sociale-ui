'use strict';

angular.module('ddsCommon').service('IndividuService', function($filter, specificSituations, nationalites) {
    function isRoleParent (role) {
        return _.includes(['demandeur', 'conjoint'], role);
    }

    return {
        age: function(individu, dateDeReference) {
            return moment(dateDeReference).diff(individu.date_naissance, 'years');
        },

        label: function(individu) {
            if ('demandeur' === individu.role) {
                return 'Vous';
            }

            if ('conjoint' === individu.role) {
                return 'Votre conjoint';
            }

            return individu.firstName;
        },

        ressourceHeader: function(individu) {
            switch (individu.role) {
                case 'demandeur':
                    return 'Vos ressources';
                case 'conjoint':
                    return 'Les ressources de votre conjoint';
                default:
                    return 'Les ressources de ' + individu.firstName;
            }
        },

        nationaliteLabel: function(individu) {
            return _.find(nationalites, { id: individu.nationalite }).label;
        },

        isRoleParent: isRoleParent,

        isParent: function(individu) {
            return isRoleParent(individu.role);
        },

        formatStatutsSpecifiques: function(individu) {
            var statuts = [];
            specificSituations.forEach(function(statut) {
                if (individu.specificSituations && individu.specificSituations.indexOf(statut.id) >= 0) {
                    statuts.push(statut.label);
                }
            });

            if (individu.enceinte) {
                statuts.push('enceinte');
            }

            if (individu.boursier) {
                statuts.push('boursier');
            }

            if (individu.garde_alternee) {
                statuts.push('en garde alternée');
            }

            statuts = _.map(statuts, $filter('lowercaseFirst'));
            statuts = statuts.join(', ');
            statuts = $filter('uppercaseFirst')(statuts);

            return statuts;
        }
    };
});
