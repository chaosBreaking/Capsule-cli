import event from 'events';

function sizeOf (size) {
    return ((size / 1024) < 1024) ? (size / 1024).toFixed(2) + 'KB'
        : (size / 1024 ** 2 < 1024 ? (size / 1024 ** 2).toFixed(2) + 'MB'
            : (size / 1024 ** 3 < 1024 ? (size / 1024 ** 3).toFixed(2) + 'GB'
                : (size / 1024 ** 4).toFixed(2) + 'TB'));
}

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
}

export function getFile () {

}

export function uploadFile () {

}

export function downloadFile () {

}

export function stashFile (files = []) {
    return fileManager.stash(files);
}
