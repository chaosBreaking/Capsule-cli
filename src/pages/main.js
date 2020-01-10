import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { extendObservable } from 'mobx';
import BaseStore from '@fundation/BaseStore';
import { BrowserRouter } from 'react-router-dom';
import Loader from '@components/Loader';
import Footer from '@components/Footer';
import LoaderStore from '@components/Loader/store';

export default class Main extends Component {
    constructor (props) {
        super(props);
        this.store = new BaseStore();
        extendObservable(this.store, {
            loaderStore: new LoaderStore(props, () => this.store)
        });
    }

    render () {
        return (
            <Provider store={this.store}>
                <BrowserRouter>
                    <div className="main"
                        onClick={e => this.store.EventBus.emit('GLBClick', e)}
                        onContextMenu={e => this.store.EventBus.emit('GLBContextMenu')}
                    >
                        <Loader></Loader>
                        <Footer></Footer>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}
