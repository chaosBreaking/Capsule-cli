/**
 * 客户端创建pod存储api
 */
'use strict';
import events from 'events';

class PodStore {
    constructor (tableKey, podSchema, podAddress) {
        this.indexKey = podAddress;
    }

    update (update) {
    }

    remove (query) {
    }

    getPodData (options = {}) {
        const { address } = options;
        try {
            if (!this._data) {
                this._data = JSON.parse(localStorage.getItem(address));
            }
            return this._data;
        } catch (error) {
            return error;
        }
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

export default StoreManager.getInstance();
