import { Component } from 'react'
import { EventEmitter } from 'events';
import { inherits } from 'util';

class DragSelect extends Component {
    constructor(props = {}) {
        super(props)
        this.dragFlag = false
        this.startX = 0
        this.startY = 0
        this.target = ''
        this.debounceBarX = 10
        this.debounceBarY = 10
        this.selectedArr = []
        // inherit EventEmitter
        const eventProto = new EventEmitter()
        for(let property in eventProto) {
            this[property] = eventProto[property]
        }
    }
    caculateSelected() {
    }
    clearSelected() {
    }
    clearDrag() {
        this.target && (this.target.style.width = 0)
        this.target && (this.target.style.height = 0)
        this.target && (this.target.style.top = 0)
        this.target && (this.target.style.left = 0)
        this.target && (this.target.style.bottom = 0)
        this.target && (this.target.style.right = 0)
    }
    onMouseDown (e) {
        this.emit('mouseDown', e)
        this.clearSelected()
        this.clearDrag()
        this.dragFlag = true
        this.startX = e.pageX
        this.startY = e.pageY
        this.target = document.getElementById('dragMusk')
        e.stopPropagation()
        e.preventDefault()
    }
    onMouseMove (e) {
        this.emit('mouseMove', e)
        if (!this.dragFlag) return null
        if (!this.target) return null
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
    }
    onMouseUp(e) {
        this.emit('mouseUp', e)
        this.dragFlag = false
        if(Math.abs(e.pageX - this.startX) < this.debounceBarX && Math.abs(e.pageY - this.startY) < this.debounceBarY) {
            this.clearDrag()
            return null
        }
        this.caculateSelected()
        this.clearDrag()
        e.stopPropagation()
        e.preventDefault()
    }
    onMouseLeave(e) {
        this.emit('mouseLeave', e)
        this.dragFlag = false
        this.clearDrag()
        e.stopPropagation()
        e.preventDefault()
    }
}

export default DragSelect