import React, { Component } from 'react';
import s from './index.scss';
import TopBar from '../Storage/widgets/TopBar';
import CascadingList from '../CascadingList';
// import { getFolderList } from '../../service/file';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class ExtendBar extends Component {
    get store () {
        return this.props.store;
    }

    render () {
        const topBarTitle = <span>存储</span>;
        return (
            <div className={s.ExtendBarContainer}>
                <div>
                    <TopBar middle={topBarTitle} color={'#ddd'}></TopBar>
                </div>
                <div className={s.ExtendBarMain}>
                    <CascadingList></CascadingList>
                </div>
            </div>
        );
    }
}

export default ExtendBar;
