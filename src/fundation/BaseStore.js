// import { observable, action } from 'mobx';
import Event from 'events';
import { createPod } from '@service/core';
import { CryptoAccount } from '@core/base';
import CommonStore from './CommonStore';
// import crypto from '@utils/crypto';
import { fetchPod, fetchData, registPod } from '@service/urlMap';

const DOCUMENT_POD_PATH = "m/44'/0'/2'/0/0";

export default class BaseStore extends CommonStore {
    constructor (props = {}) {
        super(props);
        this.EventBus = new Event();
        this._podMap = {};
        this._account = localStorage.getItem('ACCOUNT_META');
        this.init();
    }

    get initialized () {
        return this._account;
    }

    getAccountInfo (key = '') {
        return this._account[key] || this._account;
    }

    async init () {
        const podAddressList = JSON.parse(localStorage.getItem('POD_ADDRESS_LIST')) || [];
        if (podAddressList.length === 0) return;
        podAddressList.reduce((map, obj) => {
            const pod = createPod(obj.type, obj);
            pod.localData = obj.localData;
            map[obj.type] = pod;
            return map;
        }, this._podMap);
        window.pods = this._podMap;
    }

    get masterAddress () {
        return this._podMap.master && this._podMap.master.address;
    }

    get podList () {
        return Object.keys(this._podMap).reduce((arr, type) => {
            const data = Array.isArray(this._podMap[type]) ? this._podMap[type] : [this._podMap[type]];
            return [...data, ...arr];
        }, []);
    }

    savePodInfo () {
        const podList = Object.keys(this._podMap).map(key => {
            const pod = this._podMap[key];
            return { ...pod.localData, ...pod.dehydrate() };
        });
        localStorage.setItem('POD_ADDRESS_LIST', JSON.stringify(podList));
    }

    getPod (params) {
        const { type = '', address, pubkey } = params;
        const typedPod = this._podMap[type.toUpperCase()];
        if (typedPod) {
            return Array.isArray(typedPod)
                ? typedPod.find(item => item.address === address || item.pubkey === pubkey)
                : typedPod;
        }
    }

    async registPod (pod = []) {
        pod = pod && Array.isArray(pod) ? pod : [pod];
        const podList = [...this.podList, ...pod].filter(item => !item.localData || !item.localData.provider);
        const tasks = podList.map(pod => {
            this.request(registPod, pod.dehydrate());
        });
        const res = await Promise.all(tasks);
        console.log('regist', res);
    }

    async fetchData (podQuery) {
        const pod = this.getPod(podQuery);
        await this.request(fetchData, { pubkey: pod.pubkey, type: pod.type });
    }

    getPodAddress (type = '') {
        return this._podMap[type] && this._podMap[type].address;
    }

    /**
     * 创建本地加密账户
     * 创建本地存储pod结构
     * @memberof BaseStore
     */
    buildUserStore () {
        const masterAccount = new CryptoAccount();
        const documentAccount = new CryptoAccount(masterAccount, { path: DOCUMENT_POD_PATH });
        const masterPod = createPod('master', masterAccount);
        const documentPod = createPod('document', documentAccount);
        const podAddressList = [masterPod, documentPod].map(pod => {
            const { type, address, pubkey } = pod;
            this._podMap[type] = pod;
            return { type, address, pubkey, localData: {} };
        });
        localStorage.setItem('ACCOUNT_META', JSON.stringify(masterAccount.metadata));
        localStorage.setItem('POD_ADDRESS_LIST', JSON.stringify(podAddressList));
    }
}
