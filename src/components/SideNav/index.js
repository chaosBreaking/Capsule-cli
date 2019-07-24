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
                <p className="itemLeftBorder"></p>
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
        const topItem = top.map((obj, index) => {
            return <NavItem key={ index } {...obj}></NavItem>
        })
        const bottomItem = bottom.map((obj, index) => <NavItem {...obj} key={ index }></NavItem>)
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