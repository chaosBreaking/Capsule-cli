import { observable, action } from 'mobx';
import CommonStore from '@fundation/CommonStore';
import navigation from '@utils/navigation';

export default class AppStore extends CommonStore {
    @observable loadingInfo;
    @observable isLoading = true;
    @observable initForNew = true;

    constructor (props = {}, getRoot = () => {}) {
        super(props);
        this.getRoot = getRoot;
    }

    @action.bound
    tick (stage, info) {
        switch (stage) {
        case 'init': this.loadingInfo = '初始化存储...'; break;
        case 'regist': this.loadingInfo = '注册POD到PROVIDER...'; break;
        case 'sync': this.loadingInfo = '同步POD数据...'; break;
        case 'offline': this.loadingInfo = '网络异常或无法连接到Provider'; break;
        }
    }

    forward () {
        navigation.forward('/cloud');
    }

    async init () {
        this.tick('init');
        try {
            if (!Object.keys(this.rootStore.register).length) {
                this.tick('regist');
                await this.rootStore.registPod().catch(err => { throw err; });
            }
            this.tick('sync');
            await this.rootStore.syncPod().catch(err => { throw err; });
            this.forward();
        } catch (error) {
            this.tick('offline');
            this.isLoading = false;
        }
    }
}
