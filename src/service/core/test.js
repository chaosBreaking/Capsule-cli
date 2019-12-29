const Acc = require('./base/CryptoAccount');
const { createPod } = require('./');
const assert = require('assert');

const a = new Acc();
const pubkey = a.pubkey;
const keys = ['master', 'document', 'post'];
keys.map(key => {
    const pod = createPod(key, { pubkey });
    assert.strictEqual(pod.type, key.toUpperCase());
});
