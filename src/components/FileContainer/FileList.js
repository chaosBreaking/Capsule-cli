import React, { Component } from 'react'
import { HEADER } from './Constant';
import './FileList.scss'
class TopBar extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        return (
            <div className="topBar">
                { HEADER.map(name => <span className="header" key={HEADER.indexOf(name)}>{ name }</span>) }
            </div>
        )
    }
}
class ListItem extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        const item = HEADER.map((headerName, index) => {
            const value = this.props.file[headerName]
            return <span className="itemProperty" key={ index }>{ value }</span>
        })
        return (
            <div className="listItem">
                { item }
                <br></br>
            </div>
        )
    }
}
class FileList extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        const listItem = this.props.files.map((file, index) => {
            return <ListItem key={ index } file={file}></ListItem>
        })
        return (
            <div className="listContainer">
                <TopBar></TopBar>
                <div className="listBody">
                    { listItem }
                </div>
            </div>
        )
    }
}

export default FileList