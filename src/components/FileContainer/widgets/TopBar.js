import React, { Component } from "react";
import { appState } from '../AppStore';
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
            <div className="topBarContainer" style={{background: this.props.color}}>
                <div className="topBarLeft">
                    {this.props.left}
                </div>
                <div className="topBarMiddle expandSelf">
                    {this.props.middle}
                </div>
                <div className="topBarRight shrinkSelf">
                    {this.props.right}
                </div>
            </div>
        )
    }
}
export default TopBar