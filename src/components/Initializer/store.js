import { observable, action, runInAction } from 'mobx';
import CommonStore from '@fundation/CommonStore';
import { createPod } from '@service/core';
import { CryptoAccount } from '@core/base';
// import crypto from '@utils/crypto';

const DOCUMENT_POD_PATH = "m/44'/0'/2'/0/0";

export default class AppStore extends CommonStore {
    @observable loadingInfo;
    @observable isLoading = true;
    @observable currentStep = 0;
    @observable completed = {};
    @observable isShowToast = false;
    @observable toastMessage;
    @observable podConfig = [
        {
            label: 'pod同步到远程',
            checked: true,
            value: 'sync',
            disabled: false
        },
        {
            label: '本地对pod加密',
            checked: true,
            value: 'encrypt',
            disabled: false
        }
    ];

    @observable selectedProvider;
    @observable providerList = [
        {
            label: '默认节点',
            value: '101.132.121.111:6842'
        }
    ];

    constructor (props = {}, getRoots = () => {}) {
        super(props);
        this._podMap = {};
        this.getRoots = getRoots;
    }

    get rootStore () {
        return this.getRoots();
    }

    get steps () {
        return [
            '创建加密元账户',
            '配置存储POD策略',
            '选择远程存储服务提供节点'
        ];
    }

    @action.bound
    showToast = message => {
        this.toastMessage = message;
        this.isShowToast = true;
        setTimeout(() => {
            runInAction(() => {
                this.isShowToast = false;
            });
        }, 2000);
    }

    @action.bound
    stepBack = step => {
        this.currentStep = typeof step !== 'undefined' ? step : this.currentStep - 1;
    }

    @action.bound
    nextStep = step => {
        if (this.currentStep + 1 === this.steps.length) {
            this.handleFinished();
        } else {
            this.currentStep = typeof step !== 'undefined' ? step : this.currentStep + 1;
        }
    }

    @action.bound
    setCompleted = index => {
        this.completed[index] = true;
    }

    @action.bound
    handleFinished () {
        // save configuration
        const podConfig = this.podConfig.reduce((acc, curr) => {
            acc[curr.value] = curr.checked;
            return acc;
        }, {});
        const providerConfig = {
            list: [...this.providerList]
        };
        const data = {
            podConfig,
            providerConfig,
        };
        localStorage.setItem('CONFIGURATION', JSON.stringify(data));
        localStorage.setItem('PROVIDER_META', JSON.stringify(providerConfig.list));
        this.rootStore.init();
    }

    /**
     * 将BaseStore内的pod数据存储到本地localStorage
     */
    @action.bound
    savePodInfo () {
        const data = Object.keys(this._podMap).map(key => this._podMap[key].dehydrate());
        localStorage.setItem('POD_ADDRESS_LIST', JSON.stringify(data));
    }

    setAccountMetaInfo (data) {
        if (Object.prototype.toString.call(data) === '[object Object]') {
            localStorage.setItem('ACCOUNT_META', JSON.stringify(data));
            return true;
        }
        throw new Error('Invalid meta data');
    }

    /**
     * 1.创建本地加密账户
     * 2.创建本地存储pod结构
     * @memberof BaseStore
     */
    buildLocalStore () {
        if (this.initialized) return;
        const masterAccount = new CryptoAccount();
        const documentAccount = new CryptoAccount(masterAccount, { path: DOCUMENT_POD_PATH });
        const masterPod = createPod('master', masterAccount);
        const documentPod = createPod('document', documentAccount);
        [masterPod, documentPod].map(pod => {
            this._podMap[pod.type] = pod;
        });
        this.accountInfo = masterAccount;
        this.setAccountMetaInfo(masterAccount.metadata);
        this.savePodInfo();
        this.initialized = true;
    }
}
