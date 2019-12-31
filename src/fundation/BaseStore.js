import { observable, action } from 'mobx';
import Event from 'events';
import { createPod } from '@service/core';
class BaseStore {
    constructor (props = {}) {
        this.EventBus = new Event();
        this.init();
    }

    init () {
        window.createPod = createPod;
    }
}

export default BaseStore;
