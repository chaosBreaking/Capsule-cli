const exec = require('child_process').exec;

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

module.exports = {
    execAsync,
    wait,
    isArray,
    cleanUndefined,
    pickObject
};
