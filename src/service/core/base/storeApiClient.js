/**
 * 客户端创建pod存储api
 */
'use strict';
const events = require('events');
class PodStore {
    constructor (tableKey, podSchema, podAddress) {
        this.indexKey = podAddress;
    }

    update (update) {
    }

    remove (query) {
    }

    getPodData () {
    }
};

class StoreManager extends events {
    constructor (props) {
        super();
        this._lib = {};
    }

    static getInstance () {
        if (!PodStore.instance) {
            PodStore.instance = new StoreManager();
        }
        return PodStore.instance;
    }

    getStoreAPI (tableKey, podSchema, podAddress) {
        if (!this._lib[tableKey]) {
            this._lib[tableKey] = new PodStore(tableKey, podSchema, podAddress);
        }
        return this._lib[tableKey];
    }
}

module.exports = StoreManager.getInstance();
