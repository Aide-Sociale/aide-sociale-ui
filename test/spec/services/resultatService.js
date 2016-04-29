'use strict';

describe('ResultatService', function () {
    describe('sortDroits', function() {
        var DROITS_DESCRIPTION = {
            prestationsNationales : {
                'acs': { shortLabel: 'ACS' },
                'apl': { shortLabel: 'APL' },
                'ass': { shortLabel: 'ASS' }
            }
        };
        var service, droits, openfiscaResult;

        beforeEach(function() {
            module('ddsApp');
            module(function($provide) {
                $provide.constant('droitsDescription', DROITS_DESCRIPTION);
            });
            inject(function(ResultatService) {
                service = ResultatService;
            });
            openfiscaResult = { calculatedPrestations: { acs: 10 }, injectedPrestations: ['apl'] };
            droits = service.processOpenfiscaResult(openfiscaResult);
        });

        it('should extract eligibles droits from openfisca result', function() {
            expect(droits.droitsEligibles.prestationsNationales).toEqual({ acs: { shortLabel: 'ACS', montant: 10 } });
        });

        it('should extract injected droits', function() {
            expect(droits.droitsInjectes).toEqual([{ shortLabel: 'APL' }]);
        });
    });
});
