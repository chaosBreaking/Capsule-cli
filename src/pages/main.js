import React from 'react';
import { Provider } from 'mobx-react';
import HeaderBar from '../components/HeaderBar';
import BaseStore from '../fundation/BaseStore';
import { Route } from 'react-router-dom';
import Cloud from './cloud';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

function Main () {
    const rootStore = new BaseStore();
    return (
        <Provider store={rootStore}>
            <BrowserRouter>
                <div className="App"
                    onClick={e => rootStore.EventBus.emit('GLBClick', e)}
                    onContextMenu={e => rootStore.EventBus.emit('GLBContextMenu')}>
                    <div className="header">
                        <HeaderBar></HeaderBar>
                    </div>
                    <div className="main">
                        <Route path='/cloud' exact component={Cloud}></Route>
                    </div>
                    <div className="footer">

                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default Main;
