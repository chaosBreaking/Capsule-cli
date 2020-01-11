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
            icon: {
                color: ''
            }
        };
        this.props.store.getRoots().EventBus.on('GLBClick', (e) => {
            if (this.state.expanded && e.target.id !== 'topBarInput') {
                this.clearStatus(e);
            }
        });
    }

    componentDidMount () {
        this.input = document.getElementById('topBarInput');
    }

    clearStatus () {
        this.setState({
            expanded: false,
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

    expand (e) {
        this.setState({
            expanded: true,
            barWidth: '12.5rem',
            inputWidth: '100%',
            visibility: 'visible',
            icon: {
                color: '#868686'
            }
        });
        typeof this.input.focus === 'function' && this.input.focus();
        setTimeout(() => {
            this.input.focus();
        }, 0);
    }

    render () {
        return (
            <div className={s.searchBar} onClick={e => this.clickHandler(e)} style={{ width: this.state.barWidth }} title='搜索'>
                <i className={ 'iconfont icon-fcstubiao13'} id="searchIcon" onClick={e => this.expand(e)} style={{ color: this.state.icon.color }}></i>
                <input placeholder="搜索文件名或哈希值" id="topBarInput" style={{ width: this.state.inputWidth, visibility: this.state.visibility, paddingRight: this.state.paddingRight }}></input>
            </div>
        );
    }
}
