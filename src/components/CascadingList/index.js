import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import List from '@material-ui/core/List';
import CListItem from './CListItem';
import s from './index.scss';
@inject('store')
@observer
class CascadingList extends Component {
    get store () {
        return this.props.store.fileStore;
    }

    render () {
        const { foderList, activePath } = this.store;
        return (
            <List className={s.root}>
                {foderList.map((obj, index) => {
                    return <CListItem activePath={activePath} data={obj} title={obj.title} key={index} deep={0}></CListItem>;
                })}
            </List>
        );
    }
}

export default CascadingList;
