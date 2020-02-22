import React from 'react';
import { observer, inject } from 'mobx-react';
import s from './Viewer.scss';

@inject('store')
@observer
export default class Viewer extends React.Component {
    get store () {
        return this.props.store.fileStore;
    }

    get data () {
        return this.store.viewerData || {
            hash: 'QmQdfzkQKffxRsbTvBV7GkCQjbiciAqemfTmUQVyLx9gNm'
        };
    }

    get type () {
        return this.data.type || 'image/png';
    }

    get url () {
        return this.data.hash;
    }

    renderPdf () {
        return (<embed
            src={this.data.url}
            width='100%'
            height='100%'
            className={s.embed}
        />);
    }

    renderImage () {
        return (<img className={s.img} src={this.data.url} />);
    }

    renderContent () {
        if (this.type.startsWith('image/')) {
            return this.renderImage();
        } else if (this.type === 'application/pdf') {
            return this.renderPdf();
        }
    }

    handleClose = () => {
        this.store.hideViewer();
    }

    render () {
        const { isViewerShow } = this.store;
        return (
            <div className={isViewerShow ? s.viewer : s.hide}>
                <div className={s.topBar}>
                    <div className={s.name}>filename</div>
                    <div className={s.switch}>1 of 1</div>
                    <div className={s.btns} onClick={this.handleClose}>xxx</div>
                </div>
                <div className={s.content}>
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}
