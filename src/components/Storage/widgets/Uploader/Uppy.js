import React from 'react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import Webcam from '@uppy/webcam';
import GoogleDrive from '@uppy/google-drive';
import { observer, inject } from 'mobx-react';
import './Uppy.scss';

@inject('store')
@observer
export default class MyComponent extends React.Component {
    constructor (props) {
        super(props);
        const uppy = Uppy({
            meta: { type: 'avatar' },
            restrictions: { maxNumberOfFiles: 1 },
            autoProceed: true
        });
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
            }).use(Tus, { endpoint: 'https://master.tus.io/files/' });

        uppy.on('complete', (result) => {
            const url = result.successful[0].uploadURL;
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
        this.props.store.hideUploadZone();
    }

    render () {
        const { uploadZoneActive } = this.props.store;
        return (
            uploadZoneActive && <div className='uppy'>
                <div className='mask' onClick={this.onClick}></div>
                <Dashboard uppy={this.uppy} plugins={['Webcam', 'GoogleDrive']} />
            </div>
        );
    }
}
