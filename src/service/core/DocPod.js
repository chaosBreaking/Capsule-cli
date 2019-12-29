/*
    DocumentPod
    存储描述
    {
        id: 用于唯一识别文件
        filename: 文件名,
        cid: ipfs cid,
        path: 路径，概念同文件夹,
        options: 扩展字段
    }
*/
'use strict';
const { BasePod } = require('./base');
const { constants: { defaultPodConfig } } = require('./base');

class DocumentPod extends BasePod {
    constructor (props = {}) {
        props.prefix = defaultPodConfig.DOCUMENT.prefix;
        super(props);
    }

    get files () {
        return this.data;
    }

    async addFile (file = {}) {
        const fileArray = Object.prototype.toString.call(file) === '[object Array]' ? [...file] : [file];
        const tasks = fileArray.map(file => {
            const { id, ...rest } = file;
            return this.storeAPI.updatePod({ files: { [id]: rest } });
        });
        Promise.all(tasks).then(res => {
            return { code: 0, data: res };
        }).catch(err => {
            return { code: 1, msg: err };
        });
    }

    async removeFile (file = {}) {
        const fileArray = Object.prototype.toString.call(file) === '[object Array]' ? [...file] : [file];
        const tasks = fileArray.map(file => {
            const { id } = file;
            return this.storeAPI.updatePod({ $set: { files: { [id]: undefined } } }, { omitUndefined: true });
        });
        Promise.all(tasks).then(res => {
            return { code: 0, data: res };
        }).catch(err => {
            return { code: 1, msg: err };
        });
    }

    async updateFile (file = {}) {
        const fileArray = Object.prototype.toString.call(file) === '[object Array]' ? [...file] : [file];
        const tasks = fileArray.map(file => {
            const { id, ...rest } = file;
            return this.storeAPI.updatePod({ $set: { files: { [id]: rest } } });
        });
        Promise.all(tasks).then(res => {
            return { code: 0, data: res };
        }).catch(err => {
            return { code: 1, msg: err };
        });
    }
};

module.exports = DocumentPod;
