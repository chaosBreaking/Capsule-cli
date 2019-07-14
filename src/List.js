import React, { Component } from 'react'
import { observer } from 'mobx-react'

class ListItem extends Component {
    @observer value = ''
    constructor(props) {
        super(props)
        this.value = props.value
    }
    render() {
        return (
            <option value={this.value}>{ this.value }</option>
        );
    }
}
class List extends Component {
    constructor(props) {
        super(props)
        this.id = Math.random()
        this.state = {
            value: ''
        }
    }
    selectHandler(e) {
        // this.setState({
        //     value: e.target.value
        // })
        this.value = e.target.value
    }
    render() {
        const items = [1, 2, 3, 4].map(v => {
            return <ListItem value={ v } />
        })
        return (
            <React.Fragment>
                <div> You selected { this.state.value }</div>
                <select onChange={ e => this.selectHandler(e) }>
                    {items}
                </select>
            </React.Fragment>
        );
    }
}

export default List