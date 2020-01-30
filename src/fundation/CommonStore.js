// import { observable, action } from 'mobx';
import axios from 'axios';

export default class CommonStore {
    get rootStore () {
        return this.getRoot();
    }

    request (service, ...params) {
        return service(axios, ...params);
    }
}
