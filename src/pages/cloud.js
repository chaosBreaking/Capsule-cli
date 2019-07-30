/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from "react";
import SideNav from "../components/SideNav";
import ExtendBar from '../components/ExtendBar';
import FileContainer from '../components/FileContainer';

class Cloud extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        return (
            <div className="main">
                <SideNav></SideNav>
                <ExtendBar></ExtendBar>
                <FileContainer></FileContainer>
            </div>
        )
    }
}

export default Cloud
