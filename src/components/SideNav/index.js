import React, { Component } from 'react'
import { sideNavItem } from './constant.js'
import './index.scss'
class NavItem extends Component {
    constructor(props) {
        super(props)
        this.id = this.props.id
    }
    render() {
        return (
            <div className='navItem'>
                <i className={ 'iconfont ' + this.props.icon } id={this.props.id} key={this.props.id}></i>
            </div>
        )
    }
}
class SideNav extends Component {
    constructor(props = {}) {
        super(props)
    }
    render() {
        const { top, bottom } = sideNavItem
        const topItem = top.map(obj => {
            return <NavItem {...obj}></NavItem>
        })
        const bottomItem = bottom.map(obj => <NavItem {...obj}></NavItem>)
        return (
            <div className="sideNavContainer">
                <div className="topPart">
                    { topItem }
                </div>
                <div className="bottomPart">
                    { bottomItem }
                </div>
            </div>
        )
    }
}

export default SideNav