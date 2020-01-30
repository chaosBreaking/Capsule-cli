import { observable, action } from 'mobx';
import Event from 'events';
import { createPod } from '@service/core';
import { CryptoAccount } from '@core/base';
import CommonStore from './CommonStore';
// import crypto from '@utils/crypto';
import { fetchPod, fetchData, registPod } from '@service/urlMap';

const DOCUMENT_POD_PATH = "m/44'/0'/2'/0/0";

export default class BaseStore extends CommonStore {
    @observable initialized = false;
    constructor (props = {}) {
        super(props);
        this.EventBus = new Event();
        this._podMap = {};
        this.init();
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

    @action.bound
    init () {
        this._account = localStorage.getItem('ACCOUNT_META');
        this._provider = localStorage.getItem('PROVIDER_META');
        if (!this._account || !this._provider) {
            return;
        }
        this.initialized = true;
        const podAddressList = JSON.parse(localStorage.getItem('POD_ADDRESS_LIST')) || [];
        if (podAddressList.length === 0) return;
        // type 在provider和传输过程中大写，在store实例中转换为小写
        podAddressList.reduce((map, obj) => {
            map[obj.type.toLowerCase()] = createPod(obj.type, obj);
            return map;
        }, this._podMap);
        window.pods = this._podMap; // temporary
        this.initialized = true;
    }

    getAccountInfo (key = '') {
        return this._account[key] || this._account;
    }

    getPod (params) {
        const { type = '', address, pubkey } = params;
        const typedPod = this._podMap[type];
        if (typedPod) {
            return Array.isArray(typedPod)
                ? typedPod.find(item => item.address === address || item.pubkey === pubkey)
                : typedPod;
        }
        // eslint-disable-next-line no-unused-vars
        for (const key in this._podMap) {
            if (Array.isArray(this._podMap[key])) {
                return typedPod.find(item => item.address === address || item.pubkey === pubkey);
            } else {
                const obj = this._podMap[key];
                if (obj.address === address || obj.pubkey === pubkey) {
                    return obj;
                }
            }
        }
        throw new Error('Cannot find the required pod');
    }

    getPodAddress (type = '') {
        return this._podMap[type] && this._podMap[type].address;
    }

    setAccountMetaInfo (data) {
        if (Object.prototype.toString.call(data) === '[object Object]') {
            localStorage.setItem('ACCOUNT_META', JSON.stringify(data));
            return true;
        }
        throw new Error('Invalid meta data');
    }

    /**
     * 将BaseStore内的pod数据存储到本地localStorage
     */
    savePodInfo () {
        const data = Object.keys(this._podMap).map(key => this._podMap[key].dehydrate());
        localStorage.setItem('POD_ADDRESS_LIST', JSON.stringify(data));
    }

    /**
     * 1.创建本地加密账户
     * 2.创建本地存储pod结构
     * @memberof BaseStore
     */
    buildLocalStore () {
        const masterAccount = new CryptoAccount();
        const documentAccount = new CryptoAccount(masterAccount, { path: DOCUMENT_POD_PATH });
        const masterPod = createPod('master', masterAccount);
        const documentPod = createPod('document', documentAccount);
        [masterPod, documentPod].map(pod => {
            this._podMap[pod.type] = pod;
        });
        this.setAccountMetaInfo(masterAccount.metadata);
        this.savePodInfo();
    }

    /**
     * 将本地pod注册到远程provider
     * 如果参数不指定pod，将注册所有未注册的本地pod
     * @param {*} [pod=[]]
     * @memberof BaseStore
     */
    async registPod (pod = []) {
        pod = pod && Array.isArray(pod) ? pod : [pod];
        const podList = [...this.podList, ...pod].filter(item => !item.localData || !item.localData.provider);
        const tasks = podList.map(pod => {
            this.request(registPod, pod.dehydrate()).then(result => {
                pod.localData.provider = result;
            });
        });
        const res = await Promise.all(tasks).catch(err => { throw err; });
        console.log('regist', res);
    }

    async fetchPod (addressList = []) {
        addressList = addressList && Array.isArray(addressList) ? addressList : [addressList];
        const tasks = addressList.map(address => {
            return this.request(fetchPod, { address }).then(res => {
                const data = res.data;
                this.updatePod(data);
            });
        });
        await Promise.all(tasks);
    }

    async fetchData (podQuery) {
        const pod = this.getPod(podQuery);
        const res = await this.request(fetchData, { pubkey: pod.pubkey, type: pod.type });
        return res.data;
    }

    updatePod (data) {
        const { address, pubkey, type } = data;
        if (!address && !type) throw new Error('Cannot update pod with empty address or type');
        const pod = this.getPod({ address, pubkey, type });
        pod.update(data);
        return pod;
    }
}
