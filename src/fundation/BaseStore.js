// import { observable, action } from 'mobx';
import Event from 'events';
import { createPod } from '@service/core';
import { CryptoAccount } from '@core/base';
import axios from 'axios';
import cp from '@utils/crypto';

const DOCUMENT_POD_PATH = "m/44'/0'/2'/0/0";

export default class BaseStore {
    constructor (props = {}) {
        this.EventBus = new Event();
        this.podMap = {};
        this.init();
        window.cp = cp;
    }

    async init () {
        const podAddressList = JSON.parse(localStorage.getItem('POD_ADDRESS_LIST')) || [];
        if (podAddressList.length === 0) return;
        podAddressList.reduce((map, obj) => {
            map[obj.type] = createPod(obj.type, obj);
            return map;
        }, this.podMap);
        const masterPodAddress = JSON.parse(localStorage.getItem('POD_ADDRESS_MASTER'));
        if (masterPodAddress) {
            this.masterPodAddress = masterPodAddress;
        }
        this.syncData();
    }

    get masterAddress () {
        return this.podMap.master && this.podMap.master.address;
    }

    syncData () {
        // const
        console.log(this.podMap);
    }

    getPodAddress (type = '') {
        return this.podMap[type] && this.podMap[type].address;
    }

    buildUserStore () {
        const masterAccount = new CryptoAccount();
        const documentAccount = new CryptoAccount(masterAccount, { path: DOCUMENT_POD_PATH });
        const masterPod = createPod('master', masterAccount);
        const documentPod = createPod('document', documentAccount);
        const podAddressList = [masterPod, documentPod].map(pod => {
            const { type, address, pubkey } = pod;
            this.podMap[type] = pod;
            return { type, address, pubkey };
        });
        localStorage.setItem('ACCOUNT_META', JSON.stringify(masterAccount.metadata));
        localStorage.setItem('POD_ADDRESS_LIST', JSON.stringify(podAddressList));
    }
}
