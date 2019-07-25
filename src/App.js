import React from 'react';
import './App.css';
import { Provider, observer } from 'mobx-react'
import { observable, action } from 'mobx';
import FileContainer from './components/FileContainer';
// import node from './service/ipfs'
import eventBus from './components/EventBus'
import SideNav from './components/SideNav';
import HeaderBar from './components/HeaderBar';
import BaseStore from './fundation/BaseStore'

eventBus.on('IPFS_READY', () => {
    
})
function App() {
    let rootStore = new BaseStore()
    return (
        <Provider store={rootStore}>
            <div className="App" onClick={e => {rootStore.EventBus.emit('GlobalClick', e)}}>
                <div className="header">
                    <HeaderBar></HeaderBar>
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
