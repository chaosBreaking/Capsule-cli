import React, { Component } from 'react';
import s from './index.scss';

export default class Footer extends Component {
    render () {
        return (
            <div className={s.footer}>
                <span>
                    © Capsule 2020
                </span>
            </div>
        );
    }
}
