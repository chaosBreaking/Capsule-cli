import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { appState } from './AppStore';
import FileCard from './widgets/FileCard';
import FileList from './widgets/FileList';
import './index.scss'
import TopBar from './widgets/TopBar';
import SearchBar from './widgets/SearchBar';

@inject('store')
@observer
class FileContainer extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        const topBarRight = (
            <React.Fragment>
                <SearchBar></SearchBar>
                <i onClick={ e => {  } } className="iconfont icon-sortitem alignEnd block pointer"></i>
                <i onClick={ e => { appState.change() } } className="iconfont icon-apps1 alignEnd block pointer"></i>
            </React.Fragment>
        )
        return (
            <div className="container">
                <TopBar right={topBarRight}>

                </TopBar>
                { appState.containerType === 'card' && <FileCard files={appState.fileStack}></FileCard> }
                { appState.containerType === 'list' && <FileList files={appState.fileStack}></FileList> }
            </div>
        )
    }
}
export default FileContainer