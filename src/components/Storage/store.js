import { observable, action, computed } from 'mobx';
import CommonStore from '@fundation/CommonStore';

export default class AppStore extends CommonStore {
    @observable containerType = 'card' // 'card' || 'list'
    @observable sortedFileList = []
    @observable uploadZoneActive = false
    @observable isShowInput = false
    @observable inputValue = ''
    @observable podData = {};
    @observable activePath = '';
    @observable currentFoder = '';

    constructor (props = {}, getRoot = () => {}) {
        super();
        this.getRoot = getRoot;
        this.mounted = false;
        this.fileStack = [];
        this.documentPod = this.rootStore.getPod({ type: 'document' });
        Object.assign(this.podData, this.documentPod.data);
        this.currentFoder = this.foderList[0];
    }

    @computed get foderList () {
        return Object.keys(this.podData).map((foderTitle, index) => {
            const foder = this.documentPod.data[foderTitle];
            const { data, children } = foder;
            return {
                title: foderTitle,
                data,
                children,
                index
            };
        });
    }

    @computed get currentFilesList () {
        const target = this.activePath ? this.path2Target(this.activePath) : this.foderList[0];
        return Object.keys(target.data).reduce((acc, key) => acc.concat(target.data[key]), []);
    }

    path2Target (path) {
        return path.split('/').reduce((acc, currPath) => {
            return acc && acc[currPath] ? acc[currPath] : acc;
        }, this.podData);
    }

    @action.bound
    change = () => {
        this.containerType = this.containerType === 'list' ? 'card' : 'list';
    }

    @action.bound
    sort = (prop = 'name', rule = 'desc') => {
        const arr = rule === 'desc' ? [-1, 1, 0] : [1, -1, 0];
        this.sortedFileList = this.fileStack.sort((a, b) => {
            return a[prop] < b[prop] ? arr[0] : a[prop] > b[prop] ? arr[1] : arr[2];
        });
    }

    @action.bound
    showUploadZone = () => {
        this.uploadZoneActive = true;
    }

    @action.bound
    hideUploadZone = () => {
        this.uploadZoneActive = false;
    }

    @action.bound
    changeInput = e => {
        e.stopPropagation();
        this.inputValue = e.target.value;
    }

    @action.bound
    createFoder = () => {
        if (!this.inputValue) return;
        this.inputValue = this.inputValue.trim();
        const path = this.activePath.endsWith('/') ? this.activePath.slice(0, this.activePath.length - 1) : this.activePath;
        this.documentPod.createFoder({ title: this.inputValue, path });
        this.podData = this.documentPod.data;
        this.isShowInput = false;
        this.inputValue = '';
    }

    @action.bound
    setActiveFoder = path => {
        this.activePath = path;
    }

    @action.bound
    uploadResultHandler = fileArray => {
        this.documentPod.addFile(this.activePath, fileArray);
        this.podData = this.documentPod.data;
    }
}
