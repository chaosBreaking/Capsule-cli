import React, { Component } from 'react';
import { inject, Provider, observer } from 'mobx-react';
import store from './store';
import List from '@material-ui/core/List';
import CListItem from './CListItem';
import s from './index.scss';

@inject('store')
@observer
class CascadingList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            list: props.data || [],
            collapse: false,
            active: {},
            selected: ''
        };
    }

    get store () {
        return this.props.store.listStore;
    }

    render () {
        this.items = this.state.list.map((obj, index) => {
            return <CListItem store={this.store} key={index} index={index} active={this.state.active} {...obj} deep={0} path={`/${obj.title}`}></CListItem>;
        });
        return (
            <Provider store={store}>
                <List className={s.root}>
                    {this.items}
                </List>
            </Provider>
        );
    }
}

export default CascadingList;
