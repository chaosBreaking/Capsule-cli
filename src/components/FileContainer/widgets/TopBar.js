import React, { Component } from "react";
import { appState } from '../AppStore';
import { inject, observer } from "mobx-react";
import './TopBar.scss'
import SearchBar from './SearchBar'

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
                </div>
                <div className="topBarMiddle expandSelf">
                </div>
                <div className="topBarRight shrinkSelf">
                    <SearchBar></SearchBar>
                    <i onClick={ e => {  } } className="iconfont icon-sortitem alignEnd block pointer"></i>
                    <i onClick={ e => { appState.change() } } className="iconfont icon-apps1 alignEnd block pointer"></i>
                </div>
            </div>
        )
    }
}
export default TopBar