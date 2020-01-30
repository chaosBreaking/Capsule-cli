import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import BaseStore from '@fundation/BaseStore';
import { BrowserRouter } from 'react-router-dom';
import Loader from '@components/Loader';
import Footer from '@components/Footer';
import LoaderStore from '@components/Loader/store';
import InitStore from '@components/Initializer/store';
import Initilizer from '@components/Initializer';
@observer
export default class Main extends Component {
    constructor (props) {
        super(props);
        this.store = new BaseStore();
        extendObservable(this.store, {
            loaderStore: new LoaderStore(props, () => this.store),
            initStore: new InitStore(props, () => this.store)
        });
    }

    renderContent () {
        const { initialized } = this.store;
        return (
            initialized
                ? <Loader></Loader>
                : <Initilizer></Initilizer>
        );
    }

    render () {
        return (
            <Provider store={this.store}>
                <BrowserRouter>
                    <div className="main"
                        onClick={e => this.store.EventBus.emit('GLBClick', e)}
                        onContextMenu={e => this.store.EventBus.emit('GLBContextMenu')}
                    >
                        {this.renderContent()}
                        <Footer></Footer>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}
