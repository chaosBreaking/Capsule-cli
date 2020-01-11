// import { observable, action } from 'mobx';
import axios from 'axios';

export default class CommonStore {
    request (service, ...params) {
        return service(axios, ...params);
    }
}
