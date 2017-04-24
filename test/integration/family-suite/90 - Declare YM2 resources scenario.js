description: 'Declare YM2 resources',

steps: [
    ResultComponent.declareYM2Resources(),
    {
        'YM2ResourcesComponent.suggestionText': /12000 €/,
    },
    YM2ResourcesComponent.setDemandeurRevenuActiviteInput(10000),
    YM2ResourcesComponent.setConjointAutresRevenusInput(5000),
    YM2ResourcesComponent.submit(),
    YM2ResourcesComponent.setRfrInput(15000),
    YM2ResourcesComponent.submit(),
    {
        'ResultComponent.prestationYM2Warning': false,
        'ResultComponent.declareYM2ResourcesLink': false,
        'ResultComponent.greyedPrestation': false,
    },
    RecapComponent.openYM2Demandeur(),
    {
        'RecapComponent.demandeurYM2ResourceDescription': /activité/,
        'RecapComponent.demandeurYM2ResourceMontant': '10000 €',
    },
    RecapComponent.openYM2Conjoint(),
    {
        'RecapComponent.conjointYM2ResourceDescription': /Autres revenus/,
        'RecapComponent.conjointYM2ResourceMontant': '5000 €',
    },
]

