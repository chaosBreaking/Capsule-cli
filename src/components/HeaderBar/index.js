import React, { Component } from 'react';
import './index.scss';
export default class HeaderBar extends Component {
    constructor (props = {}) {
        super(props);
        this.navLinks = [];
    }

    render () {
        return (
            <div className="topHeader">
                Capsule
            </div>
        );
    }
}
