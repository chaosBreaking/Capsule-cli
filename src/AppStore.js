import { observable, action, autorun, extendObservable, computed } from "mobx";
const n2c = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
}
class AppStore {
    @observable value = ''
    @observable list = [1,2,3,4]
    @observable dic = {'a': 1, 'b': 2, 'c': 3}
    @computed get cn() {
        return n2c[this.value]
    }
    constructor(props) {
        this.id = Math.random()
    }
    @action.bound
    reset(value) {
        this.value = value
    }
    @action.bound
    addNew(value) {
        if(this.list.includes(value) || !value) return;
        this.list.push(value)
        this.value = value
    }
    @action.bound
    addDic() {

    }
}

export const appState = new AppStore()