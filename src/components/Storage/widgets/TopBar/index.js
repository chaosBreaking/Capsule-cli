import React, { Component } from 'react';
import s from './index.scss';

export default class TopBar extends Component {
    constructor (props = {}) {
        super(props);
    }

    render () {
        return (
            <div className={s.topBarContainer} style={{ background: this.props.color }}>
                <div className={s.topBarLeft}>
                    {this.props.left}
                </div>
                <div className={`${s.topBarMiddle} ${s.expandSelf}`}>
                    {this.props.middle}
                </div>
                <div className={`${s.topBarRight} ${s.shrinkSelf}`}>
                    {this.props.right}
                </div>
            </div>
        );
    }
}
