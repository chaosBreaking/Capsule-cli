/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import SideNav from '../components/SideNav';
import ExtendBar from '../components/ExtendBar';
import Storage from '../components/Storage';
import BaseStore from '../fundation/BaseStore';
import HeaderBar from '../components/HeaderBar';
import { Provider } from 'mobx-react';

class Cloud extends Component {
    constructor (props = {}) {
        super(props);
        this.store = new BaseStore();
    }

    render () {
        return (
            <Provider store={this.store}>
                <div className="App">
                    <HeaderBar></HeaderBar>
                    <div className="main">
                        <SideNav active={'cloud'}></SideNav>
                        <ExtendBar></ExtendBar>
                        <Storage></Storage>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default Cloud;
