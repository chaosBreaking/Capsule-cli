import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { appState } from './AppStore';
import FileCard from './widgets/FileCard';
import FileList from './widgets/FileList';
import './index.scss';
import TopBar from './widgets/TopBar';
import SearchBar from './widgets/SearchBar';
import UploadZone from './widgets/UploadZone';

@inject('store')
@observer
class FileContainer extends Component {
    constructor (props = {}) {
        super(props);
        this.uploader = React.createRef();
    }

    getTop () {
        const right = (
            <React.Fragment>
                <SearchBar></SearchBar>
                <i onClick={e => { appState.showUploadZone(); }} className="iconfont icon-uploadfile1 alignEnd block pointer" title='上传文件'>
                    {/* <input type="file" className="uploadInput" multiple="multiple" ref={this.uploader} onChange={fileChange} /> */}
                </i>
                <i onClick={e => { appState.sort(); }} className="iconfont icon-uploadfolder alignEnd block pointer" title='新建文件夹'></i>
                <i onClick={e => { appState.sort(); }} className="iconfont icon-sortitem alignEnd block pointer" title='排序'></i>
                <i onClick={e => { appState.change(); }} className="iconfont icon-apps1 alignEnd block pointer" title='显示方式'></i>
            </React.Fragment>
        );
        return { right };
    }

    render () {
        const { topBarRight } = this.getTop();
        return (
            <div className="container">
                <TopBar right={topBarRight}></TopBar>
                <UploadZone show={appState.uploadZoneActive}></UploadZone>
                {appState.containerType === 'card' && <FileCard files={appState.sortedFileList}></FileCard>}
                {appState.containerType === 'list' && <FileList files={appState.sortedFileList}></FileList>}
            </div>
        );
    }
}
export default FileContainer;
