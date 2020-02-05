import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MenuList from '@material-ui/core/MenuList';
import { MenuItem } from '@material-ui/core';
import s from './index.scss';

@inject('store')
@observer
class ContextMenu extends Component {
    constructor (props = {}) {
        super(props);
        this.state = {
            showMenu: 'hidden'
        };
        this.state = {
            menu: (
                <MenuList onClick={e => this.clearMenu(e)}>
                    <MenuItem>
                        <i className={'iconfont icon-newfolder2 ' + s.icon}></i>
                        新建文件夹
                    </MenuItem>
                    <MenuItem>
                        <i className={'iconfont icon-uploadfile1 ' + s.icon}></i>
                        上传文件
                    </MenuItem>
                    <MenuItem>
                        <i className={'iconfont icon-uploadfolder ' + s.icon}></i>
                        上传文件夹
                    </MenuItem>
                </MenuList>
            )
        };
    }

    activateMenu (param = {}) {
        !param.default && param.option && this.setState({
            menu: param.option.menu
        });
        this.setState({
            showMenu: 'visible',
            left: param.x + 'px' || '0px',
            top: param.y + 'px' || '0px'
        });
    }

    clearMenu () {
        this.setState({
            showMenu: 'hidden'
        });
    }

    componentDidMount () {
        this.props.onRef(this);
    }

    render () {
        return (
            <React.Fragment>
                <div className={s.ContextMenuContainer} id="ContextMenuContainer"
                    style={{
                        visibility: this.state.showMenu,
                        top: this.state.top,
                        left: this.state.left
                    }}
                >
                    { this.state.menu }
                </div>
            </React.Fragment>
        );
    }
}

export default ContextMenu;
export function createMenu (arr = []) {
    const items = arr.map((obj, index) => {
        return <MenuItem key={index}>{ obj.name }</MenuItem>;
    });
    return <MenuList>{items}</MenuList>;
}
