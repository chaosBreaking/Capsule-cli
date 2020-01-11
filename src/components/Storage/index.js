import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { FileCard, FileList } from './widgets/FileContainer';
import s from './index.scss';
import TopBar from './widgets/TopBar';
import SearchBar from './widgets/SearchBar';
import { Uppy } from './widgets/Uploader';

@inject('store')
@observer
export default class Storage extends Component {
    constructor (props = {}) {
        super(props);
        this.uploader = React.createRef();
    }

    get store () {
        return this.props.store.fileStore;
    }

    getTop () {
        const right = (
            <React.Fragment>
                <SearchBar store={this.store}></SearchBar>
                <div tooltip="上传文件" flow="down">
                    <i onClick={this.store.showUploadZone} className="iconfont icon-uploadfile1 alignEnd block pointer">
                        {/* <input type="file" className={s.uploadInput} multiple="multiple" ref={this.uploader} onChange={fileChange} /> */}
                    </i>
                </div>
                <div tooltip="新建文件夹" flow="down">
                    <i onClick={this.store.sort } className="iconfont icon-uploadfolder alignEnd block pointer"></i>
                </div>
                <div tooltip="排序" flow="down">
                    <i onClick={this.store.sort } className="iconfont icon-sortitem alignEnd block pointer"></i>
                </div>
                <div tooltip="显示方式" flow="down">
                    <i onClick={this.store.change } className="iconfont icon-apps1 alignEnd block pointer"></i>
                </div>
            </React.Fragment>
        );
        return { right };
    }

    render () {
        const { right } = this.getTop();
        return (
            <div className={s.container}>
                <TopBar right={right} store={this.store}></TopBar>
                <Uppy store={this.store}></Uppy>
                {this.store.containerType === 'card' && <FileCard files={this.store.sortedFileList}></FileCard>}
                {this.store.containerType === 'list' && <FileList files={this.store.sortedFileList}></FileList>}
            </div>
        );
    }
}
