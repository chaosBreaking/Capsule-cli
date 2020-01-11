import React, { Component } from 'react';
import s from './index.scss';
import { isArray } from '@utils';
import { inject, observer } from 'mobx-react';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

@inject('store')
@observer
export default class CListItem extends Component {
    constructor (props = {}) {
        super(props);
        this.subItem = props.children;
        this.deep = props.deep;
        this.path = props.path || '';
        this.state = {
            path: this.path,
            active: false,
            className: 'CListItemMain',
            children: [],
            selected: this.store.currentPath === this.path
        };
    }

    get store () {
        return this.props.store;
    }

    clickHandler = (e) => {
        this.store.changePath(this.path);
        if (this.state.active) {
            // 收起
            this.collapse();
        } else {
            // 展开
            this.setState({
                selected: this.store.currentPath === this.path
            });
            this.expand();
        }
    }

    collapse () {
        this.setState({
            active: false
        });
    }

    expand () {
        this.subItem && this.setState({
            active: true,
            children: isArray(this.subItem) ? this.subItem.map((obj, index) => {
                return <CListItem key={index} index={index} active={this.state.active} {...obj} deep={this.deep <= 4 ? this.deep + 1 : this.deep} path={`${this.path}/${obj.title}`} store={this.props.store}></CListItem>;
            }) : []
        });
    }

    render () {
        // const conClass = this.state.selected ? 'CListItemMain selected' : 'CListItemMain';
        const arrClass = this.state.active ? 'iconfont icon-right alignLeft rotate' : 'iconfont icon-right alignLeft';
        return (
            <div className={s.CListItem} selected={this.store.currentPath === this.path}>
                <div className={s.CListItemMain} key={this.props.key} index={+this.props.index} onClick={this.clickHandler}>
                    <div className={s.CListItemBody} style={{ marginLeft: this.deep + 'rem' }}>
                        <i className={arrClass}></i>
                        <i className='iconfont icon-folder'></i>
                        <span>{this.props.title}</span>
                    </div>
                </div>
                {
                    this.state.active &&
                    <i className={s.CListSubItem}>
                        {this.state.children}
                    </i>
                }
            </div>
        );
        // return (
        //     <>
        //         <ListItem button onClick={this.clickHandler}>
        //             <ListItemIcon>
        //                 <i className='iconfont icon-folder'></i>
        //             </ListItemIcon>
        //             <ListItemText primary="Inbox" />
        //             {!this.state.active ? <span>+</span> : <span>-</span>}
        //         </ListItem>
        //         <Collapse in={this.state.active} timeout="auto" unmountOnExit>
        //             <List component="div">
        //                 {this.state.children}
        //             </List>
        //         </Collapse>
        //   </>
        // );
    }
}
