import React, { Component } from 'react';
import './Loading.scss';
import logo from '../../logo.svg';
export class Loading extends Component {
    constructor (props = {}) {
        super(props);
        this.state = {
            show: false
        };
    }

    componentDidMount () {
        // setTimeout(() => {
        //     this.setState({
        //         show: true
        //     })
        // }, 1000)
    }

    render () {
        return (
            this.state.show && <div className={'container'}>
                <div className="musk">
                    <div className="animate">
                        {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    </div>
                </div>
            </div>
        );
    }
}
