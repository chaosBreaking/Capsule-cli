import React, { Component } from 'react';
import './index.scss';
import { isArray } from '@utils';
import { inject, Provider } from 'mobx-react';
import store from './store';

@inject('store')
class CListItem extends Component {
    constructor (props = {}) {
        super(props);
        this.subItem = props.children;
        this.deep = props.deep;
        this.path = props.path || '';
        this.store = this.props.store;
        this.state = {
            path: this.path,
            active: false,
            className: 'CListItemMain',
            children: [],
            selected: this.store.currentPath === this.path
        };
    }

    clickHandler (e) {
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
        const clickHandler = this.clickHandler.bind(this);
        return (
            <div className='CListItem'>
                <div className='CListItemMain' key={this.props.key} index={+this.props.index} onClick={clickHandler}>
                    <div className='CListItemBody' style={{ marginLeft: this.deep + 'rem' }}>
                        <i className={arrClass}></i>
                        <i className='iconfont icon-folder'></i>
                        <span>{this.props.title}</span>
                    </div>
                </div>
                {
                    this.state.active &&
                    <i className='CListSubItem'>
                        {this.state.children}
                    </i>
                }
            </div>
        );
    }
}

class CascadingList extends Component {
    constructor (props) {
        super(props);
        this.store = store;
        this.state = {
            list: props.data || [],
            collapse: false,
            active: {},
            selected: ''
        };
    }

    clickHandler (e) {
        let target = e.target;
        // console.log(target.tagName, target.className,target.tagName + '' === 'DIV' , target.className !== 'CListItemMain')
        if (target.className + '' === 'CListItem') {
            target = target.firstChild;
        } else {
            while (target) {
                if ((target.className + '' === 'CListItemMain') || (target.className + '' === 'CListItemMain selected')) break;
                target = target.parentNode;
            }
        }
        console.log(target, target.tagName);
        // console.log(this.state.selected, target);
        if (this.state.selected && target === this.state.selected) {
            console.log('repeat');
            return 0;
        }
        // console.log(this.state.selected, target)
        this.setState({
            selected: target
        });
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.selected && (this.state.selected.className = 'CListItemMain');
        target.className = 'CListItemMain selected';
        this.props.setPath && this.props.setPath(this.store.currentPath);
        // const index = +e.target.parentNode.attributes.index.nodeValue;
        // if (!this.state.active[index]) {
        //     const v = { ...this.state.active, [index]: true };
        //     this.setState({
        //         active: v
        //     });
        // } else {
        //     const v = this.state.active;
        //     v[index] = false;
        //     this.setState({
        //         active: v
        //     });
        // }
    }

    render () {
        this.items = this.state.list.map((obj, index) => {
            return <CListItem key={index} index={index} active={this.state.active} {...obj} deep={0} path={`/${obj.title}`}></CListItem>;
        });
        return (
            <Provider store={store} path=''>
                <ul className='CascadingListContainer' onClick={this.clickHandler.bind(this)}>
                    {this.items}
                </ul>
            </Provider>
        );
    }
}

export default CascadingList;
