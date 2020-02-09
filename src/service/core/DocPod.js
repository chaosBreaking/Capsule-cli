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

    path2Target (path) {
        return path.split('/').reduce((acc, currPath) => {
            return acc[currPath] ? acc[currPath] : acc.children ? acc.children.find(child => child.title === currPath) : acc;
        }, this.data);
    }

    createFoder (foder) {
        const { title, data = {}, path = '' } = foder;
        const newFoder = {
            data,
            children: []
        };
        const target = this.path2Target(path);
        if (target === this.data) {
            this.data[title] = newFoder;
        } else {
            target.children.push({
                title,
                ...newFoder
            });
        }
        return this;
    }

    addFile (foderPath, files) {
        const target = this.path2Target(foderPath);
        files = Array.isArray(files) ? files : [files];
        /**
            path: "QmepnZkngmpdRw2Fr54gqkB6W4A4RAmSdRZEkFVxFmLsJq"
            hash: "QmepnZkngmpdRw2Fr54gqkB6W4A4RAmSdRZEkFVxFmLsJq"
            size: 264523
            relativePath: null
            name: "架构图.jpg"
            type: "image/jpeg"
         */
        const data = files.reduce((acc, file) => {
            acc[file.name] = file;
            return acc;
        }, {});
        if (target === this.data) {
            const defaultFoder = Object.keys(this.data)[0];
            Object.assign(this.data[defaultFoder].data, data);
        } else {
            Object.assign(target.data, data);
        }
        return this;
    }

    removeFile (foder, filename) {
        foder = typeof foder === 'object' ? foder.title : foder;
        if (this.data[foder]) {
            delete this.data[foder].data[filename];
            return this;
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
