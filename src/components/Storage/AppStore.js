import { observable, action } from 'mobx';
import BaseStore from '../../fundation/BaseStore';
import { getFileList } from '../../service/file';

export default class AppStore extends BaseStore {
    @observable containerType = 'list' // 'card' || 'list'
    @observable sortedFileList = []
    @observable uploadZoneActive = false
    constructor (props = {}) {
        super(props);
        this.mounted = false;
        this.fileStack = [];
        this.initFileStore();
    }

    initFileStore () {
        this.fileStack = getFileList();
        this.sort();
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
}
