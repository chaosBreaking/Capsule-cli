import React, { Component } from 'react'
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import MenuList from '@material-ui/core/MenuList';
import { MenuItem } from '@material-ui/core';
import './ContextMenu.scss'

@inject('store')
@observer
class ContextMenu extends Component {
    constructor(props = {}) {
        super(props)
        this.state = {
            showMenu: 'hidden'
        }
        this.state = {
            menu: (
                <MenuList onClick={e => this.clearMenu(e)}>
                    <MenuItem>Option 1</MenuItem>
                    <MenuItem>Option 2</MenuItem>
                    <MenuItem>Option 3</MenuItem>
                    <MenuItem>Option 4</MenuItem>
                    <MenuItem>Option 5</MenuItem>
                </MenuList>
            )
        }
    }
    activateMenu(param = {}) {
        !param.default && param.option && this.setState({
            menu: param.option.menu
        })
        this.setState({
            showMenu: 'visible',
            left: param.x + 'px' || '0px',
            top: param.y + 'px' || '0px'
        })
    }
    clearMenu() {
        this.setState({
            showMenu: 'hidden'
        })
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    render() {
        return (
            <React.Fragment>
                <div className="ContextMenuContainer" id="ContextMenuContainer"
                    style={{
                        visibility: this.state.showMenu,
                        top: this.state.top,
                        left: this.state.left
                    }}
                >
                    { this.state.menu }
                </div>
            </React.Fragment>
        )
    }
}

export default ContextMenu
export function createMenu (arr = []) {
    const items = arr.map(obj => {
        return <MenuItem>{ obj.name }</MenuItem>
    })
    console.log(items)
    return <MenuList>{items}</MenuList>
}