import React, { Component } from 'react';
import './UploadZone.scss';
import { appState } from '../AppStore';
import { stashFile } from '../../../service/file';
import Spacer from './Spacer';

class UploadZone extends Component {
    constructor (props = {}) {
        super(props);
    }

    fileChange () {
        if (this.uploader.current.files.length === 0) return 0;
        this.showPathDialog = true;
        // let size = ~~(this.$refs.fileInput.files[0].size / 1024);
        // let fileName = this.$refs.fileInput.files[0].name
        // let fileType = this.$refs.fileInput.files[0].type
        stashFile(this.uploader.files);
    }

    clickHandler (e) {
        e.target.id === 'uploadZoneContainer' && appState.hideUploadZone();
    }

    render () {
        const clickHandler = this.clickHandler.bind(this);
        return (
            <div className='uploadZoneAnimate'>
                {appState.uploadZoneActive && <div className="uploadZoneContainer" id='uploadZoneContainer' onClick={clickHandler}>
                    <div className='uploadZoneDialog'>
                        <div className='flexLeft border shrinkSelf flexBlock bs2 radius'></div>
                        <Spacer />
                        <div className='flexRight border shrinkSelf flexBlock bs8 radius'></div>
                    </div>
                </div>}
            </div>
        );
    }
}
export default UploadZone;
