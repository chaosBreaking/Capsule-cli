import React from 'react';
import './App.css';
import { Provider, observer } from 'mobx-react'
import { observable, action } from 'mobx';
import FileContainer from './components/FileContainer';
import { Loading } from './components/Utilities/Loading';
// import node from './service/ipfs'
import eventBus from './components/EventBus'
import ProgressBar from './components/ProgressBar/ProgressBar';

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
                <ProgressBar to={95} color={'red'} height={0.5}></ProgressBar>
                {/* <FileContainer></FileContainer>
                <Loading></Loading> */}
            </div>
        </Provider>
    );
}

export { App }
