import React, { Component } from 'react'
import { HEADER } from '../Constant';
import './FileList.scss'
import DragSelect from './DragSelect'
import ContextMenu from './ContextMenu';
import { Grow } from '@material-ui/core';

class Header extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        return (
            <div className="topBar">
                {HEADER.map(name => <div className="listHeader" key={HEADER.indexOf(name)}>{name}</div>)}
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
            return <span className="itemProperty" key={index} index={index}>{value}</span>
        })
        return (
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={300}>
                <div className="listItem" index={this.props.index}>
                    {item}
                    <br></br>
                </div>
            </Grow>
        )
    }
}
class FileList extends DragSelect {
    constructor(props = {}) {
        super(props)
        this.debounceBarX = 40
        this.debounceBarY = 40
        this.mousePosition = {
            x: '',
            y: ''
        }
        this.on('mouseDown', e => {
            this.menu && this.menu.clearMenu()
            const lb = document.getElementById('listBody')
            // 拖拽时样式，不出现hover时子项目的背景阴影
            lb.className = 'listBody selecting'
        })
        this.on('mouseUp', e => {
            const lb = document.getElementById('listBody')
            // 恢复非选择时样式
            lb.className = 'listBody'
        })
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
    onRef(ref) {
        this.menu = ref
    }
    contextMenuHandler(e) {
        e.stopPropagation()
        e.preventDefault()
        this.menu.activateMenu({ x: this.startX, y: this.startY })
    }
    clickHandler(e) {
        console.log(e.target)
        e.preventDefault()
        e.stopPropagation()
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
                onContextMenu = { e => this.contextMenuHandler(e) }
            >
                <ContextMenu onRef = { (ref)=>this.onRef(ref) }></ContextMenu>
                <div className="dragMusk" id="dragMusk"></div>
                {/* <Header></Header> */}
                <div className="listBody" id="listBody" onClick={ e => this.clickHandler(e) }>
                    { listItem }
                </div>
            </div>
        )
    }
}

export default FileList