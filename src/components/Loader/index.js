import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import s from './index.scss';
import logo from '@images/logo.png';
// import { deepPurple } from '@material-ui/core/colors';

@inject('store')
@observer
export default class Loader extends Component {
    get store () {
        return this.props.store;
    }

    get loaderStore () {
        return this.props.store.loaderStore;
    }

    componentDidMount () {
        this.loaderStore.init();
    }

    render () {
        const { isLoading, loadingInfo } = this.loaderStore;
        return (
            <div className={s.container}>
                <div className={s.loadBar}>
                    <img className={s.logo} src={logo}></img>
                    {isLoading && <CircularProgress size={'16rem'} thickness={1}/>}
                </div>
                <div className={s.loadingInfo}>
                    <h2>{loadingInfo}</h2>
                </div>
            </div>
        );
    }
}
