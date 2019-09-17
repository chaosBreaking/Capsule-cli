import { observable, action } from 'mobx';
import BaseStore from '../../fundation/BaseStore';

class AppStore extends BaseStore {
    @observable containerType = 'list' // 'card' || 'list'
    @observable sortedFileList = []
    @observable uploadZoneActive = false
    constructor (props = {}) {
        super(props);
        this.mounted = false;
        this.fileStack = [];
        this.initFileStore();
    }

    initFileStore () {
        this.fileStack = [
            {
                name: 'DC2202',
                size: '10kb',
                type: 'pdf',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'pic1',
                size: '10kb',
                type: 'jpg',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'mov1',
                size: '10mb',
                type: 'mp4',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'doc1',
                size: '100kb',
                type: 'docx',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'music1',
                size: '12mb',
                type: 'mp3',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: '1988我想和这个世界谈谈',
                size: '10kb',
                type: 'pdf',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'pic1',
                size: '10kb',
                type: 'jpg',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'mov1',
                size: '10mb',
                type: 'mp4',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'doc1',
                size: '100kb',
                type: 'docx',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'music1',
                size: '12mb',
                type: 'mp3',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: '1988我想和这个世界谈谈',
                size: '10kb',
                type: 'pdf',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'cpic1',
                size: '10kb',
                type: 'jpg',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'amov1',
                size: '10mb',
                type: 'mp4',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'xdoc1',
                size: '100kb',
                type: 'docx',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'music1',
                size: '12mb',
                type: 'mp3',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: '1988我想和这个世界谈谈',
                size: '10kb',
                type: 'pdf',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'x21pic1',
                size: '10kb',
                type: 'jpg',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: '21mov1',
                size: '10mb',
                type: 'mp4',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'adoc1',
                size: '100kb',
                type: 'docx',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'kmusic1',
                size: '12mb',
                type: 'mp3',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'i1988我想和这个世界谈谈',
                size: '10kb',
                type: 'pdf',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'hphic1',
                size: '10kb',
                type: 'jpg',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'jmov1',
                size: '10mb',
                type: 'mp4',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'ddaoc1',
                size: '100kb',
                type: 'docx',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                name: 'bmusic1',
                size: '12mb',
                type: 'mp3',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            }];
        this.sort();
    }

    @action.bound
    change () {
        this.containerType = this.containerType === 'list' ? 'card' : 'list';
    }

    @action.bound
    sort (prop = 'name', rule = 'desc') {
        const arr = rule === 'desc' ? [-1, 1, 0] : [1, -1, 0];
        this.sortedFileList = this.fileStack.sort((a, b) => {
            return a[prop] < b[prop] ? arr[0] : a[prop] > b[prop] ? arr[1] : arr[2];
        });
    }

    @action.bound
    showUploadZone () {
        this.uploadZoneActive = true;
    }

    @action.bound
    hideUploadZone () {
        this.uploadZoneActive = false;
    }
}

export const appState = new AppStore();
