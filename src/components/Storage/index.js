import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import s from './index.scss';
import TopBar from './widgets/TopBar';
import SearchBar from './widgets/SearchBar';
import { Uppy } from './widgets/Uploader';
import ExtendBar from '@components/ExtendBar';
import FoderInput from './widgets/FoderInput';
import { FileCard, FileList } from './widgets/FileContainer';

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

    showInput = e => {
        e.stopPropagation();
        runInAction(() => {
            this.store.isShowInput = true;
        });
    }

    hideInput = e => {
        e.stopPropagation();
        runInAction(() => {
            this.store.isShowInput = false;
        });
    }

    createFoderHandler = e => {
        e.stopPropagation();
        this.store.createFoder();
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
                    <i onClick={this.showInput } className="iconfont icon-newfolder2 alignEnd block pointer"></i>
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
        const { changeInput, isShowInput, inputValue } = this.store;
        return (
            <div className={s.container}>
                <ExtendBar></ExtendBar>
                <div className={s.main}>
                    <TopBar right={right} store={this.store} color={'#eee'}></TopBar>
                    <Uppy store={this.store}></Uppy>
                    {isShowInput && <FoderInput inputValue={inputValue} onSubmit={this.createFoderHandler} onCancel={this.hideInput} handleChange={changeInput}></FoderInput>}
                    { this.store.currentFilesList.length > 0
                        ? (<>
                            {this.store.containerType === 'card' && <FileCard></FileCard>}
                            {this.store.containerType === 'list' && <FileList></FileList>}
                        </>)
                        : <div className={s.empty}>
                            <div className={s.emptyImg}></div>
                            <span className={s.emptyInfo}>空文件夹</span>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
