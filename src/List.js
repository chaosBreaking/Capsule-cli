import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {appState} from './AppStore'
import { runInAction } from 'mobx';

class ListItem extends Component {
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
@inject('store')
@observer
class List extends Component {
    constructor(props) {
        super(props)
        this.id = Math.random()
        this.state = {
            value: '',
        }
    }
    selectHandler(e) {
        this.props.appState.value = e.target.value
    }
    componentDidMount() {
        setTimeout(() => {
            runInAction(()=>this.props.appState.addDic())}, 2000)
    }
    mmHandler(e) {
        let op = Math.random()
        let r = ~~(Math.random() * 256)
        let g = ~~(Math.random() * 256)
        let b = ~~(Math.random() * 256)
        // console.log(`rgb(${r},${g},${b})`)
        this.setState({
            style: {
                background: `rgba(${r},${g},${b},${op})`
            }
        })
    }
    render() {
        const items = this.props.appState.list.map((v, i) => {
            return <ListItem value={ v } key={ i }/>
        })
        let res = []
        for(let k in this.props.appState.dic) {
            res.push(<p key={k}>{ k } : {this.props.appState.dic[k]}</p>)
        }
        return (
            <React.Fragment>
                <div>{this.props.appState.list}</div>
                <div> You selected { this.props.appState.value }</div>
                <select onChange={e => this.props.appState.reset(e.target.value)}>
                    {items}
                </select>
                <div>{res}</div>
                <div>{this.props.appState.cn}</div>
                <div>{this.props.store.Theme}</div>
            </React.Fragment>
        );
    }
}
class ListViewer extends Component {
    constructor(props = {}) {
        super(props)
    }
    render(){
        return (
        <List appState={ appState } ></List>
    )}
}

export default ListViewer