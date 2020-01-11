import event from 'events';

class FileManager extends event {
    constructor (props = {}) {
        super(props);
        this.stashStack = [];
        this.Queue = [];
        this.fileMap = {};
        this.lock = true;
    }

    stash (files) {
        this.stashStack = files;
        return this.stashStack.length;
    }
}

const fileManager = new FileManager();

export function getFileList () {
    return [
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
}

export function getFile () {

}

export function getFolderList () {
    return [
        {
            title: 'f1',
            children: [
                {
                    title: 'f1-1',
                    children: [
                        {
                            title: 'f1-1-1',
                            children: [{
                                title: 'f1111',
                                children: [{
                                    title: 'f22222'
                                }]
                            }]
                        }
                    ]
                },
                {
                    title: 'f1-2'
                },
            ]
        },
        {
            title: 'f1',
            children: [
                {
                    title: 'f1-1',
                    children: [
                        {
                            title: 'f1-1-1',
                            children: [{
                                title: 'f1111',
                                children: [{
                                    title: 'f22222'
                                }]
                            }]
                        }
                    ]
                },
                {
                    title: 'f1-2'
                },
            ]
        },
        {
            title: 'f1',
            children: [
                {
                    title: 'f1-1',
                    children: [
                        {
                            title: 'f1-1-1',
                            children: [{
                                title: 'f1111',
                                children: [{
                                    title: 'f22222'
                                }]
                            }]
                        }
                    ]
                },
                {
                    title: 'f1-2'
                },
            ]
        },
        {
            title: 'f1',
            children: [
                {
                    title: 'f1-1',
                    children: [
                        {
                            title: 'f1-1-1',
                            children: [{
                                title: 'f1111',
                                children: [{
                                    title: 'f22222'
                                }]
                            }]
                        }
                    ]
                },
                {
                    title: 'f1-2'
                },
            ]
        },
        {
            title: 'f1',
            children: [
                {
                    title: 'f1-1',
                    children: [
                        {
                            title: 'f1-1-1',
                            children: [{
                                title: 'f1111',
                                children: [{
                                    title: 'f22222'
                                }]
                            }]
                        }
                    ]
                },
                {
                    title: 'f1-2'
                },
            ]
        },
        {
            title: 'f2'
        },
        {
            title: '图片和视频',
            children: [{
                title: 'f3-1'
            }]
        },
        {
            title: '图片和视频',
            children: [{
                title: 'f3-1'
            }]
        },
        {
            title: '图片和视频',
            children: [{
                title: 'f3-1'
            }]
        },
        {
            title: '图片和视频',
            children: [{
                title: 'f3-1'
            }]
        },
    ];
}

export function uploadFile () {

}

export function downloadFile () {

}

export function stashFile (files = []) {
    return fileManager.stash(files);
}
