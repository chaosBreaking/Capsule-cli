'use strict';

import tools from './crypto';

export default {
    createAccount (option = {}) {
        const type = option.type;
        const secword = tools.randomSecword();
        const keypair = tools.secword2keypair(secword, { ...option, type });
        return {
            type,
            path: 'master',
            seed: tools.secword2seed(secword),
            secword,
            ...keypair,
            address: tools.pubkey2address(keypair.pubkey, { ...option, type })
        };
    },
    deriveAccount (key, option = {}) {
        // can only use seed or secword, one secword can be derived into many private keys.
        const { type = 'BTC', path = 'master', prefix } = option;
        if (!type || !key) throw new Error('Invalid Params');
        let seed, secword, keypair;
        if (tools.isSeed(key)) {
            seed = key;
            keypair = {};
            keypair.seckey = tools.seed2seckey(seed);
            keypair.pubkey = tools.seckey2pubkey(keypair.seckey);
        } else if (tools.isSecword(key)) {
            secword = key;
            seed = tools.secword2seed(secword);
            keypair = tools.secword2keypair(secword, { type, path });
        } else {
            throw new Error('Invalid key, expect seed or secword');
        }
        return {
            type,
            path,
            seed,
            secword,
            ...keypair,
            address: tools.pubkey2address(keypair.pubkey, { type, prefix }),
        };
    },
    createRsaAccount () {
        return tools.randomRsaKeypair();
    }
};
