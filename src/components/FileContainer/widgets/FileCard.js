import React, { Component } from 'react';
import './FileCard.scss';
import img from '../images/file.png';
import DragSelect from './DragSelect';
import ContextMenu, { createMenu } from './ContextMenu';
import { Grow } from '@material-ui/core';
const cardMenu = createMenu([
    {
        name: '打开'
    },
    {
        name: '复制'
    },
    {
        name: '移动到'
    },
    {
        name: '分享'
    },
    {
        name: '重命名'
    },
    {
        name: '删除'
    },
    {
        name: '属性'
    },
]);
const defaultMenu = createMenu([
    {
        name: '上传文件'
    },
    {
        name: '新建文件夹'
    },
    {
        name: '属性'
    },
]);
class CardItem extends Component {
    constructor (props = {}) {
        super(props);
    }

    render () {
        return (
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={300}>
                <div className="card" index={this.props.index} id="cardItem">
                    <div className='cardMusk' id='cardMusk'></div>
                    <div className="image">
                        <img src={img} alt="cat" width={'100rem'}></img>
                    </div>
                    <div className="info">
                        <span className="itemProperty">
                            {this.props.file.name}
                        </span>
                    </div>
                </div>
            </Grow>
        );
    }
}
class FileCard extends DragSelect {
    constructor (props = {}) {
        super(props);
        this.debounceBarX = 200;
        this.debounceBarY = 200;
        this.menu = [];
        this.on('mouseDown', e => {
            this.menu && this.menu.clearMenu();
        });
    }

    caculateSelected () {
        const { top: borderTop, bottom: borderBottom, left: borderLeft, right: borderRight } = this.target.getBoundingClientRect();
        const items = document.getElementsByClassName('card');
        // eslint-disable-next-line no-unused-vars
        for (const item of items) {
            const position = item.getBoundingClientRect();
            // tolerent bar +-30
            if (position.top + 100 > borderTop &&
                position.bottom - 100 < borderBottom &&
                position.left + 100 > borderLeft &&
                position.right - 100 < borderRight
            ) {
                item.className += ' active';
                const itemIndex = item.getAttribute('index');
                !this.selectedArr.includes(itemIndex) && this.selectedArr.push(itemIndex);
            } else {
                item.className = 'card';
            }
        }
    }

    clearSelected () {
        const items = document.getElementsByClassName('card');
        this.selectedArr.forEach(index => {
            items[index].className = 'card';
        });
        this.selectedArr = [];
    }

    onRef (ref) {
        this.menu = ref;
    }

    contextMenuHandler (e) {
        e.stopPropagation();
        e.preventDefault();
        let option = {};
        if (e.target.id && e.target.id === 'cardMusk') {
            option = { menu: cardMenu };
        } else {
            option = { menu: defaultMenu };
        }
        this.menu.activateMenu({ x: this.startX, y: this.startY, default: false, option });
    }

    render () {
        const cardItem = this.props.files.map((file, index) => {
            return <CardItem key={ index } file={ file } index={ index }></CardItem>;
        });
        return (
            <div className="cardContainer"
                onMouseDown = { e => this.onMouseDown(e) }
                onMouseMove = { e => this.onMouseMove(e) }
                onMouseUp = { e => this.onMouseUp(e) }
                onMouseLeave = { e => this.onMouseLeave(e) }
                onContextMenu = { e => this.contextMenuHandler(e) }
            >
                <ContextMenu onRef = { ref => this.onRef(ref) }></ContextMenu>
                <div className="dragMusk" id="dragMusk"></div>
                { cardItem }
            </div>
        );
    }
}

export default FileCard;
