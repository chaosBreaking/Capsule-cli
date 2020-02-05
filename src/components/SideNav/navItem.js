import React, { Component } from 'react';
import s from './index.scss';

export default class NavItem extends Component {
    constructor (props) {
        super(props);
        this.id = this.props.id;
        this.url = this.props.url;
    }

    render () {
        const classname = this.props.active === this.id ? `${s.navItem} ${s.selected}` : s.navItem;
        return (
            <div className={classname}>
                <p className={s.itemLeftBorder}></p>
                <i className={ 'iconfont ' + this.props.icon } id={this.props.id} key={this.props.id}></i>
            </div>
        );
    }
};
