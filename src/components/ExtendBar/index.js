import React, { Component } from 'react';
import s from './index.scss';
import TopBar from '../Storage/widgets/TopBar';
import CascadingList from '../CascadingList';
import { getFolderList } from '../../service/file';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class ExtendBar extends Component {
    constructor (props) {
        super(props);
        this.id = '';
    }

    get store () {
        return this.props.store;
    }

    render () {
        const topBarTitle = <span>存储</span>;
        return (
            <div className={s.ExtendBarContainer}>
                <div>
                    <TopBar middle={topBarTitle} color={'#eee'}></TopBar>
                </div>
                <div className={s.ExtendBarMain}>
                    <CascadingList data={getFolderList()}></CascadingList>
                </div>
            </div>
        );
    }
}

export default ExtendBar;
