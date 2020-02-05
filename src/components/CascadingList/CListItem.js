import React, { Component } from 'react';
import s from './index.scss';
import { inject, observer } from 'mobx-react';
import { computed, observable, action } from 'mobx';

@inject('store')
@observer
export default class CListItem extends Component {
    @observable updateKey = '';
    constructor (props = {}) {
        super(props);
        this.deep = props.deep;
    }

    get store () {
        return this.props.store.fileStore;
    }

    get title () {
        return this.props.title;
    }

    get path () {
        return this.props.path ? this.props.path + this.title : this.title;
    }

    get children () {
        return this.props.data.children;
    }

    get hasChildren () {
        return this.children.length > 0;
    }

    @computed get arrClass () {
        return this.hasChildren
            ? this.expanded
                ? `iconfont icon-right ${s.alignLeft} ${s.rotate}`
                : `iconfont icon-right ${s.alignLeft}`
            : s.noChildren;
    }

    @computed get active () {
        return this.store.activePath.endsWith(this.title);
    }

    @computed get expanded () {
        // this.render
        return this.store.activePath.includes(this.title + '/');
    }

    @action renderTrigger = () => {};

    @action clickHandler = (e) => {
        // e.stopPropagation();
        this.updateKey = Math.random();
        this.forceUpdate();
        if (this.expanded) {
            // 收起到自身
            const st = this.path.indexOf(this.title);
            return this.store.setActiveFoder(this.path.slice(0, st) + this.title);
        } else if (this.active) {
            // 展开
            if (this.hasChildren) return this.store.setActiveFoder(this.path + '/');
            // 取消活跃
            const st = this.path.indexOf(this.title);
            return this.store.setActiveFoder(this.path.slice(0, st));
        } else {
            // 选中状态
            return this.store.setActiveFoder(this.path || this.title);
        }
    }

    renderChildren () {
        return this.children.length > 0 ? <div className={s.CListSubItem}>
            {
                this.children.map((obj, index) => {
                    const data = { ...obj }; // 直接使用obj，传递到子组件不是observable
                    return <CListItem activePath={this.store.activePath} path={`${this.path}/`} store={this.props.store} key={index} deep={this.deep <= 4 ? this.deep + 1 : this.deep} title={obj.title} data={data}></CListItem>;
                })
            }
        </div> : null;
    }

    render () {
        const conClass = this.active ? `${s.CListItemMain} ${s.selected}` : s.CListItemMain;
        const arrClass = this.arrClass;
        this.renderTrigger();
        return (
            <div className={s.CListItem} selected={this.active}>
                <div className={conClass} onClick={this.clickHandler}>
                    <div className={s.CListItemBody} style={{ marginLeft: this.deep + 'rem' }}>
                        <i className={arrClass}></i>
                        <i className='iconfont icon-folder'></i>
                        <span>{this.title}</span>
                    </div>
                </div>
                {
                    this.expanded && this.renderChildren()
                }
            </div>
        );
    }
}
