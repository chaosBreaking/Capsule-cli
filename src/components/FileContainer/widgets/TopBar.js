import React, { Component } from "react";
import { appState } from '../AppStore';
import { inject, observer } from "mobx-react";
import './TopBar.scss'

@inject('store')
@observer
class SearchBar extends Component {
    constructor(props = {}) {
        super(props)
        this.state = {
            expanded: false,
            width: 0,
            visibility: 'hidden',
            icon: {
                color: ''
            }
        }
        this.props.store.EventBus.on('GlobalClick', (e) => {
            if(this.state.expanded) {
                this.clearStatus()
            }
        })
    }
    componentDidMount() {
    }
    clearStatus() {
        this.setState({
            expanded: false,
            width: 0,
            // transform: 'scale(0)',
            paddingLeft:0,
            paddingRight:0,
            height: 0,
            icon: {
                color: ''
            }
        })
        setTimeout(() => {
            this.setState({
                visibility: 'hidden',
            })
        }, 300)
    }
    clickHandler(e) {
        switch(e.target.tagName) {
            case 'I':
                this.expand(e)
                break
            case 'INPUT':
                break
            default:
                this.defaultClickHandler(e)
                break
        }
    }
    defaultClickHandler(e) {
        this.clearStatus()
    }
    expand() {
        this.setState({
            expanded: true,
            width: '100%',
            visibility: 'visible',
            icon: {
                color: '#868686'
            },
            transform: 'scale(1)'
        })
    }
    render() {
        return (
            <div className="searchBar" onClick={e => this.clickHandler(e)}>
                    <i className={ 'iconfont icon-fcstubiao13'} id="searchIcon" onClick={e => this.expand(e)} style={{color: this.state.icon.color}}></i>
                    <input placeholder="搜索文件名或哈希值" id="input" style={{transform: this.state.transform, width: this.state.width, visibility: this.state.visibility, paddingRight: this.state.paddingRight }}></input>
            </div>
        )
    }
}
@inject('store')
@observer
class TopBar extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        return (
            <div className="topBarContainer">
                <div className="topBarLeft">
                    <div className="alignStart expandSelf border fullHeight">
                        <SearchBar></SearchBar>
                    </div>
                </div>
                <div className="topBarMiddle expandSelf">
                </div>
                <div className="topBarRight shrinkSelf">
                    <i onClick={ e => {  } } className="iconfont icon-sortitem alignEnd block pointer"></i>
                    <i onClick={ e => { appState.change() } } className="iconfont icon-apps1 alignEnd block pointer"></i>
                </div>
            </div>
        )
    }
}
export default TopBar