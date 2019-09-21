import { observable, action } from 'mobx';
import BaseStore from '../../fundation/BaseStore';

class Store extends BaseStore {
    @observable currentPath = '/' // 'card' || 'list'
    @observable selected = '' // 'card' || 'list'
    constructor (props = {}) {
        super(props);
    }

    @action.bound
    changePath (path) {
        this.currentPath = path;
    }
}
const store = new Store();

export default store;
