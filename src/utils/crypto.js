'use strict';
import crypto from 'crypto';
import sha3 from 'js-sha3';
import ethers from 'ethers';
import nacl from 'tweetnacl';
import eccrypto from 'eccrypto';
import bs58check from 'bs58check';
import Secword from 'bitcore-mnemonic'; // https://bitcore.io/api/mnemonic/   https://github.com/bitpay/bitcore-mnemonc

// const bip39 = require('bip39') // https://github.com/bitcoinjs/bip39 // 有更多语言，但不方便选择语言，也不能使用 pass
// const HDKey = require('hdkey') // https://github.com/cryptocoinjs/hdkey // 或者用 bitcore-mnemonic 或者 ethers 里的相同功能

// 全部以hex为默认输入输出格式，方便人的阅读，以及方便函数之间统一接口

const _default = {};
_default.HASHER = 'sha3-256'; // 默认的哈希算法。could be md5, sha1, sha256, sha512, ripemd160。 可用 Crypto.getHashes/Ciphers/Curves() 查看支持的种类。
_default.HASHER_LIST = crypto.getHashes();
_default.CIPHER = 'aes-256-gcm'; // 默认的加解密算法
_default.CIPHER_LIST = crypto.getCiphers();
_default.CURVE = 'secp256k1'; // 默认的ECDH曲线，用于把私钥转成公钥。
_default.CURVE_LIST = ['secp256k1']; // crypto.getCurves() 引入到浏览器里后出错，不支持 getCurves.
_default.OUTPUT = 'hex'; // 默认的哈希或加密的输入格式
_default.OUTPUT_LIST = { hex: 'hex', latin1: 'latin1', base64: 'base64', buffer: undefined }; // or 'buf' to Buffer explicitly
_default.INPUT = 'utf8'; // 默认的加密方法的明文格式。utf8 能够兼容 latin1, ascii 的情形
_default.INPUT_LIST = ['utf8', 'ascii', 'latin1']; // ignored for Buffer/TypedArray/DataView
_default.COIN = 'BTC'; // 默认的币种
_default.COIN_LIST = ['BTC', 'ETH'];
_default.IV = Buffer.from('aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpP'); // 初始向量，默认32字节
_default.BTC_PATH = "m/44'/0'/0'/0/0";
_default.ETH_PATH = "m/44'/60'/0'/0/0";

export default {
    _default,
    hash (data, option = { hasher: 'sha3_256' }) {
        // data can be anything, but converts to string or remains be Buffer/TypedArray/DataView
        if (typeof data !== 'boolean' && data !== Infinity) {
            if (typeof (data) !== 'string' && !(data instanceof Buffer) && !(data instanceof DataView)) { data = JSON.stringify(data); }
            if (option.salt && typeof option.salt === 'string') { data = data + this.hash(option.salt); }
            if (sha3[option.hasher]) return sha3[option.hasher](data);
            const hasher = _default.HASHER_LIST.includes((option.hasher)) ? option.hasher : _default.HASHER;
            const inputEncoding = _default.INPUT_LIST.includes((option.input)) ? option.input : _default.INPUT; // 'utf8', 'ascii' or 'latin1' for string data, default to utf8 if not specified; ignored for Buffer, TypedArray, or DataView.
            const outputEncoding = _default.OUTPUT_LIST[option.output] || _default.OUTPUT;
            return crypto.createHash(hasher).update(data, inputEncoding).digest(outputEncoding);
        }
        return null;
    },
    isHashable (data, option = {}) {
        // 严格模式允许大多数类型，除了空值、布尔值、无限数
        // 非严格模式允许除undefined之外的类型
        return option.strict ? data && typeof (data) !== 'boolean' && data !== Infinity : typeof (data) !== 'undefined';
    },
    isHash (hash, type) {
        const hasher = _default.HASHER_LIST.includes(type) ? type : _default.HASHER;
        switch (hasher) {
        case 'md5': return /^[a-fA-F0-9]{32}$/.test(hash);
        case 'sha256': return /^[a-fA-F0-9]{64}$/.test(hash);
        case 'sha512': return /^[a-fA-F0-9]{128}$/.test(hash);
        case 'sha3-224': return /^[a-fA-F0-9]{56}$/.test(hash);
        case 'sha3-256': return /^[a-fA-F0-9]{64}$/.test(hash);
        case 'sha3-384': return /^[a-fA-F0-9]{96}$/.test(hash);
        case 'sha3-512': return /^[a-fA-F0-9]{128}$/.test(hash);
        case 'ripemd160': case 'sha1': return /^[a-fA-F0-9]{40}$/.test(hash);
        }
        return false;
    },
    isSignature (signature, type = 'secp256k1') {
        switch (type) {
        case 'secp256k1': return /^[a-fA-F0-9]{128}$/.test(signature);
        default: return /^[a-fA-F0-9]{128}$/.test(signature);
        }
    },
    isSeed (seed) {
        return /^[a-fA-F0-9]{128}$/.test(seed);
    },
    isSecword (secword) {
        return Secword.isValid(secword);
    },
    isSeckey (seckey) {
        // 比特币、以太坊的私钥：64 hex
        // nacl.sign 的私钥 128 hex, nacl.box 的私钥 64 hex
        return /^([a-fA-F0-9]{128}|[a-fA-F0-9]{64})$/.test(seckey);
    },
    isPubkey (pubkey) {
        // 比特币的公钥：压缩型 '02|03' + 64 hex 或 无压缩型 '04' + 128 hex
        // 以太坊的公钥：'02|03' + 64 hex
        // nacl.sign 的公钥：64 hex
        pubkey = Buffer.isBuffer(pubkey) ? pubkey.toString('hex') : pubkey;
        return /^((02|03)?[a-fA-F0-9]{64}|04[a-fA-F0-9]{128})$/.test(pubkey.startsWith('0x') ? pubkey.slice(2) : pubkey); // "d2f186a630f5558ba3ede10a4dd0549da5854eab3ed28ee8534350c2535d38b0"
    },
    isAddress (address) {
        return /^[m|t|d|T][123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{33}$/.test(address); // && address.length>25 && bs58check.decode(address.slice(1)) && ['A'].indexOf(address[0]>=0)) {
    },
    sign (message, seckey) {
        const signingKey = new ethers.utils.SigningKey(seckey);
        const messageBytes = ethers.utils.toUtf8Bytes(message);
        const digest = this.hash(messageBytes);
        return signingKey.signDigest(digest);
    },
    verify (message, signature, pubkey) { // message could be anything, but converts to string or remains be Buffer/TypedArray/DataView
        const digest = this.hash(message);
        const address = ethers.utils.verifyMessage(digest, signature);
        if (!this.isPubkey(pubkey)) return pubkey === address;
        else return this.pubkey2address(pubkey, { type: 'ETH' });
    },
    encrypt (data, pwd, option = {}) {
        // 使用crypto.createCipheriv需要提供一个初始向量iv，而且加解密时必须使用同一个，对aes-256其key长度为32字节
        if (this.isHashable(data) && typeof pwd === 'string') {
            const inputEncoding = _default.INPUT_LIST.includes(option.input) ? option.input : _default.INPUT; // 'utf8' by default, 'ascii', 'latin1' for string  or ignored for Buffer/TypedArray/DataView
            const outputEncoding = _default.OUTPUT_LIST[option.output] || _default.OUTPUT; // 'latin1', 'base64', 'hex' by default or 'buf' to Buffer explicitly
            const algorithm = _default.CIPHER_LIST.includes((option.cipher)) ? option.cipher : _default.CIPHER;
            const iv = option.iv || _default.IV;
            const key = Buffer.from(this.hash(pwd, { hasher: 'sha3_256' }), 'hex');
            const cipher = crypto.createCipheriv(algorithm, key, iv);
            if (typeof (data) !== 'string' && !(data instanceof Buffer) && !(data instanceof DataView)) { data = JSON.stringify(data); }
            let encrypted = cipher.update(data, inputEncoding, outputEncoding);
            encrypted += cipher.final(outputEncoding);
            return encrypted;
        }
        return null;
    },
    decrypt (data, pwd, option = {}) { // data 应当是 encrypt 输出的数据类型
        if (data && (typeof (data) === 'string' || data instanceof Buffer) && typeof (pwd) === 'string') {
            const inputEncoding = _default.OUTPUT_LIST[option.input] || _default.OUTPUT; // input (=output of encrypt) could be 'latin1', 'base64', 'hex' by default for string or ignored for Buffer
            const outputEncoding = _default.OUTPUT_LIST[option.output] || _default.INPUT; // 'latin1', 'base64', 'hex' by default or 'buf' to Buffer explicitly
            const algorithm = _default.CIPHER_LIST.includes((option.cipher)) ? option.cipher : _default.CIPHER;
            const iv = option.iv || _default.IV;
            const key = Buffer.from(this.hash(pwd, { hasher: 'sha3_256' }), 'hex');
            const decipher = crypto.createCipheriv(algorithm, key, iv);
            let decrypted = decipher.update(data, inputEncoding, outputEncoding);
            decrypted += decipher.final(outputEncoding); // 但是 Buffer + Buffer 还是会变成string
            try {
                return JSON.parse(decrypted);
            } catch (exception) {
                return decrypted;
            }
        }
        return null;
    },
    secword2keypair (secword, option = { type: _default.COIN, path: 'master' }) {
        if (Secword.isValid(secword)) {
            const { type = _default.COIN, path = 'master', pass = '' } = option;
            // 用 bip39 算法从 secword 到种子，再用 bip32 算法从种子到根私钥。这是比特币、以太坊的标准方式，结果一致。
            const hdmaster = new Secword(secword).toHDPrivateKey(pass); // 和 ethers.HDNode.fromMnemonic(secword)的公私钥一样。而 ethers.HDNode.fromMnemonic(secword).derivePath("m/44'/60'/0'/0/0")的公私钥===ethers.Wallet.fromMnemonic(secword [,"m/44'/60'/0'/0/0"])
            let key = hdmaster;
            let finalPath = path;
            if (!path) {
                switch (type.toUpperCase()) {
                case 'BTC': finalPath = _default.BTC_PATH; key = hdmaster.derive(finalPath); break;
                case 'ETH': finalPath = _default.ETH_PATH; key = hdmaster.derive(finalPath); break;
                default: finalPath = _default.ETH_PATH; key = hdmaster.derive(finalPath); break;
                }
            } else { // 指定了路径 option.path，例如 "m/44'/0'/0'/0/6" 或 "m/0/2147483647'/1"
                key = path === 'master' ? hdmaster : hdmaster.derive(path);
            }
            return {
                type,
                path: finalPath,
                seckey: key.privateKey.toString('hex'), // 或者 key.toJSON().privateKey。或者 key.privateKey.slice(2) 删除开头的'0x'如果是ethers.HDNode.fromMnemonic(secword)的结果
                pubkey: key.publicKey.toString('hex')
            };
        }
        return null;
    },
    seckey2pubkey (seckey, option = {}) {
        if (this.isSeckey(seckey) && seckey.length === 64) {
            // 只能用于32字节的私钥（BTC, ETH)
            const { curve = _default.CURVE, compress = 'compressed' } = option;
            return new crypto.ECDH(curve).setPrivateKey(seckey, 'hex').getPublicKey('hex', compress).toString('hex'); // ecdh.getPublicKey(不加参数) 默认为 'uncompressed'
        }
        return null;
    },
    secword2account (secword, option = { type: '' }) { // account 比 keypair 多了 address 字段。
        option.type = _default.COIN_LIST.includes((option.type.toUpperCase())) ? option.type : _default.COIN;
        const kp = this.secword2keypair(secword, option);
        if (kp) {
            kp.address = this.pubkey2address(kp.pubkey, option);
            return kp;
        }
        return null;
    },
    secword2address (secword, option = { type: '' }) {
        option.type = _default.COIN_LIST.includes((option.type.toUpperCase())) ? option.type : _default.COIN;
        const kp = this.secword2keypair(secword, option);
        if (kp) {
            return this.pubkey2address(kp.pubkey, option);
        }
        return null;
    },
    pubkey2address (pubkey = '', option = {}) { // pubkey 应当是string类型
        if (this.isPubkey(pubkey)) {
            pubkey = pubkey.split('0x').slice(-1)[0];
            const { type = 'BTC', netType = 'mainnet', curve = _default.CURVE } = option;
            const h256 = crypto.createHash('sha256').update(Buffer.from(pubkey, 'hex')).digest();
            const h160 = crypto.createHash('ripemd160').update(h256).digest('hex');
            let prefix = option.prefix;
            if (type.toUpperCase() === 'BTC') {
                if (!prefix) {
                    switch (netType) {
                    case 'mainnet': prefix = '00'; break; // 1
                    case 'testnet': prefix = '6f'; break; // m or n
                    case 'p2sh': prefix = '05'; break; // 3
                    default: prefix = '00';
                    }
                }
                return bs58check.encode(Buffer.from(prefix + h160, 'hex')); // wallet import format
            } else if (type.toUpperCase() === 'ETH') {
                const uncompressedPubkey = crypto.ECDH.convertKey(pubkey, curve, 'hex', 'buffer', 'uncompressed');
                return '0x' + sha3.keccak256(uncompressedPubkey.slice(1)).slice(24);
            }
        }
        return null;
    },
    seed2seckey (seed) {
        if (this.isSeed(seed)) {
            return Secword.bitcore.HDPrivateKey.fromSeed(seed, 'livenet').privateKey.toString();
        }
        return null;
    },
    secword2seed (secword, pass) { // 遵循bip39的算法。和 ether.HDNode.mnemonic2Seed 结果一样，是64字节的种子。
        if (Secword.isValid(secword)) { //  bip39.validateMnemonic(secword)) {
            return new Secword(secword).toSeed(pass).toString('hex'); // 结果一致于 bip39.mnemonicToSeedHex(secword) 或 ethers.HDNode.mnemonic2Seed(secword)
        }
        return null;
    },
    randomSecword (lang = '') {
        // Secword.Words => [ 'CHINESE', 'ENGLISH', 'FRENCH', 'ITALIAN', 'JAPANESE', 'SPANISH' ]
        // eslint-disable-next-line no-prototype-builtins
        lang = Secword.Words.hasOwnProperty(lang.toUpperCase()) ? lang.toUpperCase() : 'ENGLISH';
        return new Secword(Secword.Words[lang]).phrase;
    },
    randomSeckey () {
        return Buffer.from(nacl.box.keyPair().secretKey).toString('hex'); // 32字节
    },
    randomKeypair () {
        const kp = nacl.box.keyPair();
        const seckey = Buffer.from(kp.secretKey).toString('hex');
        const pubkey = this.seckey2pubkey(seckey);
        return {
            seckey, pubkey
        };
    },
    randomRsaKeypair (length, option = {}) {
        const defaultKeyEncoding = {
            type: 'pkcs1',
            format: 'pem'
        };
        const { output = 'pem', publicKeyEncoding = defaultKeyEncoding, privateKeyEncoding = defaultKeyEncoding } = option;
        // type => ['pkcs1', 'spki']
        // format => ['pem', 'der']
        Object.assign(publicKeyEncoding, { format: output });
        Object.assign(privateKeyEncoding, { format: output });
        return new Promise((resolve, reject) => {
            crypto.generateKeyPair('rsa', {
                modulusLength: 512,
                publicKeyEncoding,
                privateKeyEncoding
            }, (err, pubkey, seckey) => {
                if (err) return reject(err);
                resolve({
                    pubkey, seckey
                });
            });
        });
    },
    randomString (length = 6, alphabet) { // 长度为 length，字母表为 alphabet 的随机字符串
        alphabet = alphabet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%^&*@';
        var text = '';
        for (var i = 0; i < length; i++) {
            text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return text;
    },
    randomBytes (length = 8) {
        return nacl.randomBytes(length);
    },
    rsaSign (string2Sign, prikey, signType = 'RSA-SHA256') {
        const signer = crypto.createSign(signType);
        return encodeURIComponent(signer.update(string2Sign).sign(prikey, 'hex'));
    },
    rsaVerify (string2Verify, sig, pubkey, signType = 'RSA-SHA256') {
        const verifier = crypto.createVerify(signType);
        return verifier.update(string2Verify).verify(pubkey, sig, 'hex');
    },
    async eccEncrypt (data, pubkey) {
        pubkey = Buffer.isBuffer(pubkey) ? pubkey : Buffer.from(pubkey, 'hex');
        const encrypted = await eccrypto.encrypt(pubkey, Buffer.from(data));
        return encrypted;
    },
    async eccDecrypt (data, seckey) {
        // data 必须是eccEncrypt的结果类型
        seckey = Buffer.isBuffer(seckey) ? seckey : Buffer.from(seckey, 'hex');
        const decrypted = await eccrypto.decrypt(seckey, data);
        return decrypted;
    },
    // the format of rsa kepair which is used to encrypt and decrypt need to be 'pem'
    rsaPubkeyEncrypt (data, pubkey) {
        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }
        return crypto.publicEncrypt(pubkey, Buffer.from(data));
    },
    rsaSeckeyEncrypt (data, seckey) {
        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }
        return crypto.privateEncrypt(seckey, Buffer.from(data));
    },
    rsaPubkeyDecrypt (data, pubkey) {
        const res = crypto.publicDecrypt(pubkey, Buffer.from(data));
        try {
            return JSON.parse(res);
        } catch (error) {
            return res;
        }
    },
    rsaSeckeyDecrypt (data, seckey) {
        const res = crypto.privateDecrypt(seckey, Buffer.from(data));
        try {
            return JSON.parse(res);
        } catch (error) {
            return res;
        }
    }
};
