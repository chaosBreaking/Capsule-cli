import { observable, action } from 'mobx';
import BaseStore from '@fundation/BaseStore';

export default class AppStore extends BaseStore {
    @observable isLoading = true;
    @observable sortedFileList = []
    @observable uploadZoneActive = false

    constructor (props = {}, getRoots = () => {}) {
        super(props);
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
