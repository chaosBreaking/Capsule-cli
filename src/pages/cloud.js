import React, { Component } from 'react';
import SideNav from '@components/SideNav';
import ExtendBar from '@components/ExtendBar';
import Storage from '@components/Storage';
import BaseStore from '@fundation/BaseStore';
import HeaderBar from '@components/HeaderBar';
import { Provider } from 'mobx-react';
import { extendObservable } from 'mobx';
import ListStore from '@components/CascadingList/store';
import FileStore from '@components/Storage/store';

export default class Cloud extends Component {
    constructor (props = {}) {
        super(props);
        this.store = new BaseStore();
        extendObservable(this.store, {
            listStore: new ListStore(props, () => this.store),
            fileStore: new FileStore(props, () => this.store)
        });
    }

    render () {
        return (
            <Provider store={this.store}>
                <div className="App"
                    onClick={e => this.store.EventBus.emit('GLBClick', e)}
                    onContextMenu={e => this.store.EventBus.emit('GLBContextMenu')}>
                    <HeaderBar></HeaderBar>
                    <div className="cloud">
                        <SideNav active={'cloud'}></SideNav>
                        <ExtendBar></ExtendBar>
                        <Storage></Storage>
                    </div>
                </div>
            </Provider>
        );
    }
}
