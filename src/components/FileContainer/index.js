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
        this.dragFlag = false
        this.startX = 0
        this.startY = 0
        this.target = ''
    }
    caculateSelected() {
        /** border
         * 
         *  */    
    }
    clearDrag() {
        this.target && (this.target.style.width = 0)
        this.target && (this.target.style.height=0)
        this.target && (this.target.style.top=0)
        this.target && (this.target.style.left=0)
        this.target && (this.target.style.bottom=0)
        this.target && (this.target.style.right=0)
    }
    render() {
        return (
            <div className="container" 
                onMouseDown={e => {
                    this.dragFlag = true
                    this.target = document.getElementById('dragMusk')
                    this.startX = e.pageX
                    this.startY = e.pageY
                    e.stopPropagation()
                    e.preventDefault()
                }}
                onMouseMove={e => {
                    if(!this.dragFlag) return null
                    if(!this.target) return null
                    this.target.top = this.startY + 'px'
                    this.target.left = this.startX + 'px'
                    if (e.pageX < this.startX) {
                        // left
                        this.target.style.left = e.pageX + 'px'
                        this.target.style.width = this.startX - e.pageX + 'px'
                    } else {
                        // right
                        this.target.style.left = this.startX + 'px'
                        this.target.style.width = e.pageX - this.startX + 'px'
                    }
                    if (e.pageY < this.startY) {
                        // up
                        this.target.style.top = e.pageY + 'px'
                        this.target.style.height = this.startY - e.pageY + 'px'
                    } else {
                        // down
                        this.target.style.top = this.startY + 'px'
                        this.target.style.height = e.pageY - this.startY + 'px'
                    }
                    e.stopPropagation()
                    e.preventDefault()
                }}
                onMouseUp={e => {
                    this.dragFlag = false
                    this.caculateSelected()
                    this.clearDrag()
                    e.stopPropagation()
                    e.preventDefault()
                }}
                onMouseLeave={e => {
                    this.dragFlag = false
                    this.clearDrag()
                    e.stopPropagation()
                    e.preventDefault()
                }}
            >
                <button onClick={e => {appState.change()}}>change</button>
                <div className="dragMusk" id="dragMusk"></div>
                { appState.containerType === 'card' && <FileCard files={appState.fileStack}></FileCard> }
                { appState.containerType === 'list' && <FileList files={appState.fileStack}></FileList> }
            </div>
        )
    }
}
export default FileContainer