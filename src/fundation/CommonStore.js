// import { observable, action } from 'mobx';
import axios from 'axios';

export default class CommonStore {
    request (...params) {
        return axios(...params);
    }
}
