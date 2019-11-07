'use strict';

module.exports = {
    baseURL: 'http://163.172.111.68:9000',
    openfiscaPublicURL: 'http://163.172.111.68:2000',
    openfiscaTracerURL: 'http://163.172.111.68:3000',
    teleserviceAccessTokens: {
        loiret_APA_test: 'token',
        loiret_APA: 'token',
    },
    mailjet: {
        publicKey: '7d099a10cbab14c68eb43bccff86c5bd',
        privateKey: process.env.MAILJET_PRIVATE_KEY,
    },
};
