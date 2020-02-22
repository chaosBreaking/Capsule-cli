import React from 'react';
import BaseItem from './BaseItem';
import { observer, inject } from 'mobx-react';
import s from './CardItem.scss';
import img from '../../images/file.png';
import { Grow } from '@material-ui/core';

@inject('store')
@observer
export default class CardItem extends BaseItem {
    imgRef = React.createRef();
    componentDidMount () {
        if (this.type.startsWith('image/')) {
            this.imgRef.current.src = 'http://localhost:8080/ipfs/' + this.hash;
        } else if (this.type === 'application/pdf') {
            this.imgRef.current.src = img;
        }
    }

    clickHandler = e => {
        e.stopPropagation();
        this.store.fileStore.showViewer(this.data);
    }

    render () {
        return (
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={300}>
                <div className={s.card} index={this.props.index} id="cardItem" onClick={this.clickHandler}>
                    <div className={s.cardMusk} id='cardMusk'></div>
                    <div className={s.thumb}>
                        <img className={s.img} ref={this.imgRef} src={img} alt="image" width={'100rem'}></img>
                    </div>
                    <div className={s.info}>
                        <span className={s.itemProperty}>
                            {this.name}
                        </span>
                    </div>
                </div>
            </Grow>
        );
    }
}
