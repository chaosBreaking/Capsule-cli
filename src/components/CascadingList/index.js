import React, { Component } from 'react'
import './index.scss'
import { isArray } from '../../util'

class CListItem extends Component {
    constructor(props = {}) {
        super(props)
        this.subItem = props.children
        this.state = {
            active: false,
            className: 'CListItemMain',
            children: [],
        }
    }
    clickHandler(e) {
        if(this.state.active) {
            // 收起
            this.collapse()
        } else {
            // 展开
            this.expand()
        }
    }
    collapse() {
        this.setState({
            active: false
        })
    }
    expand() {
        this.subItem && this.setState({
            active:true,
            children: isArray(this.subItem) ? this.subItem.map((obj, index) => {
                return <CListItem key={index} index={index} active={this.state.active} {...obj}></CListItem>
            }) : []
        })
    }
    render() {
        const conClass = this.state.active ? 'CListItemMain selected' : 'CListItemMain'
        const arrClass = this.state.active ? 'iconfont icon-right alignRight rotate' : 'iconfont icon-right alignRight'
        const clickHandler = this.clickHandler.bind(this)
        return (
            <li className='CListItem'>
                <span className={conClass} key={this.props.key} index={+this.props.index} onClick={clickHandler}>
                    <i className='iconfont icon-folder'></i>
                    <span>{ this.props.title }</span>
                    <i className={arrClass}></i>
                </span>
                {
                    this.state.active && 
                    <ul className='CListSubItem'>
                        { this.state.children}
                    </ul>
                }
            </li>
        )
    }
}

class CascadingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: props.data || [],
            collapse: false,
            active: {}
        }
    }
    clickHandler(e) {
        const index = +e.target.parentNode.attributes.index.nodeValue
        if(!this.state.active[index]) {
            const v = { ...this.state.active, [index]: true }
            this.setState({
                active: v
            })
        } else {
            this.state.active[index] = false
            const v = this.state.active
            this.setState({
                active: v
            })
        }
    }
    componentWillMount() {
    }
    render() {
        this.items = this.state.list.map((obj, index) => {
            return <CListItem key={index} index={index} active={this.state.active} {...obj}></CListItem>
        })
        return (
            <ul className='CascadingListContainer'>
                { this.items }
            </ul>
        )
    }
}

export default CascadingList