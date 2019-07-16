import React, { Component } from 'react'
import { HEADER } from './Constant';
import './FileList.scss'
import DragSelect from './DragSelect'

class TopBar extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        return (
            <div className="topBar">
                {HEADER.map(name => <span className="header" key={HEADER.indexOf(name)}>{name}</span>)}
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
            return <span className="itemProperty" key={index}>{value}</span>
        })
        return (
            <div className="listItem" index={this.props.index}>
                {item}
                <br></br>
            </div>
        )
    }
}
class FileList extends DragSelect {
    constructor(props = {}) {
        super(props)
        this.debounceBarX = 40
        this.debounceBarY = 40
    }
    caculateSelected() {
        const { top: borderTop, bottom: borderBottom } = this.target.getBoundingClientRect()
        const items = document.getElementsByClassName('listItem')
        for(let item of items) {
            let position = item.getBoundingClientRect()
            // tolerent bar +-30
            if (position.top + 30 > borderTop && position.bottom - 30 < borderBottom) {
                item.className += ' active'
                const itemIndex = item.getAttribute('index')
                !this.selectedArr.includes(itemIndex) && this.selectedArr.push(itemIndex)
            } else {
                item.className = 'listItem'
            }
        }
    }
    clearSelected() {
        const items = document.getElementsByClassName('listItem')
        this.selectedArr.forEach(index => {
            items[index].className = 'listItem'
        })
        this.selectedArr = []
    }
    render() {
        const listItem = this.props.files.map((file, index) => {
            return <ListItem key={index} file={file} index={index}></ListItem>
        })
        return (
            <div className="listContainer"
                onMouseDown = { e => this.onMouseDown(e) }
                onMouseMove = { e => this.onMouseMove(e) }
                onMouseUp = { e => this.onMouseUp(e) }
                onMouseLeave = { e => this.onMouseLeave(e) }
            >
                <div className="dragMusk" id="dragMusk"></div>
                <TopBar></TopBar>
                <div className="listBody" id="listBody">
                    { listItem }
                </div>
            </div>
        )
    }
}

export default FileList