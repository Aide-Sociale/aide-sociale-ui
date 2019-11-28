'use strict';

module.exports = {
    baseURL: 'https://163.172.111.68:9000',
    openfiscaPublicURL: 'https://163.172.111.68:2000',
    openfiscaTracerURL: 'https://163.172.111.68:3000',
    teleserviceAccessTokens: {
        loiret_APA_test: 'token',
        loiret_APA: 'token',
    },
    mailjet: {
        publicKey: '7d099a10cbab14c68eb43bccff86c5bd',
        privateKey: process.env.MAILJET_PRIVATE_KEY,
    },
};
