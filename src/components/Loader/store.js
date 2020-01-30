import { observable, action } from 'mobx';
import BaseStore from '@fundation/BaseStore';

export default class AppStore extends BaseStore {
    @observable loadingInfo;
    @observable isLoading = true;
    @observable initForNew = true;

    constructor (props = {}, getRoots = () => {}) {
        super(props);
    }

    @action.bound
    tick (stage, info) {
        switch (stage) {
        case 'init': this.loadingInfo = '初始化存储...'; break;
        case 'regist': this.loadingInfo = '注册POD到PROVIDER...'; break;
        case 'sync': this.loadingInfo = '同步POD数据...'; break;
        }
    }
}
