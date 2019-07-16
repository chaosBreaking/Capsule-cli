import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {appState} from './AppStore'

@observer
class Input extends Component {
    constructor(props) {
        super(props)
        this.id = Math.random()
        this.state = {
            value: ''
        }
    }
    inputHandler(e) {
        this.setState({
            value: e.target.value
        })
    }
    keyHandler(e) {
        switch (e.keyCode) {
            case 13: 
                return this.addNew()
        }
    }
    render() {
        return (
            <React.Fragment>
                <input type='text' placeholder='just input something' onChange={e => this.inputHandler(e)} onKeyDown={e=>this.keyHandler(e)}></input>
                <input type='submit' onClick={e => this.addNew(e.target.value)}></input>
                <p> {this.props.appState.value} </p>            
            </React.Fragment>
        )
    }
    addNew() {
        return this.props.appState.addNew(this.state.value)
    }
}

export default function InputView(props) {
    return (
        <Input appState={appState}></Input>
    )
}