import { observable, action } from 'mobx';
import CommonStore from '@fundation/CommonStore';

export default class Store extends CommonStore {
    @observable currentPath = '/' // 'card' || 'list'
    @observable selected = '' // 'card' || 'list'
    @observable active = '' // 'card' || 'list'

    @action.bound
    changePath (path) {
        this.currentPath = path;
    }
}
