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
    }
    activateMenu(position) {
        const menu = document.getElementById('ContextMenuContainer')  
        menu.style.left = position ? position.x + 'px' : '0px'
        menu.style.top = position ? position.y + 'px' : '0px'
        menu.style.visibility = 'visible'
    }
    clearMenu() {
        const menu = document.getElementById('ContextMenuContainer')  
        menu.style.visibility = 'hidden'    
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    render() {
        return (
            <React.Fragment>
                <div className="ContextMenuContainer" id="ContextMenuContainer">
                    <MenuList>
                        <MenuItem>Option 1</MenuItem>
                        <MenuItem>Option 2</MenuItem>
                        <MenuItem>Option 3</MenuItem>
                        <MenuItem>Option 4</MenuItem>
                        <MenuItem>Option 5</MenuItem>
                    </MenuList>
                </div>
            </React.Fragment>
        )
    }
}

export default ContextMenu