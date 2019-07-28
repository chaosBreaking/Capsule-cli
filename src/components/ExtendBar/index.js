import React, { Component } from 'react'
import './index.scss'
import TopBar from '../FileContainer/widgets/TopBar';

class ExtendBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='ExtendBarContainer'>
                {/* <TopBar></TopBar> */}
            </div>
        )
    }
}

export default ExtendBar