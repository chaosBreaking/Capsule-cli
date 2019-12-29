'use strict';

const tools = require('@utils/crypto');
const { defaultPodConfig } = require('./constants');

const CID_LENGTH = 46;
const isValidCID = cid => cid.length === CID_LENGTH && cid.startsWith('Qm');
module.exports = class PodId {
    constructor (props = {}) {
        const { pubkey, prefix = defaultPodConfig.prefix } = props;
        if (!pubkey) throw new Error('Pubkey required!');
        const address = tools.pubkey2address(Buffer.isBuffer(pubkey) ? pubkey : pubkey.toString('hex'), { prefix });
        Object.defineProperties(this, {
            _cid: {
                enumerable: false,
                value: ''
            },
            _address: {
                enumerable: false,
                writable: false,
                value: Buffer.from(address)
            },
            _pubkey: {
                enumerable: false,
                writable: false,
                value: Buffer.from(pubkey)
            }
        });
    }

    set cid (value) {
        if (isValidCID(value)) {
            this._cid = value;
        }
    }

    get id () {
        return this.address;
    }

    get cid () {
        return this._cid;
    }

    get address () {
        return this._address.toString();
    }

    get pubkey () {
        return this._pubkey.toString();
    }

    isValidCID (cid) {
        return isValidCID(cid);
    }
};
