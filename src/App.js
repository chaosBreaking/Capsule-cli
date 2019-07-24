import React from 'react';
import './App.css';
import { Provider, observer } from 'mobx-react'
import { observable, action } from 'mobx';
import FileContainer from './components/FileContainer';
import { Loading } from './components/Utilities/Loading';
// import node from './service/ipfs'
import eventBus from './components/EventBus'
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import { Toolbar } from '@material-ui/core';

class Store {
    @observable Theme = 'light'
    constructor(props = {}) {
    }
    @action.bound
    reset(value) {
        this.Theme = value
    }
}
let store = new Store()
eventBus.on('IPFS_READY', () => {
    
})
function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <div className="header">
                    <TopNav></TopNav>
                </div>
                <div className="main">
                    <SideNav></SideNav>
                    
                    <FileContainer></FileContainer>
                </div>
                <div className="footer">

                </div>
            </div>
        </Provider>
    );
}

export { App }
