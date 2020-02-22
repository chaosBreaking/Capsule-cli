/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import { HEADER } from '../../constant';
import s from './FileList.scss';
import DragSelect from '../DragSelect';
import ContextMenu from '../ContextMenu';
import { Grow } from '@material-ui/core';

class Header extends Component {
    constructor (props = {}) {
        super(props);
    }

    render () {
        return (
            <div className={s.topBar}>
                {HEADER.map(name => <div className={s.listHeader} key={HEADER.indexOf(name)}>{name}</div>)}
            </div>
        );
    }
}
class ListItem extends Component {
    constructor (props = {}) {
        super(props);
    }

    render () {
        const item = HEADER.map((headerName, index) => {
            const value = this.props.file[headerName];
            return <span className={s.itemProperty} key={index} index={index}>{value}</span>;
        });
        return (
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={300}>
                <div className={s.listItem} index={this.props.index}>
                    {item}
                    <br></br>
                </div>
            </Grow>
        );
    }
}
@inject('store')
@observer
class FileList extends DragSelect {
    constructor (props = {}) {
        super(props);
        this.debounceBarX = 40;
        this.debounceBarY = 40;
        this.mousePosition = {
            x: '',
            y: ''
        };
        this.on('mouseDown', e => {
            this.menu && this.menu.clearMenu();
            const lb = document.getElementById('listBody');
            // 拖拽时样式，不出现hover时子项目的背景阴影
            lb.className = `${s.listBody} ${s.selecting}`;
        });
        this.on('mouseUp', e => {
            const lb = document.getElementById('listBody');
            // 恢复非选择时样式
            lb.className = `${s.listBody}`;
        });
    }

    get store () {
        return this.props.store.fileStore;
    }

    caculateSelected () {
        const { top: borderTop, bottom: borderBottom } = this.target.getBoundingClientRect();
        const items = document.getElementsByClassName(s.listItem);
        for (const item of items) {
            const position = item.getBoundingClientRect();
            // tolerence bar +-30
            if (position.top + 30 > borderTop && position.bottom - 30 < borderBottom) {
                item.className += ' ' + s.active;
                const itemIndex = item.getAttribute('index');
                !this.selectedArr.includes(itemIndex) && this.selectedArr.push(itemIndex);
            } else {
                item.className = `${s.listItem}`;
            }
        }
    }

    clearSelected () {
        const items = document.getElementsByClassName(s.listItem);
        this.selectedArr.forEach(index => {
            items[index].className = `${s.listItem}`;
        });
        this.selectedArr = [];
    }

    onRef (ref) {
        this.menu = ref;
    }

    contextMenuHandler (e) {
        e.stopPropagation();
        e.preventDefault();
        this.menu.activateMenu({ x: this.startX, y: this.startY });
    }

    clickHandler (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    renderItems () {
        return this.store.currentFilesList.map((file, index) => {
            return <ListItem key={index} file={file} index={index}></ListItem>;
        });
    }

    render () {
        return (
            <div className={s.listContainer}
                onMouseDown = { e => this.onMouseDown(e) }
                onMouseMove = { e => this.onMouseMove(e) }
                onMouseUp = { e => this.onMouseUp(e) }
                onMouseLeave = { e => this.onMouseLeave(e) }
                onContextMenu = { e => this.contextMenuHandler(e) }
            >
                <ContextMenu onRef = { (ref) => this.onRef(ref) }></ContextMenu>
                <div className={s.dragMusk} id="dragMusk"></div>
                <div className={s.listBody} id="listBody" onClick={ e => this.clickHandler(e) }>
                    { this.renderItems() }
                </div>
            </div>
        );
    }
}

export default FileList;
