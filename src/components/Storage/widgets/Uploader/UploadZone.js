import React, { Component } from 'react';
import s from './UploadZone.scss';
import { stashFile, getFolderList } from '../../../../service/file';
import CascadingList from '../../../CascadingList';
import Spacer from '../../../Utilities/Spacer';

class UploadZone extends Component {
    constructor (props = {}) {
        super(props);
        this.state = {
            path: ''
        };
        this.store = this.props.store;
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
        e.target.id === 'uploadZoneContainer' && this.appStore.hideUploadZone();
    }

    setPath (path) {
        this.setState({
            path
        });
    }

    render () {
        const clickHandler = this.clickHandler.bind(this);
        return (
            <div className={s.uploadZoneAnimate}>
                {this.appStore.uploadZoneActive && <div className={s.uploadZoneContainer} id='uploadZoneContainer' onClick={clickHandler}>
                    <div className={s.uploadZoneDialog}>
                        <div className={`${s.zoneLeftBase} ${s.flexLeft} ${s.border} ${s.shrinkSelf} ${s.flexBlock} ${s.bs2} ${s.radius}`}>
                            <CascadingList data={getFolderList()} setPath={this.setPath.bind(this)}></CascadingList>
                        </div>
                        <Spacer />
                        <div className={`${s.flexRight} ${s.border} ${s.shrinkSelf} ${s.flexBlock} ${s.bs8} ${s.radius}`}>
                            {this.state.path && this.state.path.split('/').join(' > ')}
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default UploadZone;
