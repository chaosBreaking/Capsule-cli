import { observable, action } from "mobx";
import BaseStore from '../../fundation/BaseStore'

class AppStore extends BaseStore {
    @observable containerType = 'card' // 'card' || 'list'
    constructor(props = {}) {
        super(props)
        this.mounted = false
        this.fileStack = []
        this.initFileStore()
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
        ]
    }
    @action.bound
    change() {
        this.containerType = this.containerType === 'list' ? 'card' : 'list'
    }

}

export const appState = new AppStore()