import React, { Component } from 'react';
import { Provider, observer, inject } from 'mobx-react';
import AppStore from './AppStore';
import FileCard from './widgets/FileCard';
import FileList from './widgets/FileList';
import './index.scss';
import TopBar from './widgets/TopBar';
import SearchBar from './widgets/SearchBar';
import UploadZone from './widgets/UploadZone';
import Uppy from './widgets/Uppy.js';

@inject('store')
@observer
class FileContainer extends Component {
    constructor (props = {}) {
        super(props);
        this.uploader = React.createRef();
        this.appStore = new AppStore();
    }

    getTop () {
        const right = (
            <React.Fragment>
                <SearchBar></SearchBar>
                <div tooltip="上传文件" flow="down">
                    <i onClick={this.appStore.showUploadZone} className="iconfont icon-uploadfile1 alignEnd block pointer">
                        {/* <input type="file" className="uploadInput" multiple="multiple" ref={this.uploader} onChange={fileChange} /> */}
                    </i>
                </div>
                <div tooltip="新建文件夹" flow="down">
                    <i onClick={this.appStore.sort } className="iconfont icon-uploadfolder alignEnd block pointer"></i>
                </div>
                <div tooltip="排序" flow="down">
                    <i onClick={this.appStore.sort } className="iconfont icon-sortitem alignEnd block pointer"></i>
                </div>
                <div tooltip="显示方式" flow="down">
                    <i onClick={this.appStore.change } className="iconfont icon-apps1 alignEnd block pointer"></i>
                </div>
            </React.Fragment>
        );
        return { right };
    }

    render () {
        const { right } = this.getTop();
        return (
            <Provider store={this.appStore}>
                <div className="container">
                    <TopBar right={right}></TopBar>
                    <Uppy></Uppy>
                    {this.appStore.containerType === 'card' && <FileCard files={this.appStore.sortedFileList}></FileCard>}
                    {this.appStore.containerType === 'list' && <FileList files={this.appStore.sortedFileList}></FileList>}
                </div>
            </Provider>
        );
    }
}
export default FileContainer;
