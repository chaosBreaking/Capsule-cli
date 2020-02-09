import React from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import Webcam from '@uppy/webcam';
import GoogleDrive from '@uppy/google-drive';
import { observer, inject } from 'mobx-react';
import CapsuleTube from './CapsuleTube';
import Chinese from '@uppy/locales/lib/zh_CN';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import s from './Uppy.scss';

@inject('store')
@observer
export default class UppyUploader extends React.Component {
    constructor (props) {
        super(props);
        const uppy = Uppy({
            restrictions: { maxNumberOfFiles: 10 },
            autoProceed: false,
            locale: Chinese,
            allowMultipleUploads: true,
            logger: Uppy.debugLogger,
        });
        window.uppy = uppy;
        this.uppy = uppy;
        const dom = document.getElementsByClassName('uppy')[0];
        uppy
            .use(Webcam, {
                onBeforeSnapshot: () => Promise.resolve(),
                countdown: false,
                modes: [
                    'video-audio',
                    'video-only',
                    'audio-only',
                    'picture'
                ],
                mirror: true,
                facingMode: 'user',
                showRecordingLength: false,
                locale: {}
            })
            .use(GoogleDrive, {
                target: dom,
                companionUrl: 'https://companion.uppy.io/',
            })
            .use(CapsuleTube, {
                endpoint: 'http://localhost:6842/api/store/upload',
                ipfsEndpoint: 'http://101.132.121.111:5001',
                localUpload: false, // 在本地上传到ipfs
                formData: true,
                fieldName: 'data'
            });

        uppy.on('complete', result => {
            if (result && result.successful.length > 0) {
                const fileArray = result.successful.map(res => {
                    const { response: { status, body }, meta, size } = res;
                    if (status === 200 && body.code === 0) {
                        return { ...body.data, ...meta, size };
                    }
                });
                this.props.store.uploadResultHandler(fileArray);
                return true;
            }
        });
    }

    componentWillUnmount () {
        this.uppy.close();
    }

    componentDidMount () {
    }

    onClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.uppy.reset();
        this.props.store.hideUploadZone();
    }

    get store () {
        return this.props.store;
    }

    render () {
        const { uploadZoneActive } = this.store;
        const dashboardConfig = {
            showProgressDetails: true,
            allowMultipleUploads: true,
            metaFields: [
                { id: 'filename', name: 'Name', placeholder: 'file name' },
                { id: 'podType', name: 'License', placeholder: 'specify license' },
                { id: 'caption', name: 'Caption', placeholder: 'describe what the file is about' }
            ]
        };
        return (
            uploadZoneActive && <div className={s.uppy}>
                <div className={s.mask} onClick={this.onClick}></div>
                <Dashboard uppy={this.uppy} plugins={['Webcam', 'GoogleDrive']} {...dashboardConfig} />
            </div>
        );
    }
}
