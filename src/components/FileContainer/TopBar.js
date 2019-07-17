import React, { Component } from "react";
import { appState } from './AppStore';
import { inject, observer } from "mobx-react";
import './TopBar.scss'

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
                    <div className="alignStart expandSelf">left tools</div>
                </div>
                <div className="topBarMiddle expandSelf">
                </div>
                <div className="topBarRight shrinkSelf">
                    <i onClick={ e => {  } } className="iconfont icon-sortitem alignEnd block"></i>
                    <i onClick={ e => { appState.change() } } className="iconfont icon-apps1 alignEnd block"></i>
                </div>
            </div>
        )
    }
}
export default TopBar