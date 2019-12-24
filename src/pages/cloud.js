/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import SideNav from '../components/SideNav';
import ExtendBar from '../components/ExtendBar';
import FileContainer from '../components/FileContainer';
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
                <>
                    <div className="header">
                        <HeaderBar></HeaderBar>
                    </div>
                    <div className="main">
                        <SideNav active={'cloud'}></SideNav>
                        <ExtendBar></ExtendBar>
                        <FileContainer></FileContainer>
                    </div>
                </>
            </Provider>
        );
    }
}

export default Cloud;
