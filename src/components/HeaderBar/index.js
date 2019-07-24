import React, { Component, Fragment } from "react";
import './index.scss'
export default class HeaderBar extends Component {
    constructor(props = {}) {
        super(props)
        this.navLinks = []
    }
    render() {
        return (
            <header className="topHeader"></header>
        )
    }
}