'use strict';
const PodId = require('./PodId');
const { PodModel, ValidOp } = require('./constants');
const CryptoAccount = require('./CryptoAccount');
const { defaultPodConfig, TypeMap } = require('./constants');
const PodStoreServer = require('./storeApiServer'); // 在客户端则加载storeApiClient

class CryptoPod extends PodId {
    constructor (props) {
        if (!props.pubkey) {
            throw new Error('pubkey must be specified');
        }
        super(props);
        this.verify = CryptoAccount.prototype.verify;
        this.eccEncrypt = CryptoAccount.prototype.eccEncrypt;
    }
};

class BasePod extends CryptoPod {
    constructor (props = {}) {
        super(props);
        const type = TypeMap[this.address[0]];
        const { data = PodModel[type].data.default, allow = PodModel[type].allow.default, deny = PodModel[type].deny.default } = props;
        Object.defineProperties(this, {
            type: {
                writable: false,
                value: type
            },
            allow: {
                writable: false,
                value: allow
            },
            deny: {
                writable: false,
                value: deny
            },
            data: {
                writable: false,
                value: data
            },
            _Store: {
                writable: false,
                enumerable: false,
                value: PodStoreServer
            }
        });
        this.initStore();
    }

    get tableKey () {
        return defaultPodConfig[this.type].tableKey;
    }

    set tableKey (val) {
        throw new Error('Cannot set tableKey');
    }

    get model () {
        return PodModel[this.type];
    }

    set model (val) {
        throw new Error('Cannot set model');
    }

    get isHydrated () {
        return this._isHydrated;
    }

    initStore () {
        this.storeAPI = this._Store.getStoreAPI(this.tableKey, this.model, this.address);
    }

    static async destroy (address, pubkey) {
        // 根据公钥生成一个pod instance，但是除了id以外没有data,acl信息，需要调用hydrate从数据库补水。
        if (!address || !pubkey) throw new Error('expect a valid address or a valid pubkey');
        return this.storeAPI.removePod({ _id: address, pubkey });
    }

    async hydrate () {
        // 补水，补充一个只具有id的空壳pod的数据。
        // 所以在不读pod数据库里data等数据时 不要调用hydrate，实例化的时候也不会读数据库
        // when dehydrated pod data is imported from database, use hydrate to create a pod instance
        const podData = await this.storeAPI.getPodData({ address: this.address });
        Object.assign(this.data, podData.data);
        Object.defineProperty(this, '_isHydrated', {
            writable: false,
            value: true
        });
        return this;
    }

    dehydrate () {
        // 得到pod在数据库存储的形式，在save之前使用
        // dehydrate pod into a database store format
        const { pubkey, address, allow, deny, data } = this;
        return { pubkey, address, allow, deny, data };
    }

    connect () {
        // 创建一个长链接(tcp, socket.etc)，连接到一个在线pod客户端以完成实时交互操作
        // connect a online pod client and provide realtime service
        return this;
    }

    async regist () {
        // 注册一个新的pod到provider数据库
        // regist a new pod to database
        const storeData = this.dehydrate();
        await this.storeAPI.createPod(storeData);
        return this;
    }

    async save () {
        // 调用数据库api存储dehydrated pod到数据库内
        // save dehydrated pod data to database
        const storeData = this.dehydrate();
        await this.storeAPI.updatePod(this.address, storeData);
        return this;
    }

    update (update, options) {
        // 更新客户端的操作到服务端pod
        // update pod data
        this.storeAPI.updatePod({ address: this.address }, update, options);
        return this;
    }

    sync () {
        // 完全同步客户端pod到服务端
        // sync all pod data with client
    }

    backup () {
        // pod备份
        // backup
    }

    async queryData (options) {
        const { fields = '' } = options;
        const arr = fields.split('.');
        let res = this;
        // eslint-disable-next-line no-unmodified-loop-condition
        while (arr) {
            res = res[arr.shift()] || res;
        }
    }

    async handle (op, ...params) {
        const validOpList = this.validOpList || ValidOp;
        if (validOpList.includes(op)) {
            return this[op](...params);
        }
        throw new Error('Permission denied for operation: ' + op);
    }
};

module.exports = BasePod;
