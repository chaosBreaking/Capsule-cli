import { observable, action } from 'mobx';
import Event from 'events';
class BaseStore {
    constructor (props = {}) {
        this.EventBus = new Event();
    }
}

export default BaseStore;
