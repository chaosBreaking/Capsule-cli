import React, { Component } from 'react';
import s from './ProgressBar.scss';
import heart from './heart.png';

class ProgressBar extends Component {
    constructor (props = {}) {
        super(props);
        this.progress = 60;
        this.to = this.props.to || 100;
        this.unit = this.props.unit || 'rem';
        this.width = this.props.width || 20;
        this.height = this.props.height || 1;
        this.color = this.props.color || 'red';
        this.background = this.props.background || '#eee';
        this.state = {
            progress: 0
        };
    }

    init () {
        this.border = document.getElementById('barBorder');
        this.target = document.getElementById('innerPad');
        this.scaleBar = document.getElementById('scaleBar');
        // 初始化组件尺寸
        this.border.style.width = this.width + this.unit;
        this.border.style.height = this.height + this.unit;
        this.target.style.height = this.height + this.unit;
        this.target.style.maxWidth = this.width + this.unit;
        this.scaleBar.style.width = this.width + this.unit;
        // 初始化颜色
        this.border.style.background = this.background;
        this.target.style.background = this.color;
    }

    tick () {
        return setInterval(() => {
            this.progress++;
            this.setState({
                progress: this.progress / 100 * this.width + this.unit
            });
            if (this.progress === this.to) {
                clearInterval(this.interval);
                return 0;
            }
        }, 100);
    }

    componentDidMount () {
        this.init();
        let scaleFlag = 0;
        setInterval(() => {
            // heart beat
            const img = document.getElementById('heartImg');
            img.style.transform = scaleFlag ? 'scale(0.9)' : 'scale(1.1)';
            scaleFlag = ~scaleFlag;
        }, 500);
        setTimeout(() => {
            // 开始时直接将进度设置为60%
            this.setState({
                progress: 60 / 100 * this.width + 0.5 + this.unit
            });
            setTimeout(() => {
                // 1.2s后进度设置为90%
                this.setState({
                    progress: 90 / 100 * this.width + 0.5 + this.unit
                });
                setTimeout(() => {
                    // 1s后进度设置为最终值
                    this.setState({
                        progress: this.to / 100 * this.width + 0.5 + this.unit
                    });
                }, 1000);
            }, 1200);
        }, 10);
    }

    render () {
        const showItem = [60, 90, 100];
        // const itemWidth = this.width / 10 + this.unit
        // const item = [...Array(10)].map((v, index) => {
        //     return <span className="scaleValue" id="scale" key={index} style={{ width: itemWidth, position: 'relative' }}> {
        //         showItem.indexOf(index * 10) === -1 ? '' : index * 10
        //     } </span>
        // })
        const item = showItem.map((v, index) => {
            return (
                <div className={s.scaleValue} id="scale" key={index} style={{ left: v + '%' }}>
                    <div className={s.indicatorLine}></div>
                    <div className={s.indicatorValue}>{ v }</div>
                </div>
            );
        });
        return (
            <div className={s.barBorder} id="barBorder">
                <div className={s.preImg}><img className={s.heartImg} id="heartImg" alt={''} src={heart} width={32}></img></div>
                <div className={s.innerPad} id="innerPad" style={{ width: this.state.progress }}>
                </div>
                <div className={s.scaleBar} id="scaleBar">
                    { item }
                </div>
            </div>
        );
    }
}

export default ProgressBar;
