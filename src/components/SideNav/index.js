import React, { Component } from 'react';
import { sideNavItem } from './constant.js';
import s from './index.scss';

class NavItem extends Component {
    constructor (props) {
        super(props);
        this.id = this.props.id;
        this.url = this.props.url;
    }

    render () {
        const classname = this.props.active === this.id ? `${s.navItem} ${s.selected}` : s.navItem;
        return (
            <div className={classname}>
                <p className={s.itemLeftBorder}></p>
                <i className={ 'iconfont ' + this.props.icon } id={this.props.id} key={this.props.id}></i>
            </div>
        );
    }
}
class SideNav extends Component {
    constructor (props = {}) {
        super(props);
    }

    render () {
        const { top, bottom } = sideNavItem;
        const topItem = top.map((obj, index) => {
            return <NavItem key={ index } {...obj} active={this.props.active}></NavItem>;
        });
        const bottomItem = bottom.map((obj, index) => <NavItem {...obj} key={ index }></NavItem>);
        return (
            <div className={s.sideNavContainer}>
                <div className={s.topPart}>
                    { topItem }
                </div>
                <div className={s.bottomPart}>
                    { bottomItem }
                </div>
            </div>
        );
    }
}

export default SideNav;
