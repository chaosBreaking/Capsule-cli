import React, { Component } from 'react';
import { sideNavItem } from './constant.js';
import NavItem from './navItem';
import s from './index.scss';

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
