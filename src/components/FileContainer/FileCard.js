import React, { Component } from 'react'
import './FileCard.scss'
import img from "../../file.png"
import DragSelect from './DragSelect'
class CardItem extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        return (
            <div className="card" index={this.props.index}>
                <div className="image">
                    <img src={img} alt="cat" width={'100rem'}></img>
                </div>
                <div className="info">
                    <span className="itemProperty">
                        {this.props.file.name}
                    </span>
                </div>
            </div>
        )
    }
}
class FileCard extends DragSelect {
    constructor(props = {}) {
        super(props)
        this.debounceBarX = 200
        this.debounceBarY = 200
    }
    caculateSelected() {
        const { top: borderTop, bottom: borderBottom, left: borderLeft, right: borderRight } = this.target.getBoundingClientRect()
        const items = document.getElementsByClassName('card')
        for(let item of items) {
            let position = item.getBoundingClientRect()
            // tolerent bar +-30
            if (position.top + 100 > borderTop 
                && position.bottom - 100 < borderBottom
                && position.left + 100 > borderLeft
                && position.right - 100 < borderRight
            ) {
                item.className += ' active'
                const itemIndex = item.getAttribute('index')
                !this.selectedArr.includes(itemIndex) && this.selectedArr.push(itemIndex)
            } else {
                item.className = 'card'
            }
        }
    }
    clearSelected() {
        const items = document.getElementsByClassName('card')
        this.selectedArr.forEach(index => {
            items[index].className = 'card'
        })
        this.selectedArr = []
    }
    render() {
        const cardItem = this.props.files.map((file, index) => {
            return <CardItem key={ index } file={ file } index={ index }></CardItem>
        })
        return (
            <div className="cardContainer"
                onMouseDown = { e => this.onMouseDown(e) }
                onMouseMove = { e => this.onMouseMove(e) }
                onMouseUp = { e => this.onMouseUp(e) }
                onMouseLeave = { e => this.onMouseLeave(e) }
            >
                <div className="dragMusk" id="dragMusk"></div>
                { cardItem }
            </div>
        )
    }
}

export default FileCard