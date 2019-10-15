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
        rp({
            uri: config.openfiscaURL + '/' + endpoint,
            method: 'POST',
            body: request,
            json: true,
        })
            .then(function(result) {
                callback(null, result);
            }).catch(callback);

        APISimulateur (request);
    };
}

function APISimulateur (request){
        var requestURI = "https://www.aide-sociale.fr/simulateur/api.php";
        console.log(requestURI);
        rp({
            uri:requestURI,
            method:'POST',
            body:request, 
            json:true
        })
        .then(function(result){
            console.log(result);
        })
        .catch(function (err) {
            console.log(err);
        });
}
//Requete vers openfisca ludo
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
