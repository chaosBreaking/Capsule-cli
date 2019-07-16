import React, { Component } from 'react'
import './FileCard.scss'
import img from "../../file.png"
class CardItem extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        return (
            <div className="card">
                <div className="image">
                    <img src={img} alt="cat" width={'100rem'}></img>
                </div>
                <div className="info">
                    <span className="itemProperty">
                        { this.props.file.name }
                    </span>
                </div>
            </div>
        )
    }
}
class FileCard extends Component {
    constructor(props = {}) {
        super(props)
        this.dragFlag = false
        this.startX = 0
        this.startY = 0
        this.target = ''
    }
    render() {
        const cardItem = this.props.files.map((file, index) => {
            return <CardItem key={ index } file={file}></CardItem>
        })
        return (
            <div className="cardContainer">
                <div className="dragMusk" id="dragMusk"></div>
                { cardItem }
            </div>
        )
    }
}

export default FileCard