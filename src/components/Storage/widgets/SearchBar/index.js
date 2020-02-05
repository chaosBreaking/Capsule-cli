import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import s from './index.scss';

@inject('store')
@observer
export default class SearchBar extends Component {
    constructor (props = {}) {
        super(props);
        this.state = {
            expanded: false,
            barWidth: '2rem',
            inputWidth: 0,
            visibility: 'hidden',
            input: '',
            icon: {
                color: ''
            }
        };
        this.props.store.getRoot().EventBus.on('GLBClick', (e) => {
            if (this.state.expanded && e.target.id !== 'topBarInput') {
                this.unexpand(e);
            }
        });
    }

    componentDidMount () {
        this.inputRef = document.getElementById('topBarInput');
    }

    clickHandler (e) {
        switch (e.target.tagName) {
        case 'I':
            this.expand(e);
            break;
        case 'INPUT':
            break;
        default:
            this.defaultClickHandler(e);
            break;
        }
    }

    defaultClickHandler (e) {
    }

    inputHandler = e => {
        e.stopPropagation();
        this.setState({
            input: e.target.value
        });
    }

    expand (e) {
        this.setState({
            expanded: true,
            barWidth: '13rem',
            inputWidth: '100%',
            visibility: 'visible',
            icon: {
                color: '#868686'
            }
        });
        typeof this.inputRef.focus === 'function' && this.inputRef.focus();
        setTimeout(() => {
            this.inputRef.focus();
        }, 0);
    }

    unexpand () {
        this.setState({
            expanded: false,
            input: '',
            inputWidth: 0,
            barWidth: '2rem',
            paddingLeft: 0,
            paddingRight: 0,
            height: 0,
            visibility: 'hidden',
            icon: {
                color: ''
            }
        });
    }

    render () {
        return (
            <div className={s.searchBar} onClick={e => this.clickHandler(e)} style={{ width: this.state.barWidth }} title='搜索'>
                <i className={ 'iconfont icon-fcstubiao13'} id="searchIcon" onClick={e => this.expand(e)} style={{ color: this.state.icon.color }}></i>
                <input onChange={this.inputHandler} value={this.input} placeholder="搜索文件名或哈希值" id="topBarInput" style={{ width: this.state.inputWidth, visibility: this.state.visibility, paddingRight: this.state.paddingRight }}></input>
            </div>
        );
    }
}
