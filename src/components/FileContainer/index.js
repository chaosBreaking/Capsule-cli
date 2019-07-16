import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { appState } from './AppStore';
import FileCard from './FileCard';
import FileList from './FileList';
import './index.scss'

@inject('store')
@observer
class FileContainer extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        return (
            <div className="container">
                { appState.containerType === 'card' && <FileCard files={appState.fileStack}></FileCard> }
                { appState.containerType === 'list' && <FileList files={appState.fileStack}></FileList> }
            </div>
        )
    }
}
export default FileContainer