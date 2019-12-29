/**
 * Provider服务创建存储api
 */
'use strict';
const mongoose = require('mongoose');
const events = require('events');
const extra = {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
};
const { cleanUndefined } = require('@utils/util');

const createPodModel = (tableKey, podSchema) => {
    const schema = new mongoose.Schema(podSchema, extra);
    return mongoose.model(tableKey, schema);
};

// eslint-disable-next-line no-unused-vars
const wrapPod = (store, podAddress) => {
    // warn: 为每个pod实例创造store包裹可能会造成内存泄漏?
    const scope = Object.assign({ indexKey: podAddress }, store);
    return new Proxy(store, {
        get (target, name) {
            if (typeof target[name] === 'function') {
                const func = target[name];
                return func.bind(scope);
            }
            return Reflect.get(target, name);
        }
    });
};

/**
 * @desc 针对不同类型Pod单例导出的服务端Store
 * @class PodStore
 */
class PodStore {
    constructor (tableKey, podSchema) {
        this.model = createPodModel(tableKey, podSchema);
    }

    checkPodExists (query) {
        cleanUndefined(query);
        return this.model.exists(query);
    }

    async fetchPod (query, ...options) {
        const res = await this.model.findOne(query, ...options).exec().catch(err => { throw err; });
        return res;
    }

    async createPod (podData = {}, options = {}) {
        const { address, pubkey } = podData;
        if (!address || !pubkey) {
            throw new Error('required pubkey and address');
        }
        const isExisted = await this.model.exists({ address });
        if (isExisted) throw new Error('Pod already existed');
        const Model = this.model;
        const pod = new Model(podData);
        await pod.save().catch(err => { throw err; });
        return podData;
    }

    async updatePod (query, update, options = {}) {
        return this.model.findOneAndUpdate(query, update, options);
    }

    async removePod (query, options = {}) {
        return this.model.findOneAndRemove(query, options);
    }

    async getPodData (query = { address: this.address }, options = {}) {
        return this.fetchPod(query, options);
    }
};

/**
 * 1.管理各种类型的PodStore
 * 2.在底层api状态发生变化(断开连接，超时)等情况下作出反应
 * @class StoreManager
 * @extends {events}
 */
class StoreManager extends events {
    constructor (props) {
        super();
        this._lib = {};
        // TODO: 监听mongoose事件
    }

    static getInstance () {
        if (!PodStore.instance) {
            PodStore.instance = new StoreManager();
        }
        return PodStore.instance;
    }

    getStoreAPI (podType, podSchema, podAddress) {
        const store = this.getPodStore(podType, podSchema);
        return store;
    }

    getPodStore (podType, podSchema) {
        if (!podType || !podSchema) throw new Error('Must specified pod type and pod schema');
        if (!this._lib[podType]) {
            // deep copy podSchema, or it will be overwritten!!!
            const schema = {};
            for (const key in podSchema) {
                schema[key] = podSchema[key];
            }
            this._lib[podType] = new PodStore(podType, schema);
        }
        return this._lib[podType];
    }
}

module.exports = StoreManager.getInstance();
