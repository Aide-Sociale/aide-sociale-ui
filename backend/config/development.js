'use strict';

module.exports = {
    baseURL: 'https://sd-124918.dedibox.fr:9000',
    openfiscaPublicURL: 'https://sd-124918.dedibox.fr:2000',
    openfiscaTracerURL: 'https://sd-124918.dedibox.fr:3000',
    teleserviceAccessTokens: {
        loiret_APA_test: 'token',
        loiret_APA: 'token',
    },
    mailjet: {
        publicKey: '7d099a10cbab14c68eb43bccff86c5bd',
        privateKey: process.env.MAILJET_PRIVATE_KEY,
    },
};
