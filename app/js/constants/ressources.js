'use strict';

angular.module('ddsCommon').constant('ressourceCategories', [
    {
        id: 'revenusActivite',
        label: 'Revenus d’activité'
    },
    {
        id: 'allocations',
        label: 'Allocations'
    },
    {
        id: 'indemnites',
        label: 'Indemnités'
    },
    {
        id: 'pensions',
        label: 'Pensions'
    },
    {
        id: 'rpns',
        label: 'Revenus professionnels non salariés'
    },
    {
        id: 'autre',
        label: 'Autres'
    }
]);

angular.module('ddsCommon').constant('ressourceTypes', [
    {
        id: 'revenusSalarie',
        label: 'Salaires, primes',
        category: 'revenusActivite'
    },
    {
        id: 'stage',
        label: 'Rémunération de stage',
        category: 'revenusActivite'
    },
    {
        id: 'revenusStageFormationPro',
        label: 'Revenus de stage de formation professionnelle',
        category: 'revenusActivite'
    },
    {
        id: 'allocationsChomage',
        label: 'Allocation chômage (ARE)',
        category: 'allocations'
    },
    {
        id: 'allocationSecurisationPro',
        label: 'Allocation de sécurisation professionnelle',
        category: 'allocations'
    },
    {
        id: 'primeRepriseActivite',
        label: 'Prime forfaitaire mensuelle pour la reprise d’activité',
        category: 'allocations'
    },
    {
        id: 'aide_logement',
        label: 'Aides au logement (APL, ALS, ALF)',
        category: 'allocations'
    },
    {
        id: 'af',
        label: 'Allocations familiales',
        category: 'allocations'
    },
    {
        id: 'cf',
        label: 'Complément familial (CF)',
        category: 'allocations'
    },
    {
        id: 'asf',
        label: 'Allocation de soutien familial (ASF)',
        category: 'allocations'
    },
    {
        id: 'rsa',
        label: 'Revenu de solidarité active (RSA)',
        category: 'allocations'
    },
    {
        id: 'aspa',
        label: 'Allocation de solidarité aux personnes âgées (ASPA)',
        category: 'allocations'
    },
    {
        id: 'asi',
        label: 'Allocation supplémentaire d’invalidité (ASI)',
        category: 'allocations'
    },
    {
        id: 'ass',
        label: 'Allocation de solidarité spécifique (ASS)',
        category: 'allocations'
    },
    {
        id: 'aah',
        label: 'Allocation adulte handicapé (AAH)',
        category: 'allocations'
    },
    {
        id: 'paje_base',
        label: 'Prestation d’accueil du jeune enfant (PAJE) - Allocation de base',
        category: 'allocations'
    },
    {
        id: 'clca',
        label: 'Complément de libre choix d’activité (CLCA)',
        category: 'allocations'
    },
    {
        id: 'prepare',
        label: 'Prestation partagée d’éducation de l’enfant (PreParE)',
        category: 'allocations'
    },
    {
        id: 'indJourMaternite',
        label: 'Indemnités de maternité, paternité, adoption',
        category: 'indemnites'
    },
    {
        id: 'indJourMaladie',
        label: 'Indemnités maladie',
        category: 'indemnites'
    },
    {
        id: 'indJourMaladieProf',
        label: 'Indemnités maladie professionnelle',
        category: 'indemnites'
    },
    {
        id: 'indJourAccidentDuTravail',
        label: 'Indemnités d’accident du travail',
        category: 'indemnites'
    },
    {
        id: 'indChomagePartiel',
        label: 'Indemnités d’activité partielle',
        category: 'indemnites'
    },
    {
        id: 'indVolontariat',
        label: 'Indemnités de volontariat',
        category: 'indemnites'
    },
    {
        id: 'dedommagementAmiante',
        label: 'Dédommagement aux victimes de l’amiante',
        category: 'indemnites'
    },
    {
        id: 'pensionsAlimentaires',
        label: 'Pensions alimentaires',
        category: 'pensions'
    },
    {
        id: 'pensionsAlimentairesVersees',
        label: 'Pensions alimentaires versées',
        category: 'pensions'
    },
    {
        id: 'prestationCompensatoire',
        label: 'Prestation compensatoire (suite à séparation)',
        category: 'pensions'
    },
    {
        id: 'pensionsRetraitesRentes',
        label: 'Retraite (y compris reversion), rentes',
        category: 'pensions'
    },
    {
        id: 'retraiteCombattant',
        label: 'Retraite du combattant',
        category: 'pensions'
    },
    {
        id: 'pensionsInvalidite',
        label: 'Pensions d’invalidité',
        category: 'pensions'
    },
    {
        id: 'bourseEnseignementSup',
        label: 'Bourses de l’enseignement supérieur',
        category: 'autre'
    },
    {
        id: 'bourseRecherche',
        label: 'Bourse de recherche',
        category: 'autre'
    },
    {
        id: 'gainsExceptionnels',
        label: 'Gains exceptionnels (dons, gains aux jeux, héritage)',
        category: 'autre'
    },
    {
        id: 'caMicroEntreprise',
        label: 'Micro-entreprise',
        category: 'rpns',
        isMontantAnnuel: true
    },
    {
        id: 'caAutoEntrepreneur',
        label: 'Auto-entrepreneur',
        category: 'rpns'
    },
    {
        id: 'revenusAgricolesTns',
        label: 'Exploitant agricole',
        category: 'rpns',
        isMontantAnnuel: true
    },
    {
        id: 'autresRevenusTns',
        label: 'Profession libérale, entrepreneur',
        category: 'rpns',
        isMontantAnnuel: true
    }
]);

angular.module('ddsCommon').constant('categoriesRnc', [
    {
        id: 'rncRevenusActivite',
        label: 'Revenus d’activité connus'
    },
    {
        id: 'rncAutresRevenus',
        label: 'Autres revenus imposables (préretraite, chômage)'
    },
    {
        id: 'rncPensionsRetraitesRentes',
        label: 'Pensions, retraites, rentes'
    },
    {
        id: 'fraisReelsDeductibles',
        label: 'Frais réels déductibles'
    },
    {
        id: 'rncPensionsAlimentaires',
        label: 'Pensions alimentaires reçues'
    },
    {
        id: 'rncPensionsAlimentairesVersees',
        label: 'Pensions alimentaires versées'
    }
]);
