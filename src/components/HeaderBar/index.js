import React, { Component } from 'react';
import s from './index.scss';
export default class HeaderBar extends Component {
    constructor (props = {}) {
        super(props);
        this.navLinks = [];
    }

    render () {
        return (
            <div className={s.topHeader}>
                Capsule
            </div>
        );
    }
}
