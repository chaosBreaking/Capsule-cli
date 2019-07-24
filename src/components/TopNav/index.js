import React, { Component, Fragment } from "react";
import { AppBar } from "@material-ui/core";

export default class TopNav extends Component {
    constructor(props = {}) {
        super(props)
        this.navLinks = []
    }
    render() {
        return (
            <AppBar position="static" color='primary'></AppBar>
        )
    }
}