import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import s from './index.scss';
import logo from '@images/logo.png';
// import { deepPurple } from '@material-ui/core/colors';
import navigation from '@utils/navigation';

@inject('store')
@observer
export default class Loader extends Component {
    get store () {
        return this.props.store;
    }

    get loaderStore () {
        return this.props.store.loaderStore;
    }

    async initForNew () {
        this.store.buildUserStore();
        this.store.registPod();
    }

    async syncData () {
        const masterPod = this.store.getPod({ type: 'master' });
        const res = await this.store.fetchData({ type: 'master', pubkey: masterPod.pubkey });
        this.store.updatePod(res.data);
    }

    componentDidMount () {
        if (!this.store.initialized) {
            navigation.forward('/');
        } else {
            this.syncData();
        }
    }

    forward () {
        navigation.forward('/cloud');
    }

    render () {
        const { isLoading } = this.loaderStore;
        return (
            <div className={s.container}>
                <div className={s.loadBar}>
                    <img className={s.logo} src={logo}></img>
                    {isLoading && <CircularProgress size={'22rem'} thickness={1}/>}
                </div>
                <div>
                    <h2>正在载入数据POD</h2>
                </div>
            </div>
        );
    }
}
