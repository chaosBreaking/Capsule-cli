import React, { Component } from 'react'

class CardItem extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        return (
            <div>
                <span>
                    { this.props.file.name }
                </span>
            </div>
        )
    }
}
class FileCard extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        const cardItem = this.props.files.map((file, index) => {
            return <CardItem key={ index } file={file}></CardItem>
        })
        return (
            <div>
                { cardItem }
            </div>
        )
    }
}

export default FileCard