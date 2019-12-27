import ipfsClient from 'ipfs-http-client';
import { Plugin } from '@uppy/core';
import settle from '@uppy/utils/lib/settle';
import EventTracker from '@uppy/utils/lib/EventTracker';
import ProgressTimeout from '@uppy/utils/lib/ProgressTimeout';
import RateLimitedQueue from '@uppy/utils/lib/RateLimitedQueue';
import Translator from '@uppy/utils/lib/Translator';
import cuid from 'cuid';

const ipfs = ipfsClient('http://localhost:5001');
/**
 * 1.Preprocessing
 * 2.Uploading
 * 3.Postprocessing
 */
function setTypeInBlob (file) {
    const dataWithUpdatedType = file.data.slice(0, file.data.size, file.meta.type);
    return dataWithUpdatedType;
}
function buildResponseError (xhr, error) {
    // No error message
    if (!error) error = new Error('Upload error');
    // Got an error message string
    if (typeof error === 'string') error = new Error(error);
    // Got something else
    if (!(error instanceof Error)) {
        error = Object.assign(new Error('Upload error'), { data: error });
    }

    error.request = xhr;
    return error;
}
export default class CapsuleTube extends Plugin {
    constructor (uppy, opts) {
        super(uppy, opts);
        this.id = opts.id || 'CapsuleTube';
        this.type = 'uploader';
        const defaultOptions = {
            formData: true,
            fieldName: 'files[]',
            method: 'post',
            metaFields: null,
            responseUrlFieldName: 'url',
            bundle: false,
            headers: {},
            timeout: 30 * 1000,
            limit: 0,
            withCredentials: false,
            responseType: '',

            getResponseData (responseText, response) {
                let parsedResponse = {};
                try {
                    parsedResponse = JSON.parse(responseText);
                } catch (err) {
                    console.log(err);
                }

                return parsedResponse;
            },

            getResponseError (responseText, response) {
                return new Error('Upload error');
            },

            validateStatus (status, responseText, response) {
                return status >= 200 && status < 300;
            }
        };
        this.opts = { ...defaultOptions, ...opts };
        if (this.opts.__queue instanceof RateLimitedQueue) {
            this.requests = this.opts.__queue;
        } else {
            this.requests = new RateLimitedQueue(this.opts.limit);
        }

        if (this.opts.bundle && !this.opts.formData) {
            throw new Error('`opts.formData` must be true when `opts.bundle` is enabled.');
        }
        this.uploaderEvents = {};
        this.i18nInit();
    }

    i18nInit () {
        this.translator = new Translator([this.defaultLocale, this.uppy.locale, this.opts.locale]);
        this.i18n = this.translator.translate.bind(this.translator);
        this.setPluginState();
    }

    getOptions (file) {
        const opts = {
            ...this.opts,
            ...(file.xhrUpload || {}),
            headers: {}
        };
        Object.assign(opts.headers, this.opts.headers);
        return opts;
    }

    /*
    * progress:
            percentage: 0
            bytesUploaded: 0
            bytesTotal: 33717
            uploadComplete: false
            uploadStarted: null
    */
    convert (file) {
        const { id, data } = file;
        return new Promise((resolve, reject) => {
            ipfs.add({
                path: '/DocumentPod',
                content: data,
            }).then(res => {
                resolve(res[0].hash);
            });
        });
    }

    /**
     * fn gets called with a list of file IDs before an upload starts.
     * fn should return a Promise. Its resolution value is ignored
     */
    prepareUpload = fileIDList => {
        const promises = fileIDList.map((fileID) => {
            const file = this.uppy.getFile(fileID);
            return this.convert(file).then(cid => {
                const merkleFile = Object.assign({}, file, { data: cid });
                // const merkleFile = Object.assign({}, file, { data: merkleData, progress: { uploadComplete: true } });
                this.uppy.setFileState(fileID, merkleFile);
                console.log(this.uppy.getFile(fileID));
            });
        });
        return Promise.all(promises);
    }

    afterUpload = fileIDList => {
        return new Promise((resolve, reject) => { resolve(1); });
    }

    install () {
        this.uppy.addPreProcessor(this.prepareUpload);
        this.uppy.on('upload-progress', this.onProgress);
        this.uppy.addPostProcessor(this.afterUpload);
        this.uppy.addUploader(this.handleUpload);
    }

    uninstall () {
        this.uppy.removePreProcessor(this.prepareUpload);
        this.uppy.removeUploader(this.handleUpload);
    }

    handleUpload = (fileIDList) => {
        if (fileIDList.length === 0) {
            this.uppy.log('[XHRUpload] No files to upload!');
            return Promise.resolve();
        }

        if (this.opts.limit === 0) {
            this.uppy.log(
                '[XHRUpload] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/xhr-upload/#limit-0',
                'warning'
            );
        }

        this.uppy.log('[XHRUpload] Uploading...');
        const files = fileIDList.map(fileID => this.uppy.getFile(fileID));
        return this.uploadFiles(files);
    }

    uploadFiles = (files) => {
        const promises = files.map((file, i) => {
            const current = parseInt(i, 10) + 1;
            const total = files.length;

            if (file.error) {
                return Promise.reject(new Error(file.error));
            } else {
                return this.upload(file, current, total);
            }
        });

        return settle(promises);
    }

    addMetadata (formData, meta, opts) {
        const metaFields = Array.isArray(opts.metaFields)
            ? opts.metaFields
            : Object.keys(meta);
        metaFields.forEach((item) => {
            formData.append(item, meta[item]);
        });
    }

    createBareUpload (file, opts) {
        return JSON.stringify({ data: file.data });
    }

    createFormDataUpload (file, opts) {
        const formPost = new FormData();

        this.addMetadata(formPost, file.meta, opts);

        const dataWithUpdatedType = setTypeInBlob(file);

        if (file.name) {
            formPost.append(opts.fieldName, dataWithUpdatedType, file.meta.name);
        } else {
            formPost.append(opts.fieldName, dataWithUpdatedType);
        }

        return formPost;
    }

    upload (file, current, total) {
        const opts = this.getOptions(file);

        this.uppy.log(`uploading ${current} of ${total}`);
        return new Promise((resolve, reject) => {
            this.uppy.emit('upload-started', file);

            const data = opts.formData
                ? this.createFormDataUpload(file, opts)
                : this.createBareUpload(file, opts);

            const timer = new ProgressTimeout(opts.timeout, () => {
                xhr.abort();
                const error = new Error(this.i18n('timedOut', { seconds: Math.ceil(opts.timeout / 1000) }));
                this.uppy.emit('upload-error', file, error);
                reject(error);
            });

            const xhr = new XMLHttpRequest();
            this.uploaderEvents[file.id] = new EventTracker(this.uppy);

            const id = cuid();

            xhr.upload.addEventListener('loadstart', (ev) => {
                this.uppy.log(`[XHRUpload] ${id} started`);
            });

            xhr.upload.addEventListener('progress', (ev) => {
                this.uppy.log(`[XHRUpload] ${id} progress: ${ev.loaded} / ${ev.total}`);
                // Begin checking for timeouts when progress starts, instead of loading,
                // to avoid timing out requests on browser concurrency queue
                timer.progress();

                if (ev.lengthComputable) {
                    this.uppy.emit('upload-progress', file, {
                        uploader: this,
                        bytesUploaded: ev.loaded,
                        bytesTotal: ev.total
                    });
                }
            });

            xhr.addEventListener('load', (ev) => {
                this.uppy.log(`[XHRUpload] ${id} finished`);
                timer.done();
                queuedRequest.done();
                if (this.uploaderEvents[file.id]) {
                    this.uploaderEvents[file.id].remove();
                    this.uploaderEvents[file.id] = null;
                }

                if (opts.validateStatus(ev.target.status, xhr.responseText, xhr)) {
                    const body = opts.getResponseData(xhr.responseText, xhr);
                    const uploadURL = body[opts.responseUrlFieldName];

                    const uploadResp = {
                        status: ev.target.status,
                        body,
                        uploadURL
                    };

                    this.uppy.emit('upload-success', file, uploadResp);

                    if (uploadURL) {
                        this.uppy.log(`Download ${file.name} from ${uploadURL}`);
                    }

                    return resolve(file);
                } else {
                    const body = opts.getResponseData(xhr.responseText, xhr);
                    const error = buildResponseError(xhr, opts.getResponseError(xhr.responseText, xhr));

                    const response = {
                        status: ev.target.status,
                        body
                    };

                    this.uppy.emit('upload-error', file, error, response);
                    return reject(error);
                }
            });

            xhr.addEventListener('error', (ev) => {
                this.uppy.log(`[XHRUpload] ${id} errored`);
                timer.done();
                queuedRequest.done();
                if (this.uploaderEvents[file.id]) {
                    this.uploaderEvents[file.id].remove();
                    this.uploaderEvents[file.id] = null;
                }

                const error = buildResponseError(xhr, opts.getResponseError(xhr.responseText, xhr));
                this.uppy.emit('upload-error', file, error);
                return reject(error);
            });

            xhr.open(opts.method.toUpperCase(), opts.endpoint, true);
            // IE10 does not allow setting `withCredentials` and `responseType`
            // before `open()` is called.
            xhr.withCredentials = opts.withCredentials;
            if (opts.responseType !== '') {
                xhr.responseType = opts.responseType;
            }

            Object.keys(opts.headers).forEach((header) => {
                xhr.setRequestHeader(header, opts.headers[header]);
            });

            const queuedRequest = this.requests.run(() => {
                xhr.send(data);
                return () => {
                    timer.done();
                    xhr.abort();
                };
            });

            this.onFileRemove(file.id, () => {
                queuedRequest.abort();
                reject(new Error('File removed'));
            });

            this.onCancelAll(file.id, () => {
                queuedRequest.abort();
                reject(new Error('Upload cancelled'));
            });
        }).catch(err => {
            console.log('error', err);
        });
    }

    onFileRemove (fileID, cb) {
        this.uploaderEvents[fileID].on('file-removed', (file) => {
            if (fileID === file.id) cb(file.id);
        });
    }

    onRetry (fileID, cb) {
        this.uploaderEvents[fileID].on('upload-retry', (targetFileID) => {
            if (fileID === targetFileID) {
                cb();
            }
        });
    }

    onRetryAll (fileID, cb) {
        this.uploaderEvents[fileID].on('retry-all', (filesToRetry) => {
            if (!this.uppy.getFile(fileID)) return;
            cb();
        });
    }

    onCancelAll (fileID, cb) {
        this.uploaderEvents[fileID].on('cancel-all', () => {
            if (!this.uppy.getFile(fileID)) return;
            cb();
        });
    }
};
