var config = require('../../config');
var mapping = require('./mapping');
var rp = require('request-promise');

var buildOpenFiscaRequest = exports.buildOpenFiscaRequest = mapping.buildOpenFiscaRequest;
function sendToOpenfisca(endpoint) {

    return function(situation, callback) {

        var request;

        
        try {
            request = buildOpenFiscaRequest(situation);
        } catch(e) {
            return callback({
                message: e.message,
                name: e.name,
                stack: e.stack
            });
        }


        Array.prototype.forEach.call(request.individus , function (individu) {
            console.log(individu);
            delete individu.permis_de_conduire;
        })
       
        console.log(request.individus);

        

        rp({
            uri: config.openfiscaURL + '/' + endpoint,
            method: 'POST',
            body: request,
            json: true,
        })
            .then(function(result) {
                callback(null, result);
            }).catch(callback);

        //APISimulateur (request);
    };
}

function APISimulateur (){
    return function (situation, callback){
        
        var request = buildOpenFiscaRequest(situation);
        //var requestURI = "https://www.aide-sociale.fr/simulateur/api.php";
        var requestURI = "http://www.ivoyages.net/simulateur/api.php";
        
        

        rp({
            uri:requestURI,
            method:'POST',
            body:request, 
            json:true
        })

        .then(function(result){
            callback(null  , result);
        })

        .catch(callback);
    };
}

//Requete vers openfisca ludo
exports.simulation_aide_social = APISimulateur();
exports.calculate = sendToOpenfisca('calculate');
exports.trace = sendToOpenfisca('trace');

exports.getParameter = function(parameterId, callback) {
    rp({
        uri: config.openfiscaURL + '/parameter/' + parameterId,
        method: 'GET',
        json: true
    })
        .then(function(result) {
            callback(result);
        });
};
