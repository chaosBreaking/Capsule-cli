import React, { Component } from 'react';
import './index.scss';
import TopBar from '../FileContainer/widgets/TopBar';
import CascadingList from '../CascadingList';
import { getFolderList } from '../../service/file';
class ExtendBar extends Component {
    constructor (props) {
        super(props);
        this.id = '';
    }

    render () {
        const topBarTitle = <span>存储</span>;
        return (
            <div className='ExtendBarContainer'>
                <div>
                    <TopBar middle={topBarTitle} color={'#eee'}></TopBar>
                </div>
                <div className='ExtendBarMain'>
                    <CascadingList data={getFolderList()}></CascadingList>
                </div>
            </div>
        );
    }
}

export default ExtendBar;
