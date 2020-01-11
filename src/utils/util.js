import { exec } from 'child_process';

const execAsync = function (command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) reject(err);
            else resolve('ok');
        });
    });
};

const wait = duration => new Promise(resolve => {
    setTimeout(() => {
        resolve(duration);
    }, duration);
});

const cleanUndefined = obj => {
    for (const i in obj) {
        if (obj[i] === undefined) delete obj[i];
    }
    return obj;
};

const isArray = obj => typeof Array.isArray === 'function' ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]';

const pickObject = (original, object) => {
    for (const key in object) {
        if (original[key] === undefined) {
            original[key] = object[key];
        }
        if (typeof original[key] === 'object') {
            pickObject(original[key], object[key]);
        }
    }
    return original;
};

const sizeOf = size => {
    return ((size / 1024) < 1024) ? (size / 1024).toFixed(2) + 'KB'
        : (size / 1024 ** 2 < 1024 ? (size / 1024 ** 2).toFixed(2) + 'MB'
            : (size / 1024 ** 3 < 1024 ? (size / 1024 ** 3).toFixed(2) + 'GB'
                : (size / 1024 ** 4).toFixed(2) + 'TB'));
};

export default {
    execAsync,
    wait,
    isArray,
    cleanUndefined,
    pickObject,
    sizeOf
};
