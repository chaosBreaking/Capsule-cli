'use strict';
import tools from '@utils/crypto';
import { defaultAccountConfig } from './constants';
import account from '@utils/account';

export default class CryptoAccount {
    constructor (root = {}, option = {}) {
        if (root && typeof root !== 'string') {
            option = root;
            root = '';
        }
        Object.assign(defaultAccountConfig, option);
        const myAccount = root ? account.deriveAccount(root, option) : account.createAccount(option);
        Object.defineProperty(this, 'metadata', {
            writable: false,
            enumerable: false,
            value: myAccount
        });
    }

    static import (key, option) {
        if (!key) throw new Error('expect a secword or seed');
        return new CryptoAccount(key, option);
    }

    get address () {
        return this.metadata.address;
    }

    get pubkey () {
        return this.metadata.pubkey;
    }

    get seckey () {
        return this.metadata.seckey;
    }

    get secword () {
        return this.metadata.secword;
    }

    aesEncrypt (data, key) {
        return tools.encrypt(data, key);
    }

    aesDecrypt (data, key) {
        return tools.decrypt(data, key);
    }

    async eccEncrypt (message, pubkey = this.pubkey) {
        return tools.eccEncrypt(message, pubkey);
    }

    async eccDecrypt (message) {
        return tools.eccDecrypt(message, this.seckey);
    }

    sign (digest) {
        return tools.sign(digest, this.seckey);
    }

    verify (digest, signature, pubkey) {
        return tools.verify(digest, signature, pubkey);
    }
};
