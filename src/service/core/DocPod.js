'use strict';
/*
    DocumentPod
    存储描述
    data: {
        foderName1: {
            filename: 文件名,
            cid: ipfs cid,
            options: 扩展字段
        },
        foderName2: {
            filename: 文件名,
            cid: ipfs cid,
            options: 扩展字段
        }
    }
*/
import { BasePod, constants } from './base';

const { defaultPodConfig } = constants;
export default class DocumentPod extends BasePod {
    constructor (props = {}) {
        props.prefix = defaultPodConfig.DOCUMENT.prefix;
        super(props);
    }

    get files () {
        return this.data;
    }

    createFoder (foder) {
        const { title, data = {}, path = '' } = foder;
        const target = path.split('/').reduce((acc, currPath) => {
            return acc[currPath] ? acc[currPath] : acc.children ? acc.children.find(child => child.title === currPath) : acc;
        }, this.data);
        const newFoder = {
            data,
            children: []
        };
        if (target === this.data) {
            this.data[title] = newFoder;
        } else {
            target.children.push({
                title,
                ...newFoder
            });
        }
    }

    addFile (foder, files) {
        foder = typeof foder === 'object' ? foder.title : foder;
        files = Array.isArray(files) ? files : [files];
        const data = files.reduce((acc, file) => {
            acc[file.filename] = file;
        }, {});
        if (this.data[foder]) {
            Object.assign(this.data[foder].data, data);
        }
    }

    removeFile (foder, filename) {
        foder = typeof foder === 'object' ? foder.title : foder;
        if (this.data[foder]) {
            delete this.data[foder].data[filename];
        }
        return false;
    }

    updateFile (foder, file = {}, update) {
        foder = typeof foder === 'object' ? foder.title : foder;
        if (this.data[foder]) {
            const key = file.filename || file.cid;
            Object.assign(this.data[foder].data[key], update);
            return this;
        }
        return false;
    }
};
